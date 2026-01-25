import { useEffect } from "react";
import { Outlet, redirect, useRevalidator } from "react-router"
import type { LoaderFunctionArgs } from "react-router";
import supabase from "~/services/supabase"
import type { Session, AuthChangeEvent } from "@supabase/supabase-js";

export async function clientLoader({ request}: LoaderFunctionArgs) {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (!session || error) {
        const params = new URLSearchParams();
        params.set("from", new URL(request.url).pathname);
        return redirect(`/signin?${params.toString()}`);
    }

    return { session };
}

const onAuthStateChange = (callback: (event : AuthChangeEvent) => void) => {
    let currentSession: Session | null;
    return supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user?.id == currentSession?.user?.id) {
            return;
        }
        
        currentSession = session;
        callback(event);
    });
}



export default function AppLayout() {
    const revalidator = useRevalidator();

    useEffect(() => {
        const { data } = onAuthStateChange((event) => {
            if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
                revalidator.revalidate();
            }
        });

        return () => {
            if (data?.subscription?.unsubscribe) {
                data.subscription.unsubscribe();
           }
        };
    }, [revalidator]);

    return (
        <>
            <header></header>

            <main className="w-full max-w-5xl mx-auto">
                <Outlet />
            </main>

            <footer className="text-center py-2 text-sm text-gray-500">
                © 2026 DailyWords
            </footer>
        </>
    )
}
