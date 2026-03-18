import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useFormActionState } from "~/hooks/useFormActionState";
import Surface from "~/shared/components/ui/Surface";
import FormField from "~/shared/components/ui/FormField";
import Button from "~/shared/components/ui/Button";
import ConfirmationResetPassword from "./ConfirmationResetPassword";
import GeneralFormError from "~/shared/components/ui/GeneralFormError";
import { RiLockPasswordLine } from "react-icons/ri";

export default function ResetPasswordForm() {
    const { t } = useTranslation();
    const { fetcher, isSubmitting, clearError, fieldErrors }  = useFormActionState();

    if (fetcher.data?.success) {
        return <ConfirmationResetPassword />;
    }

    return  (
        <Surface className="px-6 py-8 max-w-xs md:max-w-md">
            <div className="mx-auto w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <RiLockPasswordLine size={32} />
            </div>
            <div className="flex flex-col gap-2 mb-4">
                <h1 className="text-2xl font-bold text-ink text-center">
                    {t('resetpassword.title')}
                </h1>
                <p className="text-sm text-ink-muted leading-relaxed">
                    {t('resetpassword.description')}
                </p>
            </div>
            <fetcher.Form noValidate method="post" className="flex flex-col gap-2">
                <GeneralFormError errorId={fetcher.data?.errorId} />
                <FormField 
                    name="email"
                    type="email"
                    label={t("resetpassword.emailLabel")}
                    required
                    onClear={clearError}
                    errors={fieldErrors.email}
                />

                <Button
                    type="submit"
                    className="
                        bg-primary text-primary-ink disabled:bg-disabled px-8 py-4 
                        rounded-md shadow-md active:scale-95 transition-all
                        outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                    "
                    disabled={isSubmitting}
                >
                    {t('resetpassword.submitButton')}
                </Button>

                <p className="text-sm text-ink-muted mt-2 text-center">
                    <Link to="/signin" className="text-ink font-semibold hover:underline ml-1 outline-none focus-visible:ring-2 focus-visible:ring-primary">
                        {t("resetpassword.backToLogin")}
                    </Link>
                </p>
            </fetcher.Form>
        </Surface>
    );
}