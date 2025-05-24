import { BackendUserDto } from '@/types/user';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'; // Asegúrate que esta URL es correcta

interface BackendUserResponse {
    userId: string; // El UUID de tu DB
    role: string;
}

export async function findBackendUserByGoogleId(
    googleId: string | undefined,
    token: string | null // <-- Nuevo parámetro para el token
): Promise<BackendUserDto | null> {
    if (!googleId) {
        console.error("[backendAuth] findBackendUserByGoogleId called with null or empty googleId.");
        return null;
    }
    if (!token) {
        console.warn(`[backendAuth] findBackendUserByGoogleId called for ${googleId} without a token. Backend request will likely fail.`);
        // Continuamos, pero es probable que falle en el backend si requiere auth
    }

    console.log(`[backendAuth] Fetching user data for googleId: ${googleId}. Token provided: ${!!token}`);

    try {
        const headers: HeadersInit = {
            'Accept': 'application/json',
        };
        // Añadir cabecera de autorización si el token existe
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}/api/users/by-google/${googleId}`, {
            method: 'GET',
            headers: headers,
            // Considera añadir cache: 'no-store' si los datos deben ser siempre frescos
        });

        if (response.ok) { // Status 200-299
            if (response.status === 204) { // Específicamente No Content (o si 404 se maneja como ok por alguna razón)
                 console.log(`[backendAuth] User with googleId ${googleId} not found (204/404 handled as OK but no content).`);
                 return null; 
            }
            try {
                const data: BackendUserDto = await response.json();
                console.log(`[backendAuth] Successfully fetched backend user data for ${googleId}:`, data);
                return data;
            } catch (jsonError) {
                 console.error(`[backendAuth] Failed to parse JSON response for ${googleId}. Status: ${response.status}`, jsonError);
                 return null;
            }
        } else if (response.status === 404) {
            console.log(`[backendAuth] User with googleId ${googleId} not found in backend (404).`);
            return null;
        } else {
            // Otros errores HTTP (401, 403, 500, etc.)
            let errorBody = '';
            try { errorBody = await response.text(); } catch { /* ignore */ }
            console.error(`[backendAuth] HTTP error fetching user ${googleId}. Status: ${response.status}. Body: ${errorBody}`);
            // Podrías querer manejar 401/403 de forma específica si es necesario
            return null; // Devolvemos null para indicar que no se encontró/hubo error
        }
    } catch (error) {
        console.error(`[backendAuth] Network or other error fetching user ${googleId}:`, error);
        return null;
    }
} 