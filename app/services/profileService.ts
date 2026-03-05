import supabase from './supabase';
import { parseDate, sameDay } from '~/utils/date';

export type UserProfile = {
    name: string;
};

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
        .from('profiles')
        .select('name, last_seen_at')
        .eq('user_id', userId)
        .single();

    if (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }

    return {
        name: data.name,
    };
}
