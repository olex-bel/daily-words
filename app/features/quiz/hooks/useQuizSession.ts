import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { getDistractors, updateCardReview } from "~/services/entryService";
import type { QuizEntry, Distractor } from "~/services/entryService";

export function useQuizSession(firstQuestionDistractors: Distractor[]) {
    const { t } = useTranslation();
    const [distractors, setDistractors] = useState<Distractor[]>(firstQuestionDistractors);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submitAnswer = useCallback(async (
        currentWord: QuizEntry, 
        nextWord: QuizEntry | null, 
        isCorrect: boolean, 
        onSuccess: () => void
    ) => {
        if (isLoading) return;
        setError(null);
        setIsLoading(true);

        try {
            if (!isCorrect) {
                // updateCardReview(currentWord.id, 'unknown');
            }

            if (nextWord) {
                const nextDistractors = await getDistractors(nextWord.id);
                setDistractors(nextDistractors);
            }
            onSuccess();
        } catch (error) {
            setError(t('quiz.updateError.message'));
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, t]);

    return { error, distractors, isLoading, setError, submitAnswer };
}