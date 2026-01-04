import { useState } from "react";
import CardFront from "./CardFront";
import CardBack from "./CardBack";
import type { WordData } from "~/utils/card";

type FlashcardProps = {
    data: WordData;
}

export default function Flashcard({ data }: FlashcardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <article className={`w-full max-w-md min-h-[280px] md:min-h-[320px] perspective-distant`}>
            <div className={`rounded-md relative bg-surface transform-3d transition-transform duration-700 w-full h-full ${isFlipped ? 'rotate-x-180' : ''}`}>
                <CardFront data={data} onShowTranslation={() => setIsFlipped(true)} />
                <CardBack data={data} />
            </div>
        </article>
    );
}