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
    
        return { error };
}

export async function updatePassword(newPassword: string) {
    const { error } =  await supabase.auth.updateUser({
        password: newPassword
    });

    return { error };
}

export async function resetPasswordForEmail(email:string) {
    const {  error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}${import.meta.env.BASE_URL}set-password`,
    })

    return { error };
}

export async function setNewPassword(password: string) {
    const { error } = await supabase.auth.updateUser({ password })

    return { error };
}
