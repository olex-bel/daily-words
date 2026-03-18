import { useTranslation } from "react-i18next";
import Surface from "~/shared/components/ui/Surface";
import LinkButton from "~/shared/components/ui/LinkButton";
import { RiMailUnreadLine } from "react-icons/ri";

export default function ConfirmationResetPassword() {
    const { t } = useTranslation();

    return (
        <Surface className="px-6 py-8 max-w-xs md:max-w-md flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                <RiMailUnreadLine size={32} />
            </div>
            <h2 className="text-2xl font-bold text-center">{t('resetpassword.success.title')}</h2>
            <p className="text-lg text-ink-muted leading-relaxed mb-2 max-w-xs">
                {t('resetpassword.success.description')}
            </p>
            <LinkButton 
                to="/signin"
                className="
                        bg-primary text-primary-ink disabled:bg-disabled px-8 py-4 
                        rounded-md shadow-md active:scale-95 transition-all
                        outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                    "
            >
                {t('resetpassword.backToLogin')}
            </LinkButton>
        </Surface>    
    );
}