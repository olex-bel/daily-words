import { useTranslation } from "react-i18next";
import ViewCenter from "~/shared/components/layout/ViewCenter";

export default function RestPassword() {
    const { t } = useTranslation();

    return (
        <ViewCenter>
            <title>{t("resetpassword.meta.title")}</title>
            <meta name="description" content={t("resetpassword.meta.description")}/>
            <meta name="keywords" content={t("resetpassword.meta.keywords")}/>
            
        </ViewCenter>
    );
}