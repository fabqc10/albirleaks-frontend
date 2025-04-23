'use client'; // Asegurar que sea un client component para usar hooks

import React from 'react';
// import { ConversationSummaryDto } from '@/types/chat'; // Ya no se necesita importar aquí
import ConversationListItem from './ConversationListItem';
import { useChat } from '@/app/contexts/chat.context'; // Importar el hook

// Ya no necesita recibir props relacionadas con el estado del chat
/*
interface ConversationListProps {
    conversations: ConversationSummaryDto[];
    selectedConversationId: number | null;
    onSelectConversation: (id: number) => void;
    // TODO: Pasar currentUserId si es necesario para ConversationListItem
}
*/

const ConversationList: React.FC = () => { // Quitar props
    // Obtener datos y funciones directamente del contexto
    const {
        conversations,
        selectedConversationId,
        selectConversation, // Usar la función del contexto
        // Podríamos obtener currentUserId aquí si fuera necesario para ListItem
    } = useChat();

    // Los estados de carga y error se manejan en ChatPage (o podrían manejarse aquí también)
    if (!conversations) {
        return null; // O mostrar algún placeholder si isLoading no se maneja en ChatPage
    }

    return (
        <div>
            {conversations.map(convo => (
                <ConversationListItem
                    key={convo.id}
                    conversation={convo}
                    isSelected={selectedConversationId === convo.id}
                    onSelect={selectConversation} // Usar la función del contexto
                    // Pasar currentUserId aquí si se implementa
                />
            ))}
        </div>
    );
};

export default ConversationList; 