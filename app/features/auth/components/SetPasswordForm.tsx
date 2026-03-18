import { useTranslation } from "react-i18next";
import { useFormActionState } from "~/hooks/useFormActionState";
import Surface from "~/shared/components/ui/Surface";
import FormField from "~/shared/components/ui/FormField";
import Button from "~/shared/components/ui/Button";
import { RiShieldKeyholeLine } from "react-icons/ri";

export default function SetPasswordForm() {
    const { t } = useTranslation();
    const { fetcher, isSubmitting, clearError, fieldErrors }  = useFormActionState();

    return (
        <Surface className="px-6 py-8 max-w-xs md:max-w-md">
            <div className="mx-auto w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <RiShieldKeyholeLine size={32} />
            </div>
            <div className="flex flex-col gap-2 mb-4">
                <h1 className="text-2xl font-bold text-ink text-center">
                    {t('setpassword.title')}
                </h1>
            </div>
            <fetcher.Form noValidate method="post" className="flex flex-col gap-4">
                <FormField 
                    name="password"
                    label={t("form.label.password")}
                    type="password"
                    required
                    minLength={6}
                    maxLength={10}
                    onClear={clearError}
                    errors={fieldErrors.password}
                />
                <FormField 
                    name="confirmPassword"
                    label={t("form.label.confirmPassword")}
                    type="password"
                    required
                    onClear={clearError}
                    errors={fieldErrors.confirmPassword}
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
                    {t('setpassword.submitButton')}
                </Button>
            </fetcher.Form>
        </Surface>
    );
}