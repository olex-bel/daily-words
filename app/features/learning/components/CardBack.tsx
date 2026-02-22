import Button from "~/shared/components/ui/Button";
import MeaningList from "./MeaningList";
import { RiStickyNoteLine } from "react-icons/ri";
import type { Entry } from "../../../services/entryService";
import type { MouseEvent } from "react";

type CardBackProps = {
    entry: Entry;
    onShowTranslation?: () => void;
}

export default function CardBack({ entry, onShowTranslation }: CardBackProps) {
    const { content, meanings, grammar } = entry;

    const handleButtonClick = (e: MouseEvent) => {
        e.preventDefault();

        if (onShowTranslation) {
            onShowTranslation();
        }
    };

    return (
        <div className="absolute inset-0 flex flex-col backface-hidden p-4 rotate-x-180 shadow-md hover:shadow-xl cursor-pointer" onClick={onShowTranslation}>
            <div className="shrink-0 text-primary-dark text-base font-bold first-letter:uppercase tracking-[0.2em] line-clamp-2 leading-[1.15] text-balance text-ink-muted text-center mb-4 md:mb-6">
                {content}
            </div>

            <MeaningList meanings={meanings} />

            <div className="h-10 flex justify-end items-center shrink-0">
                <Button variant="text" aria-label="Перевернути картку" aria-pressed="false"  className="p-2 bg-surface hover:bg-surface-hover" onClick={handleButtonClick}>
                    <RiStickyNoteLine aria-hidden="true" focusable="false" className="w-6 h-6 text-ink" />
                </Button>
            </div>
        </div>
    );
}