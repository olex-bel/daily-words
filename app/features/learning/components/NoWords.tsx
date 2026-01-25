import { useTranslation } from "react-i18next";
import LinkButton from "~/shared/components/LinkButton";

export default function NoWords() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center justify-center h-full text-center gap-6">
            <h2 className="text-2xl semibold">
                {t('learning.noWords.title')}
            </h2>

            <p>
                {t('learning.noWords.message')}
            </p>

            <LinkButton to="/sets" className="px-6 py-3 rounded-lg bg-blue-500 text-white">
                {t('learning.noWords.backAction')}
            </LinkButton>
        </div>
    );
}