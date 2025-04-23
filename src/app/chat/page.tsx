'use client';

import React from 'react'; // useEffect y useState ya no son necesarios aquí
import { useChat } from '@/app/contexts/chat.context'; // Importar el hook del contexto
import ConversationList from '@/components/chat/ConversationList';
import ConversationView from '@/app/components/ConversationView'; // Importar el componente

// Placeholders (pueden permanecer o ser eliminados si se maneja dentro de ConversationList/View)
const ConversationListPlaceholder = () => <div className="p-4 text-gray-500">Cargando conversaciones...</div>;
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

    // La lógica de fetching y manejo de errores ahora está en el contexto

    return (
        <div className="flex h-[calc(100vh-var(--header-height))] border-t bg-white"> {/* Ajusta header-height si tienes cabecera */}
            {/* Columna Izquierda: Lista de Conversaciones */}
            <div className="w-1/3 lg:w-1/4 border-r overflow-y-auto flex flex-col">
                {isLoadingConversations && <ConversationListPlaceholder />}
                {errorConversations && <div className="p-4 text-red-600 bg-red-50 border border-red-200 rounded m-2">Error: {errorConversations}</div>}
                {!isLoadingConversations && !errorConversations && conversations && conversations.length > 0 && (
                     <ConversationList /> // Ya no necesita props
                )}
                 {!isLoadingConversations && !errorConversations && conversations?.length === 0 && (
                    <div className="p-4 text-gray-500 text-center mt-4">No tienes conversaciones.</div>
                 )}
            </div>

            {/* Columna Derecha: Vista de Conversación Seleccionada */}
            {/* ConversationView ahora maneja internamente si hay o no una conversación seleccionada */}
            <div className="flex-1 flex flex-col bg-gray-50"> 
                <ConversationView />
            </div>
        </div>
    );
} 