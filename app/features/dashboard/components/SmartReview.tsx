import { useTranslation } from "react-i18next";
import { useAuthContext } from "~/hooks/useAuthContext";
import Surface from "~/shared/components/ui/Surface";
import LinkButton from "~/shared/components/ui/LinkButton";
import ReviewMessage from "./ReviewMessage";
import StatusIcon from "./StatusIcon";
import { getReviewStatus } from "../utils/review";
import type { DashboardStats } from "../services/statsService";

type SmartReviewProps = {
    stats: DashboardStats;
};

export default function SmartReview({ stats }: SmartReviewProps) {
    const { t } = useTranslation();
    const { profile } = useAuthContext();
    const status = getReviewStatus(stats, profile);
    const isLearningAllowed = status !== 'COMPLETED_TODAY' && status !== 'ALL_LEARNED';

    return (
        <Surface className="relative overflow-hidden bg-surface text-ink p-8 group">
            <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-2 text-center sm:text-left">{t('dashboard.reviewTitle')}</h2>
                <div className="flex items-center sm:items-center mb-6">
                    <StatusIcon status={status} />
                    <p className="text-ink opacity-90 ">
                        <ReviewMessage stats={stats} status={status} />
                    </p>
                </div>
                {isLearningAllowed ? (
                    <LinkButton 
                        to="/learning" 
                        className="bg-primary text-primary-ink px-8 py-4 rounded-2xl shadow-md active:scale-95 transition-all"
                    >
                        {t('dashboard.startLearning')}
                    </LinkButton>
                ) : (
                    <LinkButton 
                        to="/review" 
                        className="bg-primary text-primary-ink px-8 py-4 rounded-2xl shadow-md active:scale-95 transition-all"
                    >
                        {t('dashboard.startReview')}
                    </LinkButton>
                )
                }
            </div>
        </Surface>
    );
}