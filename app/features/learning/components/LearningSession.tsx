import { useTranslation } from "react-i18next";
import Flashcard from "~/features/learning/components/Flashcard";
import Button from "~/shared/components/ui/Button";
import { RiCloseFill, RiCheckFill, RiErrorWarningLine } from "react-icons/ri";
import type { Answer } from "../types";
import type { Entry } from "../../../services/entryService";

type LearningSessionProps = {
    entry: Entry;
    onAnswer: (id: number, answer: Answer) => void;
}

export default function LearningSession({
    entry,
    onAnswer,
}: LearningSessionProps) {
    const { t } = useTranslation();

    return (
        <>
            <Flashcard key={entry.id} entry={entry} />

            <div className="grid grid-flow-col auto-cols-fr gap-4 mt-6 md:mt-8 text-xs md:text-sm">
                <Button 
                    className="bg-surface hover:bg-surface-hover shadow-md shadow-line border-1 border-error text-error-dark transition-all active:scale-95 px-4 py-2" 
                    onClick={() => onAnswer(entry.id, 'unknown')}
                    icon={<RiCloseFill />}
                >
                    {t('learning.unknownButton')}
                </Button>

                <Button 
                    className="bg-surface hover:bg-surface-hover shadow-md shadow-line border-1 border-warning text-warning-dark transition-all active:scale-95 px-4 py-2" 
                    onClick={() => onAnswer(entry.id, 'hard')}
                    icon={<RiErrorWarningLine />}
                >
                    {t('learning.hardButton')}
                </Button>

                <Button 
                    className="bg-surface hover:bg-surface-hover shadow-md shadow-line border-1 border-success text-success-dark transition-all active:scale-95 px-4 py-2" 
                    onClick={() => onAnswer(entry.id, 'know')}
                    icon={<RiCheckFill />}
                >
                    {t('learning.knownButton')}
                </Button>
            </div>
        </>
    );
}
