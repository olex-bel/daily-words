import { useTranslation } from "react-i18next";
import SessionSummary from "~/shared/components/ui/SessionSummary";
import StatBox from "~/shared/components/ui/StatBox";

type QuizSummaryProps = {
    total: number;
    results: {
        known: number;
        unknown: number;
    };
    onRepeat: () => void;
    onExit: () => void;
};

export default function QuizSummary({ total, results, onRepeat, onExit }: QuizSummaryProps) {
    const { t } = useTranslation();

    return (
        <SessionSummary 
            total={total} 
            onRepeat={onRepeat} 
            onExit={onExit}
        >
            <div className="grid grid-cols-2 gap-3 w-full">
                <StatBox 
                    label={t('quiz.summary.correct')} 
                    value={results.known} 
                    color="bg-success" 
                    textColor="text-success-dark" 
                />
                <StatBox 
                    label={t('quiz.summary.incorrect')} 
                    value={results.unknown} 
                    color="bg-error" 
                    textColor="text-error-dark" 
                />
            </div>
        </SessionSummary>
    );
}