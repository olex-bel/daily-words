import { useTranslation } from "react-i18next";
import { RiCheckboxFill, RiTimeFill } from "react-icons/ri";
import LinkButton from "~/shared/components/LinkButton";

export default function NoWords() {
    const { t } = useTranslation();
    return (
        <div className="h-full flex items-center justify-center">
            <div className="flex flex-col text-center items-center justify-center gap-6 shadow-md rounded-md bg-surface p-6">
                <div className="mb-2 relative">
                    <div className="absolute inset-0 bg-green-100 rounded-full blur-2xl opacity-50" />
                    <RiCheckboxFill className="text-7xl text-green-500 relative animate-zoom-in duration-500" />
                </div>
                <h2 className="text-2xl font-extrabold">
                    {t('learning.noWords.title')}
                </h2>

                <p>
                    {t('learning.noWords.message')} <RiTimeFill className="inline-block align-[-0.125em] text-orange-600" />
                </p>

                <LinkButton to="/sets" className="px-6 py-3 bg-primary text-white">
                    {t('learning.noWords.backAction')}
                </LinkButton>
            </div>
        </div>
    );
}