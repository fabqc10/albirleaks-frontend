/**
 * Representa los datos básicos del usuario obtenidos del backend.
 */
export interface BackendUserDto {
    userId: string; // El UUID del usuario en la base de datos del backend.
    role: string;   // El rol del usuario (ej. "USER", "ADMIN"). Ajusta si usas un enum específico.
} 