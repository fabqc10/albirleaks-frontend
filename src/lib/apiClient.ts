import { ConversationSummaryDto, MessageDto, SendMessageRequestDto } from "@/types/chat";
// import { getCsrfToken } from "./csrf"; // No es necesario si la función está abajo

/**
 * Obtiene el valor de una cookie por su nombre.
 * @param name - El nombre de la cookie.
 * @returns El valor de la cookie o null si no se encuentra o estamos en SSR.
 */
function getCookie(name: string): string | null {
    if (typeof document === 'undefined') { // Comprobación para SSR/Server Components
        console.warn("Attempted to access cookies on the server-side or during SSR.");
        return null;
    }
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift() ?? null;
    }
    return null;
}

/**
 * Inicia o recupera una conversación para un anuncio específico.
 * @param jobId - El ID (String) del anuncio.
 * @param token - El token JWT (idToken o accessToken) del usuario.
 * @returns Promise<ConversationSummaryDto> - La conversación creada o encontrada.
 * @throws Error si la petición falla o el usuario no está autorizado.
 */
export async function initiateChatForJob(jobId: string, token: string | null): Promise<ConversationSummaryDto> {
    // --- REINTRODUCIDO CSRF --- 
    const csrfToken = getCookie('XSRF-TOKEN');
    if (!csrfToken) {
        // Importante: No fallar si no hay token CSRF cuando usamos Bearer?
        // Depende de la config exacta del backend. Por ahora, lo enviaremos si existe.
        console.warn('[apiClient initiateChatForJob] CSRF token cookie (XSRF-TOKEN) not found. Proceeding without CSRF header.');
        // Considera lanzar un error si *sabes* que el backend SIEMPRE lo requiere
        // throw new Error('CSRF token not found. Ensure you are logged in or CSRF cookie is set.');
    }

    const headers: HeadersInit = {
        'Accept': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    // Añadir cabecera CSRF si la obtuvimos
    if (csrfToken) {
        headers['X-XSRF-TOKEN'] = csrfToken;
        console.log('[apiClient initiateChatForJob] Included X-XSRF-TOKEN header.');
    } else {
        console.log('[apiClient initiateChatForJob] No X-XSRF-TOKEN header included (cookie not found).');
    }

    try {
        const response = await fetch(`/api/conversations/job/${jobId}`, {
            method: 'POST',
            headers: headers,
            credentials: 'include', // Mantenemos por si acaso
        });

        if (response.status === 401 || response.status === 403) {
            console.error(`Auth error initiating chat (Status: ${response.status}). Token provided: ${!!token}. CSRF Token Sent: ${!!csrfToken}`);
            throw new Error('Unauthorized');
        }

        if (!response.ok) {
            let errorBody = '';
            try { errorBody = await response.text(); } catch { /* Ignora */ }
            console.error(`API Error Body (initiateChat): ${errorBody}`);
            throw new Error(`HTTP error! status: ${response.status} - ${errorBody || 'Failed to initiate chat'}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error initiating chat for job:", jobId, error);
        if (error instanceof Error && error.message === 'Unauthorized') {
            throw error; // Re-lanzar para manejo específico
        }
        throw new Error(`Failed to initiate chat. Reason: ${error instanceof Error ? error.message : String(error)}`);
    }
}

// --- Implementación de getCsrfToken (Ejemplo Básico) ---
// Ya no se necesita getCsrfToken separado, usamos getCookie directamente.

/**
 * Obtiene los mensajes de una conversación específica, paginados.
 * @param conversationId - El ID (number) de la conversación.
 * @param token - El token JWT del usuario.
 * @param page - El número de página (0-indexed).
 * @param size - El tamaño de la página.
 * @returns Promise<Page<MessageDto>> - Una página de mensajes.
 * @throws Error si la petición falla.
 */
// Define una interfaz básica para la respuesta paginada (ajusta según tu backend si es diferente)
export interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number; // Número de página actual (0-indexed)
    first: boolean;
    last: boolean;
    empty: boolean;
}

export async function fetchMessages(conversationId: number, token: string | null, page: number = 0, size: number = 20): Promise<Page<MessageDto>> {
    const headers: HeadersInit = {
        'Accept': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    // GET requests typically don't need CSRF token header

    try {
        const response = await fetch(`/api/conversations/${conversationId}/messages?page=${page}&size=${size}&sort=timestamp,desc`,
         {
            method: 'GET',
            headers: headers,
            credentials: 'include', // Mantenemos por si acaso
        });

        if (response.status === 401 || response.status === 403) {
            console.error(`Auth error fetching messages (Status: ${response.status}). Token provided: ${!!token}`);
            throw new Error('Unauthorized');
        }
        if (!response.ok) {
            let errorBody = '';
            try { errorBody = await response.text(); } catch { /* Ignora */ }
            console.error(`API Error Body (fetchMessages): ${errorBody}`);
            throw new Error(`HTTP error! status: ${response.status} - ${errorBody || 'Failed to fetch messages'}`);
        }
        return await response.json() as Page<MessageDto>;
    } catch (error) {
        console.error("Error fetching messages for conversation:", conversationId, error);
        if (error instanceof Error && error.message === 'Unauthorized') {
            throw error;
        }
        throw new Error(`Failed to fetch messages. Reason: ${error instanceof Error ? error.message : String(error)}`);
    }
}

/**
 * Envía un nuevo mensaje a una conversación.
 * @param conversationId - El ID (number) de la conversación.
 * @param messageData - El objeto con el contenido del mensaje { content: string }.
 * @param token - El token JWT del usuario.
 * @returns Promise<MessageDto> - El mensaje recién creado.
 * @throws Error si la petición falla.
 */
export async function sendMessage(conversationId: number, messageData: SendMessageRequestDto, token: string | null): Promise<MessageDto> {
    // --- REINTRODUCIDO CSRF --- 
    const csrfToken = getCookie('XSRF-TOKEN');
    // if (!csrfToken) {
    //     console.warn('[apiClient sendMessage] CSRF token cookie (XSRF-TOKEN) not found. Proceeding without CSRF header.');
    //     // Enviar mensaje podría requerir CSRF más estrictamente
    //     throw new Error('CSRF token not found for sending message.'); 
    // }

    const headers: HeadersInit = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
     // Añadir cabecera CSRF si la obtuvimos
    if (csrfToken) {
        headers['X-XSRF-TOKEN'] = csrfToken;
        console.log('[apiClient sendMessage] Included X-XSRF-TOKEN header.');
    } else {
        console.log('[apiClient sendMessage] No X-XSRF-TOKEN header included (cookie not found). Consider throwing error if required.');
    }

    try {
        const response = await fetch(`/api/conversations/${conversationId}/messages`, {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            body: JSON.stringify(messageData),
        });

         if (response.status === 401 || response.status === 403) {
            console.error(`Auth error sending message (Status: ${response.status}). Token provided: ${!!token}. CSRF Token Sent: ${!!csrfToken}`);
            throw new Error('Unauthorized');
        }
        if (!response.ok) {
             let errorBody = '';
            try { errorBody = await response.text(); } catch { /* Ignora */ }
            console.error(`API Error Body (sendMessage): ${errorBody}`);
            throw new Error(`HTTP error! status: ${response.status} - ${errorBody || 'Failed to send message'}`);
        }

        // El backend devuelve 201 Created con el mensaje en el cuerpo
        return await response.json();
    } catch (error) {
        console.error("Error sending message to conversation:", conversationId, error);
         if (error instanceof Error && error.message === 'Unauthorized') {
            throw error;
        }
        throw new Error(`Failed to send message. Reason: ${error instanceof Error ? error.message : String(error)}`);
    }
} 