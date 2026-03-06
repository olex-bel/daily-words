import supabase from "~/services/supabase";

export type DashboardStats = {
    session_started: boolean;
    total_system_words: number;
    total_stages: number;
    user_total_words: number;
    mastered_words: number;
    in_learning: number;
    remaining_words: number;
    new_today: number;
}

export async function getDashboardStats(): Promise<DashboardStats | null> {
    const { data, error } = await supabase.rpc('get_dashboard_stats');

    if (error) {
        throw new Error(error.message);
    }

    if (!Array.isArray(data) || data.length === 0) {
        return null;
    }

    return data[0] as DashboardStats;
}
