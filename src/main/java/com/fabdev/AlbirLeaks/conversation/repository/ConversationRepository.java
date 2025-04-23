package com.fabdev.AlbirLeaks.conversation.repository;

import com.fabdev.AlbirLeaks.conversation.Conversation;
import com.fabdev.AlbirLeaks.users.User; // Verifica importación
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {

    List<Conversation> findByParticipantsContainingOrderByLastUpdatedAtDesc(User user);

    @Query("SELECT c FROM Conversation c JOIN c.participants p WHERE c.id = :conversationId AND p.id = :userId")
    Optional<Conversation> findByIdAndParticipantId(@Param("conversationId") Long conversationId, @Param("userId") Long userId);

    // Asume que Job tiene un campo 'id' de tipo Long. Cambia 'c.job.id' y :jobId si es String.
     @Query("SELECT c FROM Conversation c JOIN c.participants p1 JOIN c.participants p2 " +
            "WHERE c.job.id = :jobId AND p1.id = :user1Id AND p2.id = :user2Id")
     Optional<Conversation> findByJobIdAndParticipants(@Param("jobId") Long jobId, @Param("user1Id") Long user1Id, @Param("user2Id") Long user2Id);
} 