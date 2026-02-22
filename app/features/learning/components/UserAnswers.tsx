import { useTranslation } from "react-i18next";
import Button from "~/shared/components/ui/Button";
import { RiCloseFill, RiCheckFill, RiErrorWarningLine } from "react-icons/ri";
import type { Answer } from "../types";

type UserAnswersProps = {
    isPending?: boolean;
    entryId: number;
    onAnswer: (id: number, answer: Answer) => void;
}

export default function UserAnswers({ entryId, onAnswer, isPending }: UserAnswersProps) {
    const { t } = useTranslation();
    return (
        <div className="grid grid-flow-col auto-cols-fr gap-4 mt-6 md:mt-8 text-xs md:text-sm">
            <Button 
                className="bg-surface hover:bg-surface-hover shadow-md shadow-line border-1 border-error text-error-dark transition-all active:scale-95 px-4 py-2" 
                onClick={() => onAnswer(entryId, 'unknown')}
                icon={<RiCloseFill />}
                disabled={isPending}
            >
                {t('learning.unknownButton')}
            </Button>

            <Button 
                className="bg-surface hover:bg-surface-hover shadow-md shadow-line border-1 border-warning text-warning-dark transition-all active:scale-95 px-4 py-2" 
                onClick={() => onAnswer(entryId, 'hard')}
                icon={<RiErrorWarningLine />}
                disabled={isPending}
            >
                {t('learning.hardButton')}
            </Button>

            <Button 
                className="bg-surface hover:bg-surface-hover shadow-md shadow-line border-1 border-success text-success-dark transition-all active:scale-95 px-4 py-2" 
                onClick={() => onAnswer(entryId, 'know')}
                icon={<RiCheckFill />}
                disabled={isPending}
            >
                {t('learning.knownButton')}
            </Button>
        </div>
    )
}
