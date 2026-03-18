import { useTranslation } from "react-i18next";
import Surface from "~/shared/components/ui/Surface";
import LinkButton from "~/shared/components/ui/LinkButton";
import { RiMailUnreadLine } from "react-icons/ri";

export default function ConfirmationPending() {
    const { t } = useTranslation();

    return (
        <Surface className="w-full max-w-md p-8 text-center animate-in fade-in zoom-in duration-300">
            <div className="flex justify-center mb-4 text-primary">
                <RiMailUnreadLine />
            </div>
            <h2 className="text-2xl font-bold mb-2">{t('signup.success.title')}</h2>
            <p className="text-ink-muted mb-6">{t('signup.success.description')}</p>
            <LinkButton 
                to="/signin"
                className="
                    bg-primary text-primary-ink
                    outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                "
            >
                {t('signup.success.backButton')}
            </LinkButton>
        </Surface>
    );
}
