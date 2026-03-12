import { useFetcher } from "react-router";
import { useTranslation } from "react-i18next";
import Surface from "~/shared/components/ui/Surface";
import Button from "~/shared/components/ui/Button";
import type { ChangeEvent } from "react";

export default function PasswordChangeForm() {
    const fetcher = useFetcher({
        key: "profile-form",
    });
    const { t } = useTranslation();

    const handlePasswordCheck = (e: ChangeEvent<HTMLInputElement>) => {
        const form = e.currentTarget.form;

        if (!form) {
            return;
        }

        const password = form.elements.namedItem("new-password") as HTMLInputElement;
        const confirm = form.elements.namedItem("confirm-new-password") as HTMLInputElement;

        if (password.value !== confirm.value) {
            confirm.setCustomValidity(t("profile.errors.passwordNotMatch"));
        } else {
            confirm.setCustomValidity("");
        }
    };

    return (
        <Surface className="p-2">
            <h2 className="text-xl font-bold mb-6 text-ink">{t("profile.passwordChangeTitle")}</h2>
            <fetcher.Form method="post" className="flex flex-col gap-2">
                <label className="flex flex-col">
                    <span className="font-semibold mb-1 text-xs">{t("profile.form.newPassword")}</span>
                    <input
                        type="password"
                        name="new-password"
                        required
                        minLength={6}
                        maxLength={10}
                        onChange={handlePasswordCheck}
                        className="bg-ink/5 border-transparent rounded-md p-2"
                    />
                </label>
                <label className="flex flex-col">
                    <span className="font-semibold mb-1 text-xs">{t("profile.form.chagneNewPassword")}</span>
                    <input
                        type="password"
                        name="confirm-new-password"
                        required
                        onChange={handlePasswordCheck}
                        className="bg-ink/5 border-transparent rounded-md p-2"
                    />
                </label>

                <Button 
                    type="submit"
                    name="action"
                    value="change-password"
                    disabled={fetcher.state === "submitting"}
                    className="w-fit bg-primary text-primary-ink disabled:bg-disabled px-8 py-4 rounded-2xl shadow-md active:scale-95 transition-all"
                >
                    {t("profile.form.saveAction")}
                </Button>
            </fetcher.Form>
        </Surface>
    )
}