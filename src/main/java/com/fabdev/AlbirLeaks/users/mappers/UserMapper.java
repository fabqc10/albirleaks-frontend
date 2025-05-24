package com.fabdev.AlbirLeaks.users.mappers;

import com.fabdev.AlbirLeaks.users.User; // Verifica importación
import com.fabdev.AlbirLeaks.users.dto.UserSummaryDto;

public class UserMapper {
    public static UserSummaryDto toUserSummaryDto(User user) {
        if (user == null) return null;
        return new UserSummaryDto(user.getId(), user.getName(), user.getImage()); // Verifica getters
    }
} 