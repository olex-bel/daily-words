import { useTranslation } from "react-i18next";
import Flashcard from "~/features/learning/components/Flashcard";
import Button from "~/shared/components/Button";
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

            <div className="grid grid-flow-col auto-cols-fr gap-4 mt-6">
                <Button className="bg-secondary text-white px-4 py-2" onClick={() => onAnswer('unknown')}>
                    ❌ {t('learning.unknownButton')}
                </Button>

                <Button className="bg-secondary text-white px-4 py-2" onClick={() => onAnswer('harder')}>
                    ⚠️ {t('learning.hardButton')}
                </Button>

                <Button className="bg-secondary text-white px-4 py-2" onClick={() => onAnswer('known')}>
                    ✅ {t('learning.knownButton')}
                </Button>
            </div>
        </>
    );
}
