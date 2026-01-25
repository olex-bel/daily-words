import { useFetcher, Link } from 'react-router';
import { useTranslation } from 'react-i18next';

export default function SignInForm() {
    const { t } = useTranslation();
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === 'submitting';
    const errorMessage = fetcher.data?.message as string | undefined;

    return (
        <div className="bg-surface p-8 rounded-md shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4">{t('signin.title')}</h1>

            <fetcher.Form action="/signin" method="post" className="flex flex-col gap-4">

                <div className={`overflow-hidden transition-all duration-200 ease-out ${errorMessage ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    {errorMessage && (
                        <div role="alert" className="p-3 rounded bg-red-100 text-red-800">
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
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </label>

                <label className="flex flex-col">
                    <span className="font-semibold mb-1">{t('signin.passwordLabel')}</span>
                    <input
                        type="password"
                        name="password"
                        required
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </label>

                <button
                    type="submit"
                    className="bg-primary text-white py-2 rounded-md font-semibold hover:scale-105 transition-transform"
                    disabled={isSubmitting}
                >
                    {t('signin.submitButton')}
                </button>

                <p className="text-sm text-ink-light mt-2 text-center">
                    {t('signin.noAccount')}
                    <Link to="/signup" className="text-primary font-semibold hover:underline ml-1">
                        {t('signin.signupLink')}
                    </Link>
                </p>
            </fetcher.Form>
        </div>
    );
}
