import { useTranslation } from 'react-i18next';
import { RiSpeakFill, RiPauseLargeFill } from 'react-icons/ri';
import { useState } from 'react';

type AudioPlayerProps = {
    url: string | null;
    className?: string;
};

export default function AudioPlayer({ url, className }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const { t } = useTranslation();

    if (!url) {
        return null;
    }

    const playAudio = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const audio = new Audio(url);
        
        setIsPlaying(true);
        audio.play();
        
        audio.onended = () => setIsPlaying(false);
        audio.onerror = () => setIsPlaying(false);
    };

    return (
        <button 
            onClick={playAudio}
            className={`p-2 rounded-full transition-colors ${className || ''} ${
                isPlaying ? 'text-secondary bg-secondary-ink' : 'text-ink hover:text-secondary hover:bg-secondary-ink'
            }`}
            title={t('learning.audioTitle')}
        >
            {isPlaying ? <RiPauseLargeFill className="w-6 h-6" /> : <RiSpeakFill className="w-6 h-6" />}
        </button>
    );
}