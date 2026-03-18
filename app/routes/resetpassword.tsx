import { useTranslation } from "react-i18next";
import ViewCenter from "~/shared/components/layout/ViewCenter";
import ResetPasswordForm from "~/features/auth/components/ResetPasswordForm";
import { resetPasswordFromEmailAction } from "~/features/auth/utils/actions";
import type { Route } from "./+types/resetpassword";

export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData();

    return resetPasswordFromEmailAction(formData);
}

export default function RestPassword() {
    const { t } = useTranslation();

    return (
        <ViewCenter>
            <title>{t("resetpassword.meta.title")}</title>
            <meta name="description" content={t("resetpassword.meta.description")}/>
            <meta name="keywords" content={t("resetpassword.meta.keywords")}/>
            <ResetPasswordForm />
        </ViewCenter>
    );
}