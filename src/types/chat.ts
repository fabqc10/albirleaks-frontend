// Tipos basados en los DTOs definidos para el backend Spring Boot

export interface UserSummaryDto {
    id: string; // Cambiado a string según la entidad User
    name: string | null;
    image: string | null;
}

export interface JobSummaryDto {
    jobId: string; // ID de tipo String según la entidad Job
    jobTitle: string | null;
}

export interface MessageDto {
    id: number; // Long en Java -> number en TS
    sender: UserSummaryDto;
    content: string;
    timestamp: string; // LocalDateTime/Instant -> string (ISO 8601)
}

export interface ConversationSummaryDto {
    id: number; // Long en Java -> number en TS
    job: JobSummaryDto | null;
    participants: UserSummaryDto[];
    lastMessage: MessageDto | null;
    lastUpdatedAt: string; // LocalDateTime/Instant -> string (ISO 8601)
    unreadCount: number; // Placeholder
}

// Para la petición de enviar mensaje
export interface SendMessageRequestDto {
    content: string;
} 