import { redirect } from "react-router";
import type { Route } from "./+types/signin";
import { useTranslation } from "react-i18next";
import i18n from "~/i18n";
import supabase from "~/services/supabase";
import SignInForm from "~/shared/components/SignInForm";

export async function clientLoader() {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (session && !error) {
        return redirect("/learning");
    }

    return null;
}

export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { success: false, message: i18n.t("signin.errorMessage") };
    }

    return redirect("/learning");
}

export default function SignIn() {
    const { t } = useTranslation();

    return (
        <div className="h-full flex justify-center items-center">
            <title>{t("signin.meta.title")}</title>
            <meta name="description" content={t("signin.meta.description")}/>
            <meta name="keywords" content={t("signin.meta.keywords")}/>
            
            <SignInForm />
        </div>
    )
}
