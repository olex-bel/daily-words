import Button from "~/shared/components/ui/Button";
import { RiResetLeftFill } from "react-icons/ri";
import { getWordStyle } from "~/features/learning/utils/card";
import type { Entry } from "../../../services/entryService";
import type { MouseEvent } from "react";

type CardBackProps = {
    entry: Entry;
    onShowTranslation?: () => void;
}

export default function CardBack({ entry, onShowTranslation }: CardBackProps) {
    const { content, meanings, grammar } = entry;
    const style = getWordStyle(grammar);

    const handleButtonClick = (e: MouseEvent) => {
        e.preventDefault();

        if (onShowTranslation) {
            onShowTranslation();
        }
    };

    return (
        <div className="absolute inset-0 flex flex-col backface-hidden p-4 rotate-x-180 shadow-md hover:shadow-xl cursor-pointer" onClick={onShowTranslation}>
            <div className="shrink-0 text-base font-medium capitalize tracking-[0.2em] line-clamp-2 leading-[1.15] text-balance text-ink-muted text-center mb-4 md:mb-6">
                {content}
            </div>

            <div className="space-y-4 flex-grow overflow-y-auto pr-3 flex flex flex-col">
                <ol className="list-decimal list-inside my-auto mx-auto space-y-8 marker:text-primary-dark cursor-default" onClick={(e: MouseEvent) => e.stopPropagation()}>
                    {meanings.map((meaning, index) => (
                        <li key={index} className={`transition-all hover:translate-x-1`}>
                            <span className="text-md md:text-xl font-bold leading-none">{meaning.val}</span>
                            <p className="text-sm md:text-base text-slate-500 italic mt-1 font-medium">
                                {meaning.context}
                            </p>
                        </li>
                    ))}
                </ol>
            </div>

            <div className="h-10 flex justify-end items-center shrink-0">
                <Button variant="text" aria-label="Перевернути картку" aria-pressed="false"  className="p-2 bg-surface hover:bg-surface-hover" onClick={handleButtonClick}>
                    <RiResetLeftFill aria-hidden="true" focusable="false" className="w-6 h-6 text-ink" />
                </Button>
            </div>
        </div>
    );
}