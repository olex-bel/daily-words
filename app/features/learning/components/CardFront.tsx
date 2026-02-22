import CardHeader from "./CardHeader";
import Button from "~/shared/components/ui/Button";
import AudioPlayer from "./AudioPlayer";
import { useTranslation } from "react-i18next";
import { RiStickyNoteLine } from "react-icons/ri";
import { getContentStyles } from "../utils/content";
import type { Entry } from "../../../services/entryService";
import type { MouseEvent } from "react";


type CardFrontProps = {
    entry: Entry;
    onShowTranslation?: () => void;
}

export default function CardFront({ entry, onShowTranslation }: CardFrontProps) {
    const { t } = useTranslation();
    const { content, grammar, example, audio_url, type } = entry;
    const contentCss = getContentStyles(type, content);

    const handleButtonClick = (e: MouseEvent) => {
        e.preventDefault();

        if (onShowTranslation) {
            onShowTranslation();
        }
    };

    return (
        <div className="h-full flex flex-col backface-hidden p-4 rotate-x-0 shadow-md hover:shadow-xl cursor-pointer overflow-hidden" onClick={onShowTranslation}>
            <CardHeader grammar={grammar} />
            <div className={`first-letter:uppercase text-primary-dark text-center font-bold ${contentCss}`}>
                {content}
            </div>
            <div className="flex-grow flex justify-center items-center overflow-hidden text-ellipsis">
                <p className="font-serif text-lg md:text-xl text-ink-muted leading-relaxed">
                    {example}
                </p>
            </div>
            <div className="h-10 flex justify-between items-center shrink-0">
                {audio_url && <AudioPlayer url={audio_url} />}

                <Button variant="text" aria-label="Перевернути картку" aria-pressed="false"  className="p-2 bg-surface hover:bg-surface-hover" onClick={handleButtonClick}>
                    <RiStickyNoteLine aria-hidden="true" focusable="false" className="w-6 h-6 text-ink" />
                </Button>
            </div>
        </div>
    );
}
