import { useEffect } from "react";
import { Outlet, redirect, useRevalidator } from "react-router"
import type { LoaderFunctionArgs } from "react-router";
import supabase from "~/services/supabase"

export async function clientLoader({ request}: LoaderFunctionArgs) {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (!session || error) {
        const params = new URLSearchParams();
        params.set("from", new URL(request.url).pathname);
        return redirect(`/signin?${params.toString()}`);
    }

    return { session };
}

export default function AppLayout() {
    const revalidator = useRevalidator();

    useEffect(() => {
        const { data } = supabase.auth.onAuthStateChange((event, session) => {
            revalidator.revalidate();            
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

            <main>
                <Outlet />
            </main>

            <footer></footer>
        </>
    )
}
