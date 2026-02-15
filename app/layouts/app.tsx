import { useEffect } from "react";
import { Outlet, redirect, useRevalidator } from "react-router"
import supabase from "~/services/supabase"
import { getUserProfileCached } from "~/services/profileService.cached";
import logo from "~/asset/logo.svg";
import type { Session, AuthChangeEvent } from "@supabase/supabase-js";
import type { UserProfile } from "~/services/profileService";
import type { LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/app";
import type { AuthOutletContext } from "~/hooks/useAuthContext";

export async function clientLoader({ request}: LoaderFunctionArgs) {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (!session || error) {
        const params = new URLSearchParams();
        params.set("from", new URL(request.url).pathname);
        return redirect(`/signin?${params.toString()}`);
    }

    const profile: UserProfile | null = await getUserProfileCached(session.user.id);

    if (!profile) {
        throw new Response("User profile not found", { status: 404 });
    }

    return { session, profile };
}

const onAuthStateChange = (callback: (event : AuthChangeEvent) => void) => {
    let currentSession: Session | null;
    return supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user?.id == currentSession?.user?.id) {
            return;
        }

        if (currentSession) {
            getUserProfileCached.invalidate(currentSession.user.id)
        }
        
        currentSession = session;
        callback(event);
    });
}

export default function AppLayout({ loaderData }: Route.ComponentProps) {
    const revalidator = useRevalidator();
    const { profile } = loaderData;

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
            <header className="bg-surface shadow-sm h-[50px] md:h-[70px] flex items-center">
                <div className="w-[90%] max-w-5xl mx-auto flex items-center">
                    <img src={logo} alt="DailyWords Logo" className="h-8 md:h-10 drop-shadow-md rounded-t-xl rounded-br-xl" />
                </div>
            </header>

            <main className="w-[90%] max-w-5xl mx-auto">
                <Outlet context={ { profile } satisfies AuthOutletContext }/>
            </main>

            <footer className="text-center py-2 text-sm text-ink-muted">
                © 2026 DailyWords
            </footer>
        </>
    )
}
