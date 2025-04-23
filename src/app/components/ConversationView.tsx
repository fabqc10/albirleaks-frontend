// src/components/chat/ConversationView.tsx
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useChat } from '@/app/contexts/chat.context';
import { useSession } from 'next-auth/react'; // Para obtener info del usuario actual
import { MessageDto } from '@/types/chat'; // Importa el tipo definido en chat.ts

// Componente para mostrar un mensaje individual
interface MessageBubbleProps {
    message: MessageDto;
    isSender: boolean; // Para diferenciar el estilo
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isSender }) => {
    // Asegúrate de que message.sender y message.sender.name existen antes de usarlos
    const senderName = message.sender?.name ?? 'Usuario desconocido';

    return (
        <div className={`flex flex-col ${isSender ? 'items-end' : 'items-start'} mb-2`}>
             {/* Opcional: Mostrar nombre del remitente si no es el usuario actual */}
             {!isSender && (
                 <span className="text-xs text-gray-500 mb-1 ml-2">{senderName}</span>
             )}
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${isSender ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                <p className="text-sm">{message.content}</p>
                {/* Opcional: Mostrar timestamp */}
                 <span className={`block mt-1 text-xs ${isSender ? 'text-blue-100' : 'text-gray-400'} text-right`}>
                     {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                 </span>
            </div>
        </div>
    );
};

// Componente principal de la vista de conversación
export default function ConversationView() {
    const {
        selectedConversationId,
        currentMessages,
        isLoadingMessages,
        isSendingMessage,
        hasMoreMessages,
        errorMessages,
        errorSending,
        loadMoreMessages,
        sendMessageToConversation,
        conversations, // Necesario para encontrar info del otro participante
    } = useChat();

    const { data: session } = useSession();

    // *** AJUSTE IMPORTANTE ***
    // Obtener el ID (UUID) del usuario actual de la sesión.
    // ASUNCIÓN: El ID está en session.user.id. Verifica tu callback de sesión/jwt en next-auth.
    const currentUserId = session?.user?.id;

    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null); // Para hacer scroll hacia abajo
    const messageListRef = useRef<HTMLDivElement>(null); // Para detectar scroll hacia arriba

    // --- Cabecera de Conversación (Opcional pero útil) ---
    const currentConversation = conversations.find(c => c.id === selectedConversationId);
    const otherParticipant = currentConversation?.participants.find(p => p.id !== currentUserId);
    // ----------------------------------------------------

    // Scroll automático hacia abajo cuando llegan nuevos mensajes
    useEffect(() => {
        // Solo hacer scroll si estamos cerca del fondo para no interrumpir al usuario si está leyendo mensajes antiguos
        if (messageListRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = messageListRef.current;
            // Umbral pequeño (ej. 100px) para considerar que está "abajo"
            if (scrollHeight - scrollTop - clientHeight < 100) {
                 messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
             }
         }
    }, [currentMessages]); // Dependencia solo de los mensajes

    // Scroll Infinito: Detectar scroll hacia arriba para cargar más
    const handleScroll = useCallback(() => {
         // Guardar la altura actual antes de cargar más para restaurar posición
         const currentScrollHeight = messageListRef.current?.scrollHeight ?? 0;

        if (messageListRef.current && messageListRef.current.scrollTop === 0 && hasMoreMessages && !isLoadingMessages) {
            console.log("Reached top, loading more messages...");
            loadMoreMessages().then(() => {
                // Después de cargar, ajustar scroll para mantener la posición relativa
                 if (messageListRef.current) {
                     const newScrollHeight = messageListRef.current.scrollHeight;
                     messageListRef.current.scrollTop = newScrollHeight - currentScrollHeight;
                 }
            });
        }
    }, [hasMoreMessages, isLoadingMessages, loadMoreMessages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || isSendingMessage || !currentUserId) {
            console.warn("Send message skipped:", { newMessage, isSendingMessage, currentUserId });
            return;
        }
        try {
            await sendMessageToConversation(newMessage);
            setNewMessage(''); // Limpiar input
        } catch (error) {
            console.error("Error sending message from ConversationView:", error);
            // El error ya se maneja y muestra en el contexto (errorSending)
        }
    };

    if (!selectedConversationId) {
        return <div className="flex-1 flex items-center justify-center text-gray-500">Selecciona una conversación</div>;
    }

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
             {/* Cabecera de la Conversación */}
             <div className="p-3 border-b bg-gray-50 flex items-center space-x-3">
                 {/* Aquí puedes añadir la imagen del otro participante si la tienes */}
                 {/* <img src={otherParticipant?.image || '/images/placeholder-user.png'} alt="Avatar" className="w-8 h-8 rounded-full" /> */}
                 <span className="font-semibold text-gray-700">{otherParticipant?.name ?? 'Usuario'}</span>
             </div>

            {/* Lista de Mensajes */}
            <div
                ref={messageListRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto p-4 space-y-1 bg-gray-100" // Fondo más claro
            >
                 {hasMoreMessages && !isLoadingMessages && (
                     <div className="text-center mb-4">
                         <button
                             onClick={loadMoreMessages}
                             disabled={isLoadingMessages}
                             className="text-xs text-blue-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1 bg-white rounded-full shadow-sm border"
                         >
                             Cargar mensajes anteriores
                         </button>
                     </div>
                 )}
                 {isLoadingMessages && <div className="text-center text-gray-400 text-xs py-2">Cargando...</div>}
                 {!hasMoreMessages && currentMessages.length > 0 && <div className="text-center text-xs text-gray-400 pt-2 pb-3">Inicio de la conversación</div>}

                 {currentMessages.map((msg) => {
                    // *** AJUSTE IMPORTANTE ***
                    // Compara el ID (UUID) del sender con el ID del usuario actual
                    const isSender = msg.sender?.id === currentUserId;
                    return (
                        <MessageBubble
                            key={msg.id}
                            message={msg}
                            isSender={isSender}
                        />
                    );
                 })}
                 {errorMessages && <div className="text-center text-red-500 text-sm p-2">Error al cargar mensajes: {errorMessages}</div>}
                 {/* Elemento vacío al final para referencia de scroll */}
                 <div ref={messagesEndRef} style={{ height: '1px' }} />
            </div>

            {/* Input para Nuevo Mensaje */}
            <div className="p-3 border-t bg-gray-50">
                {errorSending && <div className="text-red-600 text-xs mb-2 text-center">Error al enviar: {errorSending}</div>}
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm bg-white shadow-sm"
                        disabled={isSendingMessage}
                        autoComplete="off" // Evitar autocompletado si no es deseado
                    />
                    <button
                        type="submit"
                        disabled={isSendingMessage || !newMessage.trim()}
                        className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 disabled:opacity-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out"
                        aria-label="Enviar mensaje"
                    >
                        {/* Icono de Enviar */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 transform rotate-90">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
}