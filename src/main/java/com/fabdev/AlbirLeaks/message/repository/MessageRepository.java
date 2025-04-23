package com.fabdev.AlbirLeaks.message.repository;

import com.fabdev.AlbirLeaks.message.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    Page<Message> findByConversationIdOrderByTimestampDesc(Long conversationId, Pageable pageable);
} 