import { Link,redirect } from "react-router";
import { useTranslation } from "react-i18next";
import ViewCenter from "~/shared/components/layout/ViewCenter";
import SetPasswordForm from "~/features/auth/components/SetPasswordForm";
import { setPasswordAction } from "~/features/auth/utils/actions";
import type { Route } from "./+types/setpassword";

export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const result = await setPasswordAction(formData);

    if (result.success) {
        return redirect("/dashboard");
    }

    return result;
}

export default function SetPassword() {
    const { t } = useTranslation();
    return (
        <>
            <div className="p-2 md:p-4">
                <Link to="/dashboard" className="no-underline hover:underline">← {t('profile.backToDashboard')}</Link>       
            </div>
            <ViewCenter>
                <title>{t("setpassword.meta.title")}</title>
                <meta name="description" content={t("setpassword.meta.description")}/>
                <meta name="keywords" content={t("setpassword.meta.keywords")}/>
                <SetPasswordForm />
            </ViewCenter>
        </>
    );
}