
import { Outlet, redirect } from "react-router"
import type { LoaderFunctionArgs } from "react-router";
import supabase from "~/services/supabase"

export async function clientLoader({ request}: LoaderFunctionArgs) {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (!session || error) {
        const params = new URLSearchParams();
        params.set("from", new URL(request.url).pathname);
        return redirect(`/login?${params.toString()}`);
    }

    return { session };
}

export default function AppLayout() {
    return (
        <div>
            <header></header>

            <main>
                <Outlet />
            </main>
        </div>
    )
}
