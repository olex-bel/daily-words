import { useFetcher } from "react-router";
import { useTranslation } from "react-i18next";
import Surface from "~/shared/components/ui/Surface";
import Button from "~/shared/components/ui/Button";
import TimezoneSelect from "./TimezoneSelect";
import type { UserProfile } from "~/services/profileService";

type ProfileSettingsProps = {
    profile: UserProfile;
};

export default function ProfileSettingsForm({ profile }: ProfileSettingsProps) {
    const fetcher = useFetcher({
        key: "profile-form",
    });
    const { t } = useTranslation();

    return (
        <Surface className="p-2">
            <h2 className="text-xl font-bold mb-6 text-ink">{t("profile.profileSettingsTitle")}</h2>
            <fetcher.Form method="post" className="flex flex-col gap-2">
                <label className="flex flex-col">
                    <span className="font-semibold mb-1 text-xs">{t("profile.form.name")}</span>
                    <input
                        type="text"
                        name="name"
                        defaultValue={profile.name}
                        required
                        className="bg-ink/5 border-transparent rounded-md p-2"
                    />
                </label>
                <TimezoneSelect defaultValue={profile.timeZone} />

                <Button 
                    type="submit"
                    name="action" 
                    value="update-settings" 
                    disabled={fetcher.state === "submitting"}
                    className="w-fit bg-primary text-primary-ink disabled:bg-disabled px-8 py-4 rounded-2xl shadow-md active:scale-95 transition-all"
                >
                    {t("profile.form.saveAction")}
                </Button>
            </fetcher.Form>
        </Surface>
    )
}