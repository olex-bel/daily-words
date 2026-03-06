import { MAX_DAILY_ENTRIES } from "~/services/entryService";
import type { DashboardStats } from "../services/statsService";

export type ReviewStatus = 'CONTINUE' | 'COMPLETED_TODAY' | 'REVIEW_ONLY' | 'START_NEW' | 'ALL_LEARNED';

export function  getReviewStatus(stats: DashboardStats): ReviewStatus 
{
    const { remaining_words, total_system_words, user_total_words, session_started } = stats;

    if (session_started) {
        if (remaining_words > 0) {
            return 'CONTINUE';
        }

        return 'COMPLETED_TODAY';
    }
    
    if (remaining_words > 0) {
        if (remaining_words >= MAX_DAILY_ENTRIES) {
            return 'REVIEW_ONLY';
        }

        if (total_system_words > user_total_words) {
            return 'START_NEW';
        }

        return 'REVIEW_ONLY';
    }

    if (total_system_words > user_total_words) {
        return 'START_NEW';
    }
    
    return 'ALL_LEARNED';
};