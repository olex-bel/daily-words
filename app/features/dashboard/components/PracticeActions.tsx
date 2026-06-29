import { useTranslation } from "react-i18next";
import LinkButton from "~/shared/components/ui/LinkButton";
import type { DashboardStats } from "../services/statsService";

type PracticeActionsProps = {
    stats: DashboardStats;
};

export default function PracticeActions({ stats }: PracticeActionsProps) {
    const { t } = useTranslation();
    const isReviewAllowed = stats.in_learning > 0;
    const isQuizAllowed = stats.mastered_words > 5;
    

    return (
        <div className="flex flex-col gap-2 w-full md:max-w-fit md:flex-row">
            {
                isQuizAllowed && (
                    <LinkButton 
                        to="/quiz" 
                        className="
                            bg-primary text-primary-ink px-8 py-4 rounded-2xl shadow-md active:scale-95 transition-all
                            outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                        "
                    >
                        {t('dashboard.startQuiz')}
                    </LinkButton>)
            }
            {
                isReviewAllowed && (
                    <LinkButton 
                        to="/review" 
                        className="
                            bg-surface hover:bg-surface-hover border-1 border-primary
                            text-primary px-8 py-4 rounded-2xl active:scale-95 transition-all
                            outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                        "
                    >
                        {t('dashboard.startReview')}
                    </LinkButton>)
            }
        </div>
    )
}