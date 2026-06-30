import { useTranslation } from "react-i18next";
import Flashcard from "~/features/learning/components/Flashcard";
import UserAnswers from "./UserAnswers";
import Button from "~/shared/components/ui/Button";
import type { Answer } from "../types";
import type { Entry } from "../../../services/entryService";

type LearningSessionProps = {
    isPending?: boolean;
    isLast: boolean;
    mode: 'review' | 'learn';
    entry: Entry;
    onAnswer: (id: number, answer: Answer) => void;
}

export default function LearningSession({
    mode,
    entry,
    onAnswer,
    isPending,
    isLast,
}: LearningSessionProps) {
    const { t } = useTranslation();

    return (
        <>
            <Flashcard key={entry.id} entry={entry} />
            {mode === 'learn' ? <UserAnswers entryId={entry.id} onAnswer={onAnswer} isPending={isPending} />  : (
                <div className="mt-8 w-full max-w-sm px-4">
                    <Button 
                        onClick={() => onAnswer(entry.id, 'know')} 
                        disabled={isPending}
                        className="w-full py-4 bg-primary font-semibold text-primary-ink disabled:bg-disabled
                            enabled:hover:bg-primary-hover transition-colors dark:border-2 
                            
                            dark:text-primary-ink dark:enabled:hover:bg-primary-hover dark:enabled:hover:text-primary-ink 
                            dark:disabled:text-ink-muted dark:disabled:border-line

                            flex items-center justify-center gap-2"
                    >
                        {isLast? t('review.finishButton') : t('review.nextButton')} 
                    </Button>
                </div>
            )} 
        </>
    );
}
