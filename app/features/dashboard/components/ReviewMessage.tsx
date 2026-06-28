import { Trans } from "react-i18next";
import { MAX_DAILY_ENTRIES } from "~/services/entryService";
import type { DashboardStats } from "../services/statsService";
import type { ReviewStatus } from "../utils/review";

type ReviewMessageProps = {
    status: ReviewStatus;
    stats: DashboardStats;
}


export default function ReviewMessage({ status, stats }: ReviewMessageProps) {
    switch (status) {
        case 'CONTINUE':
            return (
                <Trans 
                    i18nKey="dashboard.reviewStatus.CONTINUE" 
                    components={{ primary: <strong className="text-primary-dark" /> }}
                />  
            );
        case 'COMPLETED_TODAY':
            return (
                <Trans 
                    i18nKey="dashboard.reviewStatus.COMPLETED_TODAY" 
                    components={{ primary: <strong className="text-primary-dark" /> }}
                />  
            );            
        case 'REVIEW_ONLY':
            return (
                <Trans 
                    i18nKey="dashboard.reviewStatus.REVIEW_ONLY" 
                    components={{ primary: <strong className="text-primary-dark" /> }}
                    values={{ total: Math.min(stats.remaining_words, MAX_DAILY_ENTRIES)}}
                />  
            );
        case 'START_NEW':
            return (
                <Trans 
                    i18nKey="dashboard.reviewStatus.START_NEW" 
                    components={{ primary: <strong className="text-primary-dark" /> }}
                />  
            );
        case 'NOTHING_REVIEW':
            return (
                <Trans 
                    i18nKey="dashboard.reviewStatus.NOTHING_REVIEW" 
                    components={{ primary: <strong className="text-primary-dark" /> }}
                />);
        default:
            return (
                <Trans 
                    i18nKey="dashboard.reviewStatus.ALL_LEARNED" 
                    components={{ primary: <strong className="text-primary-dark" /> }}
                />
            );
    }
};