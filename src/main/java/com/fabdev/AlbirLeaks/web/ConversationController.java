package com.fabdev.AlbirLeaks.web; // O com.fabdev.AlbirLeaks.controller

import com.fabdev.AlbirLeaks.conversation.dto.ConversationSummaryDto;
import com.fabdev.AlbirLeaks.conversation.service.ConversationService;
import com.fabdev.AlbirLeaks.message.dto.MessageDto;
import com.fabdev.AlbirLeaks.message.dto.SendMessageRequestDto;
import com.fabdev.AlbirLeaks.message.service.MessageService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// Importa tu forma de obtener el usuario autenticado
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/api/conversations")
@RequiredArgsConstructor
// @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // Descomenta y ajusta si es necesario
public class ConversationController {

    private final ConversationService conversationService;
    private final MessageService messageService;

    // --- Placeholder para obtener ID de usuario autenticado ---
    // ¡¡¡ DEBES REEMPLAZAR ESTO CON TU IMPLEMENTACIÓN REAL DE SPRING SECURITY !!!
    private Long getCurrentUserId() {
        /* Ejemplo básico (requiere adaptación):
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) { // O tu clase UserDetails personalizada
             // Asume que tu UserDetails tiene un método getId() o puedes obtenerlo del username
            // return ((YourUserDetailsClass) principal).getId();
            // String username = ((UserDetails) principal).getUsername();
             // User user = userRepository.findByUsername(username)...; return user.getId();
        } else if (principal instanceof String) {
            // Podría ser el username directamente
        }
        // Lanza una excepción o maneja el caso no autenticado apropiadamente
        throw new IllegalStateException("User not authenticated or cannot determine user ID");
        */

        // Temporalmente para pruebas SIN seguridad:
         System.out.println("WARNING: Using hardcoded user ID 1L for testing in ConversationController!");
         return 1L; // ¡¡¡ SOLO PARA PRUEBAS !!!
    }
    // --- Fin Placeholder ---

    // Iniciar/Obtener chat para un anuncio
    @PostMapping("/job/{jobId}")
    public ResponseEntity<ConversationSummaryDto> getOrCreateConversation(@PathVariable String jobId) {
         try {
             Long currentUserId = getCurrentUserId();
             ConversationSummaryDto conversation = conversationService.getOrCreateConversationForJob(jobId, currentUserId);
             return ResponseEntity.ok(conversation);
         } catch (IllegalArgumentException e) {
             return ResponseEntity.badRequest().build(); // O DTO de error
         } catch (Exception e) {
             // Log e
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
         }
    }

    // Listar conversaciones del usuario
    @GetMapping
    public ResponseEntity<List<ConversationSummaryDto>> getUserConversations() {
        try {
            Long currentUserId = getCurrentUserId();
            List<ConversationSummaryDto> conversations = conversationService.getUserConversations(currentUserId);
            return ResponseEntity.ok(conversations);
        } catch (Exception e) {
            // Log e
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Obtener mensajes de una conversación (paginado)
    @GetMapping("/{conversationId}/messages")
    public ResponseEntity<Page<MessageDto>> getConversationMessages(
            @PathVariable Long conversationId,
            @PageableDefault(size = 20, sort = "timestamp", direction = Sort.Direction.DESC) Pageable pageable) {
        try {
            Long currentUserId = getCurrentUserId();
            Page<MessageDto> messages = messageService.getMessagesForConversation(conversationId, currentUserId, pageable);
            return ResponseEntity.ok(messages);
         } catch (com.fabdev.AlbirLeaks.exception.UnauthorizedException e) { // Asume que tienes esta excepción
             return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
         } catch (Exception e) {
             // Log e
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
         }
    }

    // Enviar un mensaje
    @PostMapping("/{conversationId}/messages")
    public ResponseEntity<MessageDto> sendMessage(
            @PathVariable Long conversationId,
            @RequestBody SendMessageRequestDto messageRequest) {
         try {
             Long currentUserId = getCurrentUserId();
             if (messageRequest == null || messageRequest.content() == null || messageRequest.content().trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
             }
             MessageDto newMessage = messageService.sendMessage(conversationId, currentUserId, messageRequest);
             // En una implementación real, probablemente no devuelvas el mensaje aquí,
             // sino que confíes en que el evento WebSocket lo entregue.
             // Devolver CREATED con el objeto puede ser útil para el cliente si no hay WebSockets aún.
             return ResponseEntity.status(HttpStatus.CREATED).body(newMessage);
          } catch (com.fabdev.AlbirLeaks.exception.UnauthorizedException e) {
              return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
          } catch (Exception e) {
              // Log e
              return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
          }
    }
} 