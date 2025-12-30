
import { Outlet } from "react-router";

export default function PublicLayout() {
    return (
        <>
            <header></header>

            <main className="w-8/9 mx-auto">
                <Outlet />
            </main>
        </>
    );
}
