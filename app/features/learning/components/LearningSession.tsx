import { useTranslation } from "react-i18next";
import Flashcard from "~/features/learning/components/Flashcard";
import Button from "~/shared/components/Button";
import { RiCloseFill, RiCheckFill, RiErrorWarningLine } from "react-icons/ri";
import type { Answer } from "../types";
import type { WordEntry } from "../services/dailywords";

type LearningSessionProps = {
    entry: WordEntry;
    onAnswer: (answer: Answer) => void;
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
                    className="bg-white border-1 border-red-100 hover:bg-red-50 text-red-600 transition-all active:scale-95 px-4 py-2" 
                    onClick={() => onAnswer('unknown')}
                    icon={<RiCloseFill />}
                >
                    {t('learning.unknownButton')}
                </Button>

                <Button 
                    className="bg-white border-1 border-orange-100 hover:bg-orange-50 text-orange-600 transition-all active:scale-95 px-4 py-2" 
                    onClick={() => onAnswer('harder')}
                    icon={<RiErrorWarningLine />}
                >
                    {t('learning.hardButton')}
                </Button>

                <Button 
                    className="bg-white border-1 border-green-100 hover:bg-green-50 text-green-600 transition-all active:scale-95 px-4 py-2" 
                    onClick={() => onAnswer('known')}
                    icon={<RiCheckFill />}
                >
                    {t('learning.knownButton')}
                </Button>
            </div>
        </>
    );
}
