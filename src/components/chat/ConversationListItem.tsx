import React from 'react';
import Image from 'next/image';
import { ConversationSummaryDto } from '@/types/chat';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale'; // Para formato de fecha en español

interface ConversationListItemProps {
    conversation: ConversationSummaryDto;
    isSelected: boolean;
    onSelect: (id: number) => void;
}

// Ruta al placeholder - ¡¡VERIFICA QUE ESTA RUTA ES CORRECTA EN TU CARPETA `public`!!
const PLACEHOLDER_IMAGE_PATH = '/images/placeholder-user.png'; 

const ConversationListItem: React.FC<ConversationListItemProps> = ({
    conversation,
    isSelected,
    onSelect,
}) => {
    const { id, jobOwnerInfo, job, lastMessage, lastUpdatedAt } = conversation;

    // --- Información Principal --- 
    const companyName = job?.companyName ?? 'Empresa no especificada';
    // Determinar imagen a mostrar
    const displayImage = jobOwnerInfo?.imageUrl ?? PLACEHOLDER_IMAGE_PATH; 
    const altText = `Avatar de ${companyName}`; // Usar companyName en alt
    const jobTitle = job?.jobTitle ?? 'Anuncio sin título';

    // --- Información Secundaria (Último Mensaje) --- 
    const lastMessageContent = lastMessage?.content ?? 'Inicia la conversación...';
    const lastMessageTimestamp = lastMessage ? formatDistanceToNow(new Date(lastMessage.timestamp), { addSuffix: true, locale: es }) : null;

    // Función para manejar errores de carga de imagen y evitar bucles
    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const currentTarget = event.currentTarget;
        const currentSrc = currentTarget.src;
        
        // Obtener la URL base para comparar sin parámetros de optimización de Next/Image
        const currentBaseSrc = currentSrc.split('?')[0];
        const placeholderBaseSrc = new URL(PLACEHOLDER_IMAGE_PATH, window.location.origin).pathname; 

        console.error(`Error cargando imagen: ${currentBaseSrc}`);
        
        // Si la imagen que falló NO es ya el placeholder, intenta poner el placeholder
        if (!currentBaseSrc.endsWith(placeholderBaseSrc)) {
            console.log(`Intentando fallback a placeholder: ${PLACEHOLDER_IMAGE_PATH}`);
            currentTarget.src = PLACEHOLDER_IMAGE_PATH;
        } else {
            // Si incluso el placeholder falla, no hagas nada más para evitar el bucle.
            console.warn(`El placeholder ${PLACEHOLDER_IMAGE_PATH} también falló o ya se intentó.`);
            // Opcional: Ocultar completamente si el placeholder falla
            // currentTarget.style.display = 'none';
        }
    };

    return (
        <div
            key={id}
            onClick={() => onSelect(id)}
            className={`flex items-center p-3 border-b border-gray-200 cursor-pointer transition-colors duration-150 ease-in-out ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
        >
            {/* Sección de la Imagen Eliminada */}
            <div className="flex-shrink-0 mr-3">
                <Image
                    src={displayImage}
                    alt={altText}
                    width={48}
                    height={48}
                    className="rounded-full object-cover bg-gray-200"
                    unoptimized={displayImage === PLACEHOLDER_IMAGE_PATH}
                    onError={handleImageError}
                />
            </div>

            {/* Contenido Principal (Nombre Empresa, Título Job, Último Mensaje) */}
            <div className="flex-1 min-w-0">
                {/* Fila Superior: Nombre Empresa y Timestamp */}
                <div className="flex justify-between items-baseline mb-0.5">
                    <p className="text-sm font-medium text-gray-900 truncate">{companyName}</p>
                    {lastMessageTimestamp && (
                        <p className="text-xs text-gray-500 whitespace-nowrap ml-2">{lastMessageTimestamp}</p>
                    )}
                </div>
                {/* Fila Media: Título del Anuncio */}
                <p className="text-xs text-gray-700 truncate mb-1">{jobTitle}</p>
                {/* Fila Inferior: Último Mensaje */}
                <p className="text-sm text-gray-500 truncate">
                    {lastMessageContent}
                </p>
            </div>
        </div>
    );
};

export default ConversationListItem; 