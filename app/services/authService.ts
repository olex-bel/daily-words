
import supabase from "~/services/supabase";

type SignUpProps = {
    email: string;
    password: string;
    name: string;
    timeZone: string;
};

export async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    return {
        error,
    };
}

export async function singUp({ email, password, name, timeZone }: SignUpProps) {
    const { error, data } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                name: name,
                timezone: timeZone,
            },
        },
    });

    return { error, data };
}
