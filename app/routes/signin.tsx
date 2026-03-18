import { redirect } from "react-router";
import { useTranslation } from "react-i18next";
import ViewCenter from "~/shared/components/layout/ViewCenter";
import SignInForm from "~/features/auth/components/SignInForm";
import { signInAction } from "~/features/auth/utils/actions";
import type { Route } from "./+types/signin";

export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const result = await signInAction(formData);

    if (result.success) {
        return redirect("/dashboard");
    }

    return result;
}

export default function SignIn() {
    const { t } = useTranslation();

    return (
        <ViewCenter>
            <title>{t("signin.meta.title")}</title>
            <meta name="description" content={t("signin.meta.description")}/>
            <meta name="keywords" content={t("signin.meta.keywords")}/>
            
            <SignInForm />
        </ViewCenter>
    )
}
