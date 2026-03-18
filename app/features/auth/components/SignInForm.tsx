import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import Surface from '~/shared/components/ui/Surface';
import Button from "~/shared/components/ui/Button";
import { useFormActionState } from '~/hooks/useFormActionState';
import FormField from '~/shared/components/ui/FormField';
import GeneralFormError from '~/shared/components/ui/GeneralFormError';

export default function SignInForm() {
    const { t } = useTranslation();
    const { fetcher, isSubmitting, clearError, fieldErrors, generalError }  = useFormActionState();

    return (
        <Surface className="w-full max-w-md p-6">
            <h1 className="text-2xl font-bold mb-4">{t('signin.title')}</h1>

            <fetcher.Form noValidate action="/signin" method="post" className="flex flex-col gap-4">
                <GeneralFormError errorId={generalError} />
                
                <FormField 
                    label={t('form.label.email')}
                    type="email"
                    name="email"
                    required
                    onClear={clearError}
                    errors={fieldErrors.email}
                />
                
                <FormField 
                    label={t('form.label.password')}
                    type="password"
                    name="password"
                    required
                    onClear={clearError}
                    errors={fieldErrors.password}
                >
                    <Link to="/reset-password" className="text-primary text-xs hover:underline ml-1 outline-none focus-visible:ring-2 focus-visible:ring-primary">
                        {t('signin.forgotPassword')}
                    </Link>
                </FormField>

                <Button
                    type="submit"
                    className="
                        bg-primary text-primary-ink disabled:bg-disabled px-8 py-4 
                        rounded-md shadow-md active:scale-95 transition-all
                        outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                    "
                    disabled={isSubmitting}
                >
                    {t('signin.submitButton')}
                </Button>
                
                <p className="text-sm text-ink-muted mt-2 text-center">
                    {t('signin.noAccount')}
                    <Link to="/signup" className="text-ink font-semibold hover:underline ml-1 outline-none focus-visible:ring-2 focus-visible:ring-primary">
                        {t('signin.signupLink')}
                    </Link>
                </p>
            </fetcher.Form>
        </Surface>
    );
}
