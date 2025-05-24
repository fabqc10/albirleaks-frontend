package com.fabdev.AlbirLeaks.message.service;

import com.fabdev.AlbirLeaks.conversation.Conversation;
import com.fabdev.AlbirLeaks.conversation.service.ConversationService;
import com.fabdev.AlbirLeaks.message.Message;
import com.fabdev.AlbirLeaks.message.dto.MessageDto;
import com.fabdev.AlbirLeaks.message.dto.SendMessageRequestDto;
import com.fabdev.AlbirLeaks.message.mappers.MessageMapper;
import com.fabdev.AlbirLeaks.message.repository.MessageRepository;
import com.fabdev.AlbirLeaks.users.User;
import com.fabdev.AlbirLeaks.users.service.UserService; // Verifica importación y nombre
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional; // Necesario para el resultado de findById

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final ConversationService conversationService;
    private final UserService userService;

    @Transactional(readOnly = true)
    public Page<MessageDto> getMessagesForConversation(Long conversationId, Long userId, Pageable pageable) {
        conversationService.findConversationByIdAndUser(conversationId, userId);
        Page<Message> messagesPage = messageRepository.findByConversationIdOrderByTimestampDesc(conversationId, pageable);
        return messagesPage.map(MessageMapper::toMessageDto);
    }

    @Transactional
    public MessageDto sendMessage(Long conversationId, Long senderId, SendMessageRequestDto requestDto) {
        Conversation conversation = conversationService.findConversationByIdAndUser(conversationId, senderId);
        User sender = findUserById(senderId);

        Message newMessage = Message.builder()
                .conversation(conversation)
                .sender(sender)
                .content(requestDto.content())
                .build();

        Message savedMessage = messageRepository.save(newMessage);
        conversationService.updateConversationTimestamp(conversationId);

        // TODO: Emitir evento WebSocket aquí

        return MessageMapper.toMessageDto(savedMessage);
    }

     // ¡¡¡ DEBES IMPLEMENTAR ESTO EN TU UserService !!!
     private User findUserById(Long userId) {
          Optional<User> userOpt = userService.findById(userId); // Llama a tu método real
          return userOpt.orElseThrow(() -> new RuntimeException("Sender user not found with id: " + userId));
     }
} 