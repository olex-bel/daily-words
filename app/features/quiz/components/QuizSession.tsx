import { useState } from "react";
import { useTranslation } from "react-i18next";
import Flashcard from "./Flashcard";
import Button from "~/shared/components/ui/Button";
import type { QuizEntry, Distractor } from "~/services/entryService";

type QuizSessionProps = {
    isLoading: boolean;
    isLast: boolean;
    question: QuizEntry;
    distractors: Distractor[];
    onAnswerSubmit: (answerId: number) => void;
};

export default function QuizSession({ isLoading, isLast, question, distractors, onAnswerSubmit }: QuizSessionProps) {
    const { t } = useTranslation();
    const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
    const questionId = question?.id;
    const isButtonDisabled = isLoading || !selectedAnswerId;

    const handleClick = () => {
        if (!isButtonDisabled) {
            onAnswerSubmit(selectedAnswerId);
        }
    }
    const handleAnswerSelect = (optionId: number) => {
        setSelectedAnswerId(optionId);
    }

    return (
        <>
            <div className="flex-grow flex flex-col justify-center items-center">
                <Flashcard key={questionId} onSelect={handleAnswerSelect} entry={question} distractors={distractors} />
                <div className="mt-8 w-full max-w-sm px-4">
                    <Button 
                        onClick={handleClick} 
                        disabled={isLoading || !selectedAnswerId}
                        className="w-full py-4 bg-primary font-semibold text-primary-ink 
                        hover:bg-primary-hover transition-colors dark:border-2 dark:border-primary dark:bg-transparent 
                        dark:text-primary dark:hover:bg-primary-hover dark:hover:text-primary-ink disabled:bg-disabled
                        flex items-center justify-center gap-2"
                    >
                        {isLoading && <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />}
                        <span>{isLast? t('review.finishButton') : t('review.nextButton')}</span>
                    </Button>
                </div>
            </div>
        </>
    );
}
