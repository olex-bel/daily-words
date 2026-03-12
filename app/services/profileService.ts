import supabase from './supabase';

export type UserProfile = {
    name: string;
    timeZone: string;
};

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
        .from('profiles')
        .select('name, timezone')
        .eq('user_id', userId)
        .single();

    if (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }

    return {
        name: data.name,
        timeZone: data.timezone,
    };
}

export async function updateProfile(userId: string, profile: UserProfile) {
    const { error } = await supabase
        .from('profiles').update({
            name: profile.name,
            timezone: profile.timeZone,
        })
        .eq('user_id', userId);
    
    if (error) {
        console.error('Error updating profile:', error);
        throw new Error('Error updating profile.');
    }
}

export async function updatePassword(newPassword: string) {
    const { error } =  await supabase.auth.updateUser({
        password: newPassword
    });

    if (error) {
        console.error('Error updating password:', error);
        throw new Error('Error updating password.');
    }
}
