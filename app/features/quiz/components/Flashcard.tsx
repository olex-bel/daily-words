import { useState, useMemo, useEffect, useRef } from "react";
import Surface from "~/shared/components/ui/Surface";
import QuizFront from "./QuizFront";
import QuizBack from "./QuizBack";
import type { QuizEntry, Distractor } from "~/services/entryService";

type FlashcardProps = {
    entry: QuizEntry;
    distractors: Distractor[];
    onSelect: (optionId: number) => void;
};

function shuffle<T>(a: T[]): T[] {
    const shuffled = [...a];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

export default function Flashcard({ entry, distractors, onSelect }: FlashcardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const options = useMemo(() => {
        const allOptions = [
            ...distractors,
            { id: entry.id, content: entry.content },
        ]

        return shuffle(allOptions);
    }, [entry.id]);

    const [meaning] = useState(() => {
        if (!entry.meanings?.length) {
            return { val: "" };
        }

        const randomIndex = Math.floor(Math.random() * entry.meanings.length);
        return entry.meanings[randomIndex];
    });

    const handleAnswer = (optionId: number) => {
        const correct = optionId === entry.id;
        setIsCorrect(correct);
        setIsFlipped(true);
        onSelect(optionId)
    }

    useEffect(() => {
        containerRef.current?.focus();
    }, [])

    return (
        <article ref={containerRef} className={`w-full max-w-md h-[280px] md:h-[320px] perspective-distant`}>
            <Surface className={`relative transform-3d transition-transform duration-700 w-full h-full dark:hover:border-white/25 ${isFlipped ? 'rotate-x-180' : ''}`}>
                <QuizFront question={meaning.val} options={options} onOptionSelect={handleAnswer} />
                <QuizBack content={entry.content} meaning={meaning.val} isCorrect={isCorrect} />
            </Surface>
        </article>
    );
}
