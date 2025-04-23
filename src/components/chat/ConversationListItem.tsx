import React from 'react';
import Image from 'next/image';
import { ConversationSummaryDto, UserSummaryDto } from '@/types/chat';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale'; // Para formato de fecha en español

interface ConversationListItemProps {
    conversation: ConversationSummaryDto;
    isSelected: boolean;
    onSelect: (id: number) => void;
    // TODO: Necesitamos el ID del usuario actual para mostrar correctamente "el otro" participante
    // currentUserId: string | null;
}

// Función helper (temporal) para obtener el nombre del otro participante
// Idealmente, esto se haría sabiendo el ID del usuario actual
const getOtherParticipantNames = (participants: UserSummaryDto[]): string => {
    if (!participants || participants.length === 0) {
        return 'Participante Desconocido';
    }
    // Por ahora, solo unimos los nombres. Debería filtrar al usuario actual.
    return participants.map(p => p.name || 'Usuario').join(', ');
};

const ConversationListItem: React.FC<ConversationListItemProps> = ({
    conversation,
    isSelected,
    onSelect,
    // currentUserId,
}) => {
    const { id, participants, lastMessage, lastUpdatedAt, job } = conversation;

    const displayName = job?.jobTitle ? `Chat sobre: ${job.jobTitle}` : getOtherParticipantNames(participants);
    const lastMessageContent = lastMessage?.content ?? 'No hay mensajes aún.';
    const lastMessageTimestamp = lastMessage ? formatDistanceToNow(new Date(lastMessage.timestamp), { addSuffix: true, locale: es }) : '' ;

    // Placeholder para imagen - podríamos usar la imagen del otro usuario si la tuviéramos
    const placeholderImage = "/images/placeholder-user.png"; // Asegúrate de tener una imagen placeholder

    return (
        <div
            key={id}
            onClick={() => onSelect(id)}
            className={`flex items-center p-3 border-b cursor-pointer transition-colors duration-150 ease-in-out ${isSelected ? 'bg-indigo-100' : 'hover:bg-gray-100'}`}
        >
            {/* Imagen (Placeholder por ahora) */}
            <div className="flex-shrink-0 mr-3">
                <Image 
                    src={placeholderImage} 
                    alt="Avatar" 
                    width={40} 
                    height={40} 
                    className="rounded-full" 
                />
            </div>
            {/* Contenido del Chat */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-semibold text-gray-800 truncate">{displayName}</p>
                    {lastMessage && (
                        <p className="text-xs text-gray-500 whitespace-nowrap">{lastMessageTimestamp}</p>
                    )}
                </div>
                <p className="text-sm text-gray-600 truncate">
                    {/* Podríamos añadir "Tú:" si el último mensaje es del usuario actual */}
                    {lastMessageContent}
                </p>
            </div>
        </div>
    );
};

export default ConversationListItem; 