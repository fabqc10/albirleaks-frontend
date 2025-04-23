package com.fabdev.AlbirLeaks.conversation.mappers;

import com.fabdev.AlbirLeaks.conversation.Conversation;
import com.fabdev.AlbirLeaks.conversation.dto.ConversationSummaryDto;
import com.fabdev.AlbirLeaks.jobs.mappers.JobMapper;
import com.fabdev.AlbirLeaks.message.Message;
import com.fabdev.AlbirLeaks.message.mappers.MessageMapper;
import com.fabdev.AlbirLeaks.users.mappers.UserMapper;

import java.util.Comparator;

public class ConversationMapper {

    public static ConversationSummaryDto toConversationSummaryDto(Conversation conversation) {
        if (conversation == null) return null;

        Message lastMessage = conversation.getMessages().stream()
                .max(Comparator.comparing(Message::getTimestamp))
                .orElse(null);

        int unreadCount = 0; // TODO: Implementar lógica de no leídos

        return new ConversationSummaryDto(
                conversation.getId(),
                JobMapper.toJobSummaryDto(conversation.getJob()),
                conversation.getParticipants().stream().map(UserMapper::toUserSummaryDto).toList(),
                MessageMapper.toMessageDto(lastMessage),
                conversation.getLastUpdatedAt(),
                unreadCount
        );
    }
} 