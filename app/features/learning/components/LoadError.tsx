
import { useTranslation } from "react-i18next";
import Button from "~/shared/components/Button";

export default function LoadError() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center h-full text-center gap-6">
            <p className="text-lg">{t('learning.loadError.message')}</p>

            <Button
                onClick={() => window.location.reload()}
                className="bg-primary text-white px-6 py-3"
            >
                {t('learning.loadError.retryButton')}
            </Button>
        </div>
    );
}