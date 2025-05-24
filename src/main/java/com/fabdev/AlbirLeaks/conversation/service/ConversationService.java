package com.fabdev.AlbirLeaks.conversation.service;

import com.fabdev.AlbirLeaks.conversation.Conversation;
import com.fabdev.AlbirLeaks.conversation.dto.ConversationSummaryDto;
import com.fabdev.AlbirLeaks.conversation.mappers.ConversationMapper;
import com.fabdev.AlbirLeaks.conversation.repository.ConversationRepository;
import com.fabdev.AlbirLeaks.exception.JobNotFoundException;
import com.fabdev.AlbirLeaks.exception.UnauthorizedException;
import com.fabdev.AlbirLeaks.jobs.Job;
import com.fabdev.AlbirLeaks.jobs.repository.JobsRepository; // Verifica importación y nombre
import com.fabdev.AlbirLeaks.users.User;
import com.fabdev.AlbirLeaks.users.service.UserService; // Verifica importación y nombre
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConversationService {

    private static final Logger log = LoggerFactory.getLogger(ConversationService.class);
    private final ConversationRepository conversationRepository;
    private final UserService userService; // Necesario para buscar usuarios por googleId
    private final JobsRepository jobsRepository;

    @Transactional(readOnly = true)
    public List<ConversationSummaryDto> getUserConversations(String googleId) {
        log.debug("Fetching conversations for googleId: {}", googleId);
        User user = findUserByGoogleIdOrThrow(googleId); // Usa googleId
        List<Conversation> conversations = conversationRepository.findByParticipantsContainingOrderByLastUpdatedAtDesc(user);
        log.info("Found {} conversations for user ID: {} (googleId: {})", conversations.size(), user.getId(), googleId);
        return conversations.stream()
                .map(ConversationMapper::toConversationSummaryDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ConversationSummaryDto getOrCreateConversationForJob(String jobId, String requesterGoogleId) {
        log.debug("getOrCreateConversationForJob called for jobId: {} and requesterGoogleId: {}", jobId, requesterGoogleId);
        User requester = findUserByGoogleIdOrThrow(requesterGoogleId); // Usa googleId
        // Asume que el ID del Job es String. Si es Long, necesitas parsearlo o ajustar el repo.
        Job job = jobsRepository.findById(jobId)
                .orElseThrow(() -> {
                    log.warn("Job not found with id: {}", jobId);
                    return new JobNotFoundException("Job not found with id: " + jobId);
                });

        User jobOwner = job.getOwner();
        if (jobOwner == null) {
            log.error("Job owner is null for job ID: {}", jobId);
            // Considera una excepción más específica si es un estado inválido esperado
            throw new RuntimeException("Job owner not found for job: " + jobId);
        }
        log.debug("Job Owner ID: {}, Requester ID: {}", jobOwner.getId(), requester.getId());

        if (requester.getId().equals(jobOwner.getId())) {
            log.warn("User (googleId: {}) attempted to create conversation with themselves for job ID: {}", requesterGoogleId, jobId);
            throw new IllegalArgumentException("Cannot create a conversation with yourself.");
        }

        // Usamos los IDs locales (Long) para la búsqueda de la conversación existente
        Long requesterLocalId = requester.getId();
        Long jobOwnerLocalId = jobOwner.getId();
        Long actualJobId = job.getId(); // Asumiendo que job.getId() devuelve Long

        // Intenta encontrar una conversación existente entre estos dos usuarios para este job
        Conversation conversation = conversationRepository.findByJobIdAndParticipants(actualJobId, requesterLocalId, jobOwnerLocalId)
              .or(() -> conversationRepository.findByJobIdAndParticipants(actualJobId, jobOwnerLocalId, requesterLocalId))
              .orElseGet(() -> {
                  log.info("No existing conversation found for job {}, creating a new one between user {} and user {}", actualJobId, requesterLocalId, jobOwnerLocalId);
                  return createNewConversation(job, requester, jobOwner);
              });

        log.info("Returning conversation ID: {} for job {} (requesterGoogleId: {})", conversation.getId(), jobId, requesterGoogleId);
        return ConversationMapper.toConversationSummaryDto(conversation);
    }

    private Conversation createNewConversation(Job job, User user1, User user2) {
        Conversation newConversation = Conversation.builder()
                .job(job)
                .participants(new HashSet<>(Set.of(user1, user2)))
                // createdAt y lastUpdatedAt deberían manejarse automáticamente por JPA (@CreationTimestamp, @UpdateTimestamp)
                .build();
        return conversationRepository.save(newConversation);
    }

    // Helper interno para buscar usuario por googleId, lanzando excepción si no se encuentra
    private User findUserByGoogleIdOrThrow(String googleId) {
        log.trace("Attempting to find user by googleId: {}", googleId);
        return userService.findByGoogleId(googleId) // Asume que esto devuelve Optional<User>
                .orElseThrow(() -> {
                    log.warn("User not found for googleId: {}", googleId);
                    // Considera si una excepción más específica o un manejo diferente es apropiado
                    return new RuntimeException("User not found for googleId: " + googleId);
                });
    }

    @Transactional
    public void updateConversationTimestamp(Long conversationId) {
        log.trace("Updating timestamp for conversation ID: {}", conversationId);
        Conversation conversation = conversationRepository.findById(conversationId)
            .orElseThrow(() -> {
                log.warn("Attempted to update timestamp for non-existent conversation ID: {}", conversationId);
                return new RuntimeException("Conversation not found with id: " + conversationId);
            });
        conversation.setLastUpdatedAt(LocalDateTime.now());
        // No es necesario save() explícito si la entidad está gestionada y hay @UpdateTimestamp o similar
        // conversationRepository.save(conversation);
    }

    // Método para verificar si un usuario (por googleId) pertenece a una conversación
    // Lanza UnauthorizedException si no pertenece o no se encuentra la conversación/usuario
    @Transactional(readOnly = true)
    public Conversation findConversationByIdAndUserOrThrow(Long conversationId, String googleId) {
        log.trace("Checking access for googleId: {} to conversationId: {}", googleId, conversationId);
        User user = findUserByGoogleIdOrThrow(googleId); // Encuentra al usuario primero
        Long userId = user.getId(); // Obtiene el ID local

        // Busca la conversación asegurándose que el usuario participa
        return conversationRepository.findByIdAndParticipantId(conversationId, userId) // Usa el ID local para la query
                 .orElseThrow(() -> {
                     log.warn("Unauthorized access attempt by userId {} (googleId: {}) to conversationId: {}", userId, googleId, conversationId);
                     return new UnauthorizedException("User not authorized for this conversation or conversation not found.");
                 });
     }
} 