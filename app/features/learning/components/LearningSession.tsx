import { useTranslation } from "react-i18next";
import Flashcard from "~/features/learning/components/Flashcard";
import UserAnswers from "./UserAnswers";
import Button from "~/shared/components/ui/Button";
import type { Answer } from "../types";
import type { Entry } from "../../../services/entryService";

type LearningSessionProps = {
    isPending?: boolean;
    mode: 'review' | 'learn';
    entry: Entry;
    onAnswer: (id: number, answer: Answer) => void;
}

export default function LearningSession({
    mode,
    entry,
    onAnswer,
    isPending,
}: LearningSessionProps) {
    const { t } = useTranslation();

    return (
        <>
            <Flashcard key={entry.id} entry={entry} />
            {mode === 'learn' ? <UserAnswers entryId={entry.id} onAnswer={onAnswer} isPending={isPending} />  : (
                <div className="mt-8 w-full max-w-sm px-4">
                    <Button 
                        onClick={() => onAnswer(entry.id, 'know')} 
                        className="w-full py-4 bg-primary text-primary-ink hover:bg-primary-hover transition-colors dark:border-2 dark:border-primary dark:bg-transparent dark:text-primary dark:hover:bg-primary-hover dark:hover:text-primary-ink"
                    >
                        {t('review.nextButton')} 
                    </Button>
                </div>
            )} 
        </>
    );
}
