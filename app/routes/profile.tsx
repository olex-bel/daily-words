import { redirect } from "react-router";
import { useTranslation } from "react-i18next";
import SettingsPage from "~/features/profile/components/SettingsPage";
import supabase from "~/services/supabase";
import { getUserProfile } from "~/services/profileService";
import { updatePorfileSettingsAction, changePasswordAction } from "~/features/profile/utils/actions";
import type { UserProfile } from "~/services/profileService";
import type { Route } from "./+types/profile";

export async function clientLoader() {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (!session || error) {
        return redirect("/signin");
    }

    const profile: UserProfile | null = await getUserProfile(session.user.id);

    if (!profile) {
        throw new Response("User profile not found", { status: 404 });
    }

    return { profile };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const action = formData.get("action") as string;
    const { data: { session }, error } = await supabase.auth.getSession();

    if (!session || error) {
        return redirect("/signin");
    }

    try {
        if (action === "update-settings") {
            return updatePorfileSettingsAction(session.user.id, formData);
        }

        if (action === "change-password") {
            return changePasswordAction(formData);
        }

        throw new Error(`Unknown action: ${action}`);
    } catch (e) {
        return { success: false, errorId: 'profile.updateError' };
    }
}

export default function Profile({ loaderData }: Route.ComponentProps) {
    const { t } = useTranslation();
    const { profile } = loaderData;

    return (
        <>
            <title>{t("profile.meta.title")}</title>
            <meta name="description" content={t("profile.meta.description")} />
            <meta name="keywords" content={t("profile.meta.keywords")} />
            <SettingsPage profile={profile} />
        </>
    );
}