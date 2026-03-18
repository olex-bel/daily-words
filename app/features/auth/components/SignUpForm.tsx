import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useFormActionState } from '~/hooks/useFormActionState';
import Surface from '~/shared/components/ui/Surface';
import Button from "~/shared/components/ui/Button";
import FormField from '~/shared/components/ui/FormField';
import TimezoneSelect from '~/shared/components/ui/TimezoneSelect';
import ConfirmationPending from './ConfirmationPending';
import GeneralFormError from '~/shared/components/ui/GeneralFormError';

export default function SignUpForm() {
    const { t } = useTranslation();
    const { fetcher, isSubmitting, clearError, fieldErrors, generalError }  = useFormActionState();

    if (fetcher.data?.status === "pending_confirmation") {
        return <ConfirmationPending />;
    }

    return (
        <Surface className="w-full max-w-md p-6">
            <h1 className="text-2xl font-bold mb-4">{t('signup.title')}</h1>

            <fetcher.Form noValidate action="/signup" method="post" className="flex flex-col gap-4">
                <GeneralFormError errorId={generalError} />

                <FormField 
                    name="name"
                    label={t("form.label.name")}
                    type="text"
                    required
                    minLength={2}
                    onClear={clearError}
                    errors={fieldErrors.name}
                />
                <FormField 
                    name="email"
                    label={t("form.label.email")}
                    type="email"
                    required
                    onClear={clearError}
                    errors={fieldErrors.email}
                />
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

                <TimezoneSelect />
                
                <Button
                    type="submit"
                    className="
                        bg-primary text-primary-ink disabled:bg-disabled px-8 py-4 
                        rounded-md shadow-md active:scale-95 transition-all
                        outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                    "
                    disabled={isSubmitting}
                >
                    {t('signup.submitButton')}
                </Button>

                <p className="text-sm text-ink-muted mt-2 text-center">
                    {t('signup.account')}
                    <Link to="/signin" className="text-ink font-semibold hover:underline ml-1 outline-none focus-visible:ring-2 focus-visible:ring-primary">
                        {t('signup.signinLink')}
                    </Link>
                </p>

            </fetcher.Form>
        </Surface>
    );
}