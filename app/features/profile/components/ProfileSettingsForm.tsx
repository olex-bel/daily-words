import { useFetcher } from "react-router";
import { useTranslation } from "react-i18next";
import Surface from "~/shared/components/ui/Surface";
import Button from "~/shared/components/ui/Button";
import FormField from "~/shared/components/ui/FormField";
import TimezoneSelect from '~/shared/components/ui/TimezoneSelect';
import { useFormActionState } from "~/hooks/useFormActionState";
import type { UserProfile } from "~/services/profileService";

type ProfileSettingsProps = {
    profile: UserProfile;
};

export default function ProfileSettingsForm({ profile }: ProfileSettingsProps) {
    const { fetcher, isSubmitting, clearError, fieldErrors }  = useFormActionState("profile-form");
    const { t } = useTranslation();

    return (
        <Surface className="p-2">
            <h2 className="text-xl font-bold mb-6 text-ink">{t("profile.profileSettingsTitle")}</h2>
            <fetcher.Form noValidate method="post" className="flex flex-col gap-2">
                <FormField 
                    type="text"
                    name="name"
                    label={t("profile.form.name")}
                    defaultValue={profile.name}
                    required
                    onClear={clearError}
                    errors={fieldErrors.name}
                />

                <TimezoneSelect defaultValue={profile.timeZone} />

                <Button 
                    type="submit"
                    name="action" 
                    value="update-settings" 
                    disabled={isSubmitting}
                    className="
                        w-fit bg-primary text-primary-ink disabled:bg-disabled px-8 py-4 
                        rounded-2xl shadow-md active:scale-95 transition-all
                        outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                    "
                >
                    {t("profile.form.saveAction")}
                </Button>
            </fetcher.Form>
        </Surface>
    )
}