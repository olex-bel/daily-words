import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import Surface from "~/shared/components/ui/Surface";
import Button from "~/shared/components/ui/Button";
import { RiMailUnreadLine } from "react-icons/ri";

export default function ConfirmationPending() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const handleClick = () => navigate("/signin");

    return (
        <Surface className="w-full max-w-md p-8 text-center animate-in fade-in zoom-in duration-300">
            <div className="flex justify-center mb-4 text-primary">
                <RiMailUnreadLine />
            </div>
            <h2 className="text-2xl font-bold mb-2">{t('signup.success.title')}</h2>
            <p className="text-ink-muted mb-6">{t('signup.success.description')}</p>
            <Button onClick={handleClick}>
                {t('signup.success.backButton')}
            </Button>
        </Surface>
    );
}
