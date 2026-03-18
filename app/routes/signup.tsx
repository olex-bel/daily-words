import { z } from "zod";
import { redirect } from "react-router";
import { useTranslation } from "react-i18next";
import ViewCenter from "~/shared/components/layout/ViewCenter";
import SignUpForm from "~/features/auth/components/SignUpForm";
import { singUpAction } from "~/features/auth/utils/actions";
import type { Route } from "./+types/signup";

export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const result =  await singUpAction(formData)
    const { success, error, data } = result;

    if (success) {
        if (data?.user && data.session === null) {
            return { success: true, status: "pending_confirmation" };
        }

        return redirect("/dashboard");
    }

    if (error?.message.toLowerCase().includes("already registered")) {
        return { 
            success: false, 
            errors: { email: ["signup.error.emailTaken"] } 
        };
    }

    return result;
}

export default function SignUp() {
    const { t } = useTranslation();

    return (
        <ViewCenter>
            <title>{t("signup.meta.title")}</title>
            <meta name="description" content={t("signup.meta.description")} />
            <meta name="keywords" content={t("signup.meta.keywords")} />

            <SignUpForm />
        </ViewCenter>
    )
}
