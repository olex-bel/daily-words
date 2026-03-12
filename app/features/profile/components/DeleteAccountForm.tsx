import { useFetcher } from "react-router";
import { useTranslation } from "react-i18next";
import Surface from "~/shared/components/ui/Surface";
import Button from "~/shared/components/ui/Button";

export default function DeleteAccountForm() {
    const fetcher = useFetcher({
        key: "profile-form",
    });
    const { t } = useTranslation();

    return (
        <Surface className="p-2">
            <fetcher.Form method="post" className="flex flex-col gap-2">
                <div>
                    <h3 className="font-bold">{t("profile.deleteAccountTitle")}</h3>
                    <p className="text-sm text-error">{t("profile.deleteAccountSubtitle")}</p>
                </div>
                <Button 
                    type="submit"
                    name="action"
                    value="delete-account"
                    disabled={fetcher.state === "submitting"}
                    className="w-fit bg-surface hover:bg-surface-hover disabled:bg-disabled shadow-md shadow-line border-1 border-error text-error-dark transition-all active:scale-95 px-4 py-2"
                >
                    {t("profile.form.deleteAction")}
                </Button>
            </fetcher.Form>
        </Surface>
    )
}