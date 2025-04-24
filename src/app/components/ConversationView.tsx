// src/components/chat/ConversationView.tsx
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useChat } from '@/app/contexts/chat.context';
import { useSession } from 'next-auth/react'; // Para obtener info del usuario actual
import { MessageDto } from '@/types/chat'; // Importa el tipo definido en chat.ts

// Componente MessageBubble Refinado
interface MessageBubbleProps {
    message: MessageDto;
    isSender: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isSender }) => {
    const senderName = message.sender?.name ?? 'Usuario desconocido';

    return (
        // Contenedor que alinea toda la fila
        <div className={`flex w-full mb-2 ${isSender ? 'justify-end pl-10' : 'justify-start pr-10'}`}> {/* Añade padding opuesto para evitar que pegue a los bordes */}
            {/* Burbuja con contenido y estilo */}
            <div className={`px-3 py-2 rounded-lg shadow-sm max-w-[75%] lg:max-w-[65%] ${isSender ? 'bg-white border border-gray-200' : 'bg-yellow-50'}`}> {/* Estilo Idealista: blanco vs amarillo claro */}
                 {!isSender && (
                    <span className="text-xs font-medium text-gray-700 mb-1 block">{senderName}</span>
                 )}
                 <p className="text-sm text-gray-800 whitespace-pre-wrap break-words">{message.content}</p> {/* break-words para textos largos */} 
                 <div className="flex justify-end items-center mt-1">
                    <span className="text-xs text-gray-400">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {/* Idealista usa un check simple, podrías usar SVG o texto */} 
                    {isSender && <span className="ml-1 text-xs text-blue-500">✓</span>}
                 </div>
            </div>
        </div>
    );
};

// Componente ConversationView con Layout Fijo
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
        conversations,
    } = useChat();

    const { data: session } = useSession();
    const currentUserId = session?.user?.id; // Verifica que esto trae el UUID

    const [newMessage, setNewMessage] = useState('');
    const [focusTrigger, setFocusTrigger] = useState(0); // <-- Estado para trigger
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messageListRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const currentConversation = conversations.find(c => c.id === selectedConversationId);
    const otherParticipant = currentConversation?.participants.find(p => p.id !== currentUserId);

    // Efecto para devolver el foco al input cuando focusTrigger cambia
    useEffect(() => {
        // Solo enfocar si el trigger es > 0 (evita el foco inicial)
        if (focusTrigger > 0 && inputRef.current) {
            inputRef.current.focus();
        }
    }, [focusTrigger]); // <-- Dependencia del trigger

    // Scroll automático (mejorado)
    useEffect(() => {
         const timer = setTimeout(() => {
             if (messageListRef.current) {
                 const { scrollTop, scrollHeight, clientHeight } = messageListRef.current;
                 // Solo hacer scroll si el usuario está cerca del fondo
                 if (scrollHeight - scrollTop - clientHeight < 200) {
                     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
                 }
             }
         }, 100); // Pequeño delay para asegurar renderizado
         return () => clearTimeout(timer);
    }, [currentMessages]);

    // Scroll Infinito (con restauración de posición)
    const handleScroll = useCallback(() => {
         const listElement = messageListRef.current;
         if (!listElement) return;
         const currentScrollHeight = listElement.scrollHeight;

         if (listElement.scrollTop < 50 && hasMoreMessages && !isLoadingMessages) { // Umbral pequeño para activar
            console.log("Near top, loading more messages...");
            loadMoreMessages().then(() => {
                 requestAnimationFrame(() => {
                     if (messageListRef.current) {
                         const newScrollHeight = messageListRef.current.scrollHeight;
                         messageListRef.current.scrollTop = newScrollHeight - currentScrollHeight;
                     }
                 });
            });
        }
    }, [hasMoreMessages, isLoadingMessages, loadMoreMessages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || isSendingMessage || !currentUserId) return;
        try {
            await sendMessageToConversation(newMessage);
            setNewMessage('');
            setFocusTrigger(prev => prev + 1); // <-- Incrementar el trigger aquí
        } catch (error) {
            console.error("Error sending message from ConversationView:", error);
        }
    };

    if (!selectedConversationId) {
        return <div className="flex-1 flex items-center justify-center text-gray-500 p-4 bg-gray-50">Selecciona una conversación para empezar a chatear.</div>;
    }

    return (
        // 1. Contenedor Flex Vertical, altura completa, sin overflow propio
        <div className="flex flex-col h-full overflow-hidden bg-white">
            {/* 2. Cabecera: Altura fija, no se encoge */}
            <div className="p-3 border-b bg-gray-50 flex items-center space-x-3 flex-shrink-0">
                {/* Idealista no muestra avatar aquí, solo nombre */} 
                <span className="font-semibold text-gray-800">{otherParticipant?.name ?? 'Usuario'}</span>
                {/* Podrías añadir botones de acciones aquí si quieres (llamar, info, etc.) */} 
            </div>

            {/* 3. Lista de Mensajes: Espacio restante, scroll interno */}
            <div
                ref={messageListRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50" // Fondo general del área de chat
            >
                {/* Botón Cargar Más / Indicador de Carga / Inicio Conversación */} 
                 {hasMoreMessages && !isLoadingMessages && (
                     <div className="text-center mb-4">
                         <button onClick={loadMoreMessages} disabled={isLoadingMessages} className="text-xs text-blue-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1 bg-white rounded-full shadow-sm border">
                             Cargar mensajes anteriores
                         </button>
                     </div>
                 )}
                 {isLoadingMessages && <div className="text-center text-gray-400 text-xs py-2">Cargando...</div>}
                 {!hasMoreMessages && currentMessages.length > 0 && <div className="text-center text-xs text-gray-400 pt-2 pb-3">Inicio de la conversación</div>}

                {/* Mensajes */} 
                {currentMessages.map((msg) => (
                   <MessageBubble
                       key={msg.id}
                       message={msg}
                       isSender={msg.sender?.id === currentUserId} // Verifica que currentUserId sea el UUID!
                   />
               ))}
               {errorMessages && <div className="text-center text-red-500 text-sm p-2">Error: {errorMessages}</div>}
               <div ref={messagesEndRef} style={{ height: '1px' }} /> {/* Para scroll al final */} 
            </div>

            {/* 4. Área de Input: Altura fija, no se encoge */} 
            <div className="p-3 border-t bg-white flex-shrink-0"> {/* Fondo blanco como Idealista */} 
                {errorSending && <div className="text-red-600 text-xs mb-2 text-center">Error: {errorSending}</div>}
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    {/* Idealista usa un textarea que crece, pero un input es más simple para empezar */} 
                    <input
                        ref={inputRef}
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm shadow-sm" // Estilo input Idealista
                        disabled={isSendingMessage}
                        autoComplete="off"
                    />
                    <button type="submit" disabled={isSendingMessage || !newMessage.trim()} className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 disabled:opacity-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out" aria-label="Enviar mensaje">
                         {/* Icono Enviar */} 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 transform rotate-90">
                           <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                       </svg>
                    </button>
                </form>
            </div>
        </div>
    );
}