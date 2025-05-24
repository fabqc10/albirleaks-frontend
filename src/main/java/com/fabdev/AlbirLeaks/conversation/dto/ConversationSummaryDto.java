package com.fabdev.AlbirLeaks.conversation.dto;

import com.fabdev.AlbirLeaks.jobs.dto.JobSummaryDto;
import com.fabdev.AlbirLeaks.message.dto.MessageDto;
import com.fabdev.AlbirLeaks.users.dto.UserSummaryDto;
import java.time.LocalDateTime;
import java.util.List;

public record ConversationSummaryDto(
        Long id,
        JobSummaryDto job,
        List<UserSummaryDto> participants,
        MessageDto lastMessage,
        LocalDateTime lastUpdatedAt,
        int unreadCount // Placeholder
) {} 