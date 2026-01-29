
import { useTranslation } from "react-i18next";
import { RiRefreshLine, RiErrorWarningLine } from "react-icons/ri";
import Button from "~/shared/components/Button";

export default function LoadError() {
    const { t } = useTranslation();

    return (
        <div className="h-full flex items-center justify-center">
            <div className="flex flex-col text-center items-center justify-center gap-6 shadow-md rounded-md bg-surface p-6">
                <div className="flex flex-col items-center justify-center h-full text-center gap-6">
                    <div className="mb-4 p-4 bg-orange-50 rounded-full">
                        <RiErrorWarningLine className="text-5xl text-orange-500" />
                    </div>

                    <p className="text-lg">{t('learning.loadError.message')}</p>

                    <Button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-white text-primary hover:brightness-90"
                        icon={<RiRefreshLine />}
                    >
                        {t('learning.loadError.retryButton')}
                    </Button>
                </div>
            </div>
        </div>
        
    );
}