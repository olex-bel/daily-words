import { useState } from "react";
import CardFront from "./CardFront";
import CardBack from "./CardBack";
import type { WordEntry } from "../services/dailywords";

type FlashcardProps = {
    entry: WordEntry;
}

export default function Flashcard({ entry }: FlashcardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <article className={`w-full max-w-md min-h-[280px] md:min-h-[320px] perspective-distant`}>
            <div className={`rounded-md relative bg-surface transform-3d transition-transform duration-700 w-full h-full ${isFlipped ? 'rotate-x-180' : ''}`}>
                <CardFront entry={entry} onShowTranslation={() => setIsFlipped(true)} />
                <CardBack entry={entry} />
            </div>
        </article>
    );
}