import { useState } from "react";
import CardFront from "./CardFront";
import CardBack from "./CardBack";
import Surface from "~/shared/components/ui/Surface";
import type { Entry } from "../../../services/entryService";

type FlashcardProps = {
    entry: Entry;
}

export default function Flashcard({ entry }: FlashcardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <article className={`w-full max-w-md h-[280px] md:h-[320px] perspective-distant`}>
            <Surface className={`relative transform-3d transition-transform duration-700 w-full h-full dark:hover:border-white/25 ${isFlipped ? 'rotate-x-180' : ''}`}>
                <CardFront entry={entry} onShowTranslation={() => setIsFlipped(true)} />
                <CardBack entry={entry} onShowTranslation={() => setIsFlipped(false)} />
            </Surface>
        </article>
    );
}