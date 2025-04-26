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

    @Query("SELECT c FROM Conversation c JOIN FETCH c.participants p WHERE c.id = :conversationId AND p.userId = :userId")
    Optional<Conversation> findByIdAndParticipantId(@Param("conversationId") Long conversationId, @Param("userId") String userId);

    // Asume que Job tiene un campo 'id' de tipo Long. Cambia 'c.job.id' y :jobId si es String.
     @Query("SELECT c FROM Conversation c JOIN c.participants p1 JOIN c.participants p2 " +
            "WHERE c.job.jobId = :jobId AND p1.userId = :user1Id AND p2.userId = :user2Id")
     Optional<Conversation> findByJobIdAndParticipants(@Param("jobId") String jobId, @Param("user1Id") String user1Id, @Param("user2Id") String user2Id);
} 