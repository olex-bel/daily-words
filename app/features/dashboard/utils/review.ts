import { MAX_DAILY_ENTRIES } from "~/services/entryService";
import type { DashboardStats } from "../services/statsService";

export type ReviewStatus = 'CONTINUE' | 'COMPLETED_TODAY' | 'REVIEW_ONLY' | 'START_NEW' | 'ALL_LEARNED';

export function  getReviewStatus(stats: DashboardStats): ReviewStatus 
{
    const { daily_task_total, total_system_words, user_total_words, new_today, v_session_started } = stats;

    if (v_session_started) {
        if (daily_task_total > 0) {
            return 'CONTINUE';
        }

        return 'COMPLETED_TODAY';
    }
    
    if (daily_task_total === MAX_DAILY_ENTRIES) {
        if (new_today === 0) {
            return 'REVIEW_ONLY';
        } else {
            return 'CONTINUE';
        }
    }

    if (total_system_words > user_total_words) {
        return 'START_NEW';
    }
    
    return 'ALL_LEARNED';
};