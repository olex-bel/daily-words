import { useTranslation } from "react-i18next";
import SessionSummary from "~/shared/components/ui/SessionSummary";
import StatBox from "~/shared/components/ui/StatBox";

type LearningSummaryProps = {
    total: number;
    results: {
        know: number;
        hard: number;
        unknown: number;
    };
    onRepeat: () => void;
    onExit: () => void;
}

export default function LearningSummary({ total, results, onRepeat, onExit }: LearningSummaryProps) {
    const { t } = useTranslation();

    return (
        <SessionSummary total={total} onRepeat={onRepeat} onExit={onExit}>
            <div className="grid grid-cols-3 gap-3 w-full">
                <StatBox label={t('learning.summary.know')} value={results.know} color="bg-success" textColor="text-success-dark" />
                <StatBox label={t('learning.summary.hard')} value={results.hard} color="bg-warning" textColor="text-warning-dark" />
                <StatBox label={t('learning.summary.dontKnow')} value={results.unknown} color="bg-error" textColor="text-error-dark" />
            </div>
        </SessionSummary>
    );
}