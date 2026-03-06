import { useTranslation } from "react-i18next";
import type { DashboardStats } from "../services/statsService";
import type { ReviewStatus } from "../utils/review";

type ReviewMessageProps = {
    status: ReviewStatus;
    stats: DashboardStats;
}


export default function ReviewMessage({ status, stats }: ReviewMessageProps) {
    const { t } = useTranslation();

    switch (status) {
        case 'CONTINUE':
            return <>{t('dashboard.reviewStatus.CONTINUE.1')} <strong>{t('dashboard.reviewStatus.CONTINUE.2')}</strong>.</>;
        case 'COMPLETED_TODAY':
            return <>{t('dashboard.reviewStatus.COMPLETED_TODAY.1')} <strong className="text-primary-dark">{t('dashboard.reviewStatus.COMPLETED_TODAY.2')}</strong>.</>;
        case 'REVIEW_ONLY':
            return <>{t('dashboard.reviewStatus.REVIEW_ONLY.1')} <strong>{t('dashboard.reviewStatus.REVIEW_ONLY.2', { total: stats.remaining_words })}</strong>.</>;
        case 'START_NEW':
            return <>{t('dashboard.reviewStatus.START_NEW.1')} <strong className="text-primary-dark">{t('dashboard.reviewStatus.START_NEW.2')}</strong>.</>;
        default:
            return <>{t('dashboard.reviewStatus.ALL_LEARNED.1')} <strong className="text-primary-dark">{t('dashboard.reviewStatus.ALL_LEARNED.2')}</strong>!</>;
    }
};