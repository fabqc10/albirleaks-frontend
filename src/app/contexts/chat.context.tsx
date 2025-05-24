'use client';

import React, { createContext, useState, useContext, useCallback, useEffect, ReactNode, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ConversationSummaryDto, MessageDto, SendMessageRequestDto } from '@/types/chat';
import { Page, fetchMessages, sendMessage, initiateChatForJob } from '@/lib/apiClient';

// --- Definición del Tipo del Contexto ---
interface ChatContextType {
    conversations: ConversationSummaryDto[];
    selectedConversationId: number | null;
    currentMessages: MessageDto[];
    isLoadingConversations: boolean;
    isLoadingMessages: boolean;
    isSendingMessage: boolean;
    hasMoreMessages: boolean;
    currentPage: number;
    errorConversations: string | null;
    errorMessages: string | null;
    errorSending: string | null;
    totalUnreadConversations: number;

    // Funciones
    fetchConversationsList: () => Promise<void>;
    selectConversation: (conversationId: number | null) => void;
    loadMoreMessages: () => Promise<void>;
    sendMessageToConversation: (content: string) => Promise<void>;
    initiateChat: (jobId: string, token: string | null) => Promise<number | null>;
}

// --- Creación del Contexto ---
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// --- Props del Proveedor ---
interface ChatProviderProps {
    children: ReactNode;
}

// --- Implementación del Proveedor ---
export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
    const [conversations, setConversations] = useState<ConversationSummaryDto[]>([]);
    const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
    const [currentMessages, setCurrentMessages] = useState<MessageDto[]>([]);
    const [isLoadingConversations, setIsLoadingConversations] = useState(true);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const [hasMoreMessages, setHasMoreMessages] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [errorConversations, setErrorConversations] = useState<string | null>(null);
    const [errorMessages, setErrorMessages] = useState<string | null>(null);
    const [errorSending, setErrorSending] = useState<string | null>(null);

    const { data: session, status } = useSession();
    const router = useRouter();

    // Calcular el total de conversaciones no leídas
    const totalUnreadConversations = useMemo(() => {
        return conversations.filter(conv => conv.unreadCount > 0).length;
    }, [conversations]);

    // --- API Calls ---
    const internalFetchConversations = useCallback(async (): Promise<ConversationSummaryDto[]> => {
        const currentToken = session?.idToken ?? null;
        const headers: HeadersInit = {
             'Accept': 'application/json',
        };
        if (currentToken) {
            headers['Authorization'] = `Bearer ${currentToken}`;
        } else if (status === 'authenticated') {
             console.warn("internalFetchConversations: Authenticated but idToken is missing from session.");
        }

        try {
            const response = await fetch('/api/conversations', {
                headers: headers,
                credentials: 'include',
            });
            if (response.status === 401 || response.status === 403) {
                console.error(`Auth error fetching conversations (Status: ${response.status}). Token provided: ${!!currentToken}`);
                throw new Error('Unauthorized');
            }
            if (!response.ok) {
                let errorBody = '';
                try { errorBody = await response.text(); } catch { /* Ignora */ }
                console.error(`API Error Body (fetchConversations): ${errorBody}`);
                throw new Error(`HTTP error! status: ${response.status} - ${errorBody || 'Failed to load conversations'}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching conversations within context:", error);
            if (error instanceof Error && error.message === 'Unauthorized') throw error;
            throw new Error(`Failed to load conversations. Reason: ${error instanceof Error ? error.message : String(error)}`);
        }
    }, [session, status]);

    const fetchConversationsList = useCallback(async () => {
        if (status !== 'authenticated') {
             console.log("fetchConversationsList skipped: Session status is not 'authenticated'. Status:", status);
             setIsLoadingConversations(false);
             setConversations([]);
             return;
         }
        console.log("fetchConversationsList started");
        setIsLoadingConversations(true);
        setErrorConversations(null);
        try {
            const data = await internalFetchConversations();
            console.log("Conversations fetched successfully:", data);
            setConversations(data);
        } catch (err) {
            console.error("Error caught in fetchConversationsList:", err);
            if (err instanceof Error && err.message === 'Unauthorized') {
                console.log("Redirecting to signin due to Unauthorized error.");
                router.push('/api/auth/signin');
            } else {
                setErrorConversations((err as Error).message || 'Error al cargar conversaciones');
            }
            setConversations([]);
        } finally {
            console.log("fetchConversationsList finished");
            setIsLoadingConversations(false);
        }
    }, [status, router, internalFetchConversations]);

     useEffect(() => {
        console.log("Session status changed:", status);
        if (status === 'authenticated') {
            fetchConversationsList();
        } else {
            setConversations([]);
            setSelectedConversationId(null);
            setCurrentMessages([]);
            setIsLoadingConversations(status === 'loading');
        }
    }, [status, fetchConversationsList]);

    const fetchInitialMessages = useCallback(async (conversationId: number) => {
        console.log(`fetchInitialMessages started for conversation: ${conversationId}. Session status: ${status}`);
        if (status !== 'authenticated') {
            console.log("fetchInitialMessages skipped: Not authenticated.");
            setIsLoadingMessages(false); // Asegurar que no quede cargando
            return;
        }
        const currentToken = session?.idToken ?? null;
        // No lanzar error si falta token aquí, la llamada API fallará y se manejará abajo
        setIsLoadingMessages(true);
        setErrorMessages(null);
        setCurrentMessages([]);
        setCurrentPage(0);
        setHasMoreMessages(true);
        try {
            const messagePage = await fetchMessages(conversationId, currentToken, 0);
            console.log("Initial messages fetched:", messagePage);
            setCurrentMessages(messagePage.content.reverse());
            setHasMoreMessages(!messagePage.last);
            setCurrentPage(0);
        } catch (error) {
            console.error("Error fetching initial messages:", error);
             if (error instanceof Error && error.message === 'Unauthorized') {
                 router.push('/api/auth/signin');
             } else {
                setErrorMessages((error as Error).message || 'Error al cargar mensajes');
             }
            setHasMoreMessages(false);
        } finally {
            console.log("fetchInitialMessages finished");
            setIsLoadingMessages(false);
        }
    }, [status, session, router]);

    const selectConversation = useCallback((conversationId: number | null) => {
        console.log(`selectConversation called with ID: ${conversationId}`);
        setSelectedConversationId(conversationId);

        if (conversationId !== null) {
            // Actualizar visualmente el contador de no leídos a 0 para esta conversación
            setConversations(prevConvs =>
                prevConvs.map(conv =>
                    conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
                )
            );
            fetchInitialMessages(conversationId);
        } else {
            setCurrentMessages([]);
        }
    }, [fetchInitialMessages]);

    const loadMoreMessages = useCallback(async () => {
        if (status !== 'authenticated' || !selectedConversationId || isLoadingMessages || !hasMoreMessages) {
             console.log("loadMoreMessages skipped: Preconditions not met.", { status, selectedConversationId, isLoadingMessages, hasMoreMessages });
             return;
        }
        const currentToken = session?.idToken ?? null;
        console.log("loadMoreMessages started");
        setIsLoadingMessages(true);
        const nextPage = currentPage + 1;
        try {
            const messagePage = await fetchMessages(selectedConversationId, currentToken, nextPage);
            console.log(`More messages fetched (page ${nextPage}):`, messagePage);
            setCurrentMessages(prev => [...messagePage.content.reverse(), ...prev]);
            setHasMoreMessages(!messagePage.last);
            setCurrentPage(nextPage);
        } catch (error) {
            console.error("Error loading more messages:", error);
            if (error instanceof Error && error.message === 'Unauthorized') {
                router.push('/api/auth/signin');
            } else {
                setErrorMessages((error as Error).message || 'Error al cargar más mensajes');
            }
            setHasMoreMessages(false);
        } finally {
            console.log("loadMoreMessages finished");
            setIsLoadingMessages(false);
        }
    }, [status, session, selectedConversationId, isLoadingMessages, hasMoreMessages, currentPage, router]);

     const sendMessageToConversation = useCallback(async (content: string) => {
        if (status !== 'authenticated' || !selectedConversationId || !content.trim()) {
            console.log("sendMessageToConversation skipped: Preconditions not met.", { status, selectedConversationId, content });
            return;
        }
        const currentToken = session?.idToken ?? null;
        if (!currentToken) {
            console.error("sendMessageToConversation Error: Authenticated but token missing.");
            setErrorSending("Error de autenticación: No se pudo obtener el token.");
            return;
         }

        console.log(`sendMessageToConversation started for content: "${content}"`);
        setIsSendingMessage(true);
        setErrorSending(null);
        try {
            const newMessageData: SendMessageRequestDto = { content };
            const sentMessage = await sendMessage(selectedConversationId, newMessageData, currentToken);
            console.log("Message sent successfully:", sentMessage);
            setCurrentMessages(prev => [...prev, sentMessage]);
        } catch (error) {
             console.error("Error sending message:", error);
             if (error instanceof Error && error.message === 'Unauthorized') {
                 router.push('/api/auth/signin');
             } else {
                setErrorSending((error as Error).message || 'Error al enviar mensaje');
             }
        } finally {
            console.log("sendMessageToConversation finished");
            setIsSendingMessage(false);
        }
    }, [status, session, selectedConversationId, router]);

     const initiateChat = useCallback(async (jobId: string, token: string | null): Promise<number | null> => {
        console.log(`[ChatContext] initiateChat called. Job ID: ${jobId}. Token received: ${token ? 'Yes' : 'No'}`);

        if (!token) {
            console.error("[ChatContext] initiateChat FATAL: Received null or undefined token from calling component.");
            setErrorConversations("Error de autenticación: Token no proporcionado.");
            return null;
        }
        if (typeof token === 'string' && token.trim() === '') {
             console.error("[ChatContext] initiateChat FATAL: Received empty token string.");
             setErrorConversations("Error: Token de sesión inválido (vacío).");
             return null;
        }

        console.log("[ChatContext] initiateChat: Received valid token, proceeding to API call.");

        try {
            const conversation = await initiateChatForJob(jobId, token);
            console.log("[ChatContext] initiateChat: API call successful:", conversation);
            await fetchConversationsList();
            selectConversation(conversation.id);
            return conversation.id;
        } catch (error) {
             console.error("[ChatContext] initiateChat: Error during API call:", error);
             if (error instanceof Error && error.message === 'Unauthorized') {
                 console.log("[ChatContext] initiateChat: Unauthorized error from API. Redirecting.");
                 throw error;
             } else {
                 setErrorConversations((error as Error).message || 'Error al iniciar chat');
             }
             return null;
        } finally {
            console.log("[ChatContext] initiateChat finished.");
        }
    }, [router, fetchConversationsList, selectConversation]);


    // --- Valor del Contexto --- 
    const value = useMemo(() => ({
        conversations,
        selectedConversationId,
        currentMessages,
        isLoadingConversations,
        isLoadingMessages,
        isSendingMessage,
        hasMoreMessages,
        currentPage,
        errorConversations,
        errorMessages,
        errorSending,
        totalUnreadConversations,
        fetchConversationsList,
        selectConversation,
        loadMoreMessages,
        sendMessageToConversation,
        initiateChat,
    }), [
        conversations, selectedConversationId, currentMessages, isLoadingConversations,
        isLoadingMessages, isSendingMessage, hasMoreMessages, currentPage, errorConversations,
        errorMessages, errorSending,
        totalUnreadConversations,
        fetchConversationsList, selectConversation, loadMoreMessages, sendMessageToConversation, initiateChat
    ]);

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

// --- Hook Personalizado --- 
export const useChat = (): ChatContextType => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
}; 