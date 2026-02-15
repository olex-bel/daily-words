
import { useTranslation } from "react-i18next";
import { RiHand } from "react-icons/ri";
import { useAuthContext } from "~/hooks/useAuthContext";

export default function DashboardHero() {
    const { t } = useTranslation();
    const { profile } = useAuthContext();

    return (
        <header className="text-center md:text-left">
            <div className="flex items-center gap-1">
                <h1 className="text-3xl font-bold text-ink tracking-tight">
                    {
                        profile?.name
                            ? t('dashboard.welcomeMessage', { name: profile.name })
                            : t('dashboard.welcomeMessageWithoutNmae')
                    }
                </h1>
                <RiHand className="text-2xl text-error animate-wave" />
            </div>
            <p className="text-ink-muted mt-1">
                {t('dashboard.heading')}
            </p>
        </header>
    );
}