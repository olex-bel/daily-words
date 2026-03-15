import { useTranslation } from "react-i18next";
import { useActionForm } from "~/hooks/useActionForm";
import Surface from "~/shared/components/ui/Surface";
import Button from "~/shared/components/ui/Button";
import FormField from "~/shared/components/ui/FormField";

export default function PasswordChangeForm() {
    const fetcher = useActionForm("profile-form");
    const { t } = useTranslation();

    return (
        <Surface className="p-2">
            <h2 className="text-xl font-bold mb-6 text-ink">{t("profile.passwordChangeTitle")}</h2>
            <fetcher.Form noValidate method="post" className="flex flex-col gap-2">
                <FormField
                    type="password"
                    name="newPassword"
                    label={t("profile.form.newPassword")}
                    required
                    minLength={6}
                    maxLength={10}
                    onClear={fetcher.clearError}
                    errors={fetcher.fieldErrors.newPassword}
                />
                
                <FormField
                    type="password"
                    name="confirmNewPassword"
                    label={t("profile.form.chagneNewPassword")}
                    required
                    onClear={fetcher.clearError}
                    errors={fetcher.fieldErrors.confirmNewPassword}
                />

                <Button 
                    type="submit"
                    name="action"
                    value="change-password"
                    disabled={fetcher.state === "submitting"}
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