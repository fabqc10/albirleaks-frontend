'use client';

import React from 'react'; // useEffect y useState ya no son necesarios aquí
import { useChat } from '@/app/contexts/chat.context'; // Importar el hook del contexto
import ConversationList from '@/components/chat/ConversationList';
import ConversationView from '@/app/components/ConversationView'; // Importar el componente

// Placeholders (pueden permanecer o ser eliminados si se maneja dentro de ConversationList/View)
const ConversationListPlaceholder = () => <div className="p-4 text-gray-500">Cargando...</div>;
// Ya no necesitamos este placeholder si ConversationView maneja el caso sin selección
// const ConversationViewPlaceholder = () => <div className="flex-1 flex items-center justify-center text-gray-500">Selecciona una conversación</div>;

export default function ChatPage() {
    // Obtener estado y funciones del contexto
    const {
        conversations, // Todavía lo necesitamos para saber si mostrar la lista o el mensaje de "No tienes..."
//      selectedConversationId, // ConversationView ya lo obtiene del contexto
        isLoadingConversations,
        errorConversations,
    } = useChat();

    // DEFINE LA ALTURA REAL DE TU CABECERA AQUÍ O ASEGURA QUE --header-height ESTÉ DEFINIDO
    const headerHeight = '64px'; // Ejemplo, ajústalo!

    return (
        // 1. Contenedor exterior: Ocupa espacio, centra y añade padding
        <div 
            style={{ height: `calc(100vh - ${headerHeight})` }} 
            className="flex items-center justify-center p-4 md:p-8 bg-gray-100" // Centrado + Padding + Fondo
        >
            {/* 2. Contenedor del Chat: Dimensiones máximas, sombra, redondeado */}
            <div className="flex h-full max-h-[85vh] w-full max-w-6xl border bg-white rounded-lg shadow-xl overflow-hidden"> {/* Max-H/W, Sombra, Redondeado */}
                
                {/* 3. Columna Izquierda: Scroll propio */}
                <div className="w-1/3 lg:w-1/4 border-r overflow-y-auto flex flex-col flex-shrink-0 bg-gray-50 rounded-l-lg">
                    {isLoadingConversations && <ConversationListPlaceholder />}
                    {errorConversations && <div className="p-4 text-red-600 bg-red-50 border border-red-200 rounded m-2">Error: {errorConversations}</div>}
                    {!isLoadingConversations && !errorConversations && conversations && conversations.length > 0 && (
                         <ConversationList />
                    )}
                    {!isLoadingConversations && !errorConversations && conversations?.length === 0 && (
                        <div className="p-4 text-gray-500 text-center mt-4">No tienes conversaciones.</div>
                    )}
                </div>

                {/* 4. Columna Derecha: Ocupa espacio, sin overflow propio */}
                <div className="flex-1 flex flex-col overflow-hidden rounded-r-lg">
                    {/* ConversationView se adapta a este contenedor */}
                    <ConversationView />
                </div>
            </div>
        </div>
    );
} 