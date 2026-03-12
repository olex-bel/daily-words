import { useFetcher, Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import Surface from '~/shared/components/ui/Surface';
import Button from "~/shared/components/ui/Button";

export default function SignInForm() {
    const { t } = useTranslation();
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === 'submitting';
    const errorMessage = fetcher.data?.message as string | undefined;

    return (
        <Surface className="w-full max-w-md p-6">
            <h1 className="text-2xl font-bold mb-4">{t('signin.title')}</h1>

            <fetcher.Form action="/signin" method="post" className="flex flex-col gap-4">

                <div className={`overflow-hidden transition-all duration-200 ease-out ${errorMessage ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    {errorMessage && (
                        <div role="alert" className="p-3 rounded bg-error text-error-ink">
                            {errorMessage}
                        </div>
                    )}
                </div>

                <label className="flex flex-col">
                    <span className="font-semibold mb-1">{t('signin.emailLabel')}</span>
                    <input
                        type="email"
                        name="email"
                        required
                        className="bg-ink/5 border-transparent rounded-md p-2"
                    />
                </label>

                <label className="flex flex-col">
                    <span className="font-semibold mb-1">{t('signin.passwordLabel')}</span>
                    <input
                        type="password"
                        name="password"
                        required
                        className="bg-ink/5 border-transparent rounded-md p-2"
                    />
                </label>

                <Button
                    type="submit"
                    className="bg-primary text-primary-ink disabled:bg-disabled px-8 py-4 rounded-2xl shadow-md active:scale-95 transition-all"
                    disabled={isSubmitting}
                >
                    {t('signin.submitButton')}
                </Button>

                <p className="text-sm text-ink-muted mt-2 text-center">
                    {t('signin.noAccount')}
                    <Link to="/signup" className="text-ink font-semibold hover:underline ml-1">
                        {t('signin.signupLink')}
                    </Link>
                </p>
            </fetcher.Form>
        </Surface>
    );
}
