// Tipos basados en los DTOs definidos para el backend Spring Boot

export interface UserSummaryDto {
    id: string; // UUID del backend
    name: string | null;
    image: string | null; // Imagen de Google (si está disponible, ej. para participantes)
}

// Nuevo tipo específico para la info del Owner del Job
export interface JobOwnerInfoDto {
    userId: string; // UUID del owner
    username: string | null; // Username del owner desde la DB
    imageUrl: string | null; // <<< AÑADIDO: URL de la imagen del owner
}

export interface JobSummaryDto {
    jobId: string; // ID de tipo String según la entidad Job
    jobTitle: string | null;
    companyName: string | null; // <<< AÑADIDO: Nombre de la empresa
}

export interface MessageDto {
    id: number; // Long en Java -> number en TS
    sender: UserSummaryDto;
    content: string;
    timestamp: string; // LocalDateTime/Instant -> string (ISO 8601)
}

export interface ConversationSummaryDto {
    id: number; // Long en Java -> number en TS
    jobOwnerInfo: JobOwnerInfoDto | null; // Mantenido por ahora
    job: JobSummaryDto | null;
    participants: UserSummaryDto[]; // Para identificar al otro participante si es necesario
    lastMessage: MessageDto | null;
    lastUpdatedAt: string; // LocalDateTime/Instant -> string (ISO 8601)
    unreadCount: number; // Placeholder
}

// Para la petición de enviar mensaje
export interface SendMessageRequestDto {
    content: string;
} 