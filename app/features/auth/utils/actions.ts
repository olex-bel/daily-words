import { runAction } from "~/utils/formLib";
import { resetPasswordForEmail, setNewPassword } from "~/services/profileService";
import { signIn, singUp } from "~/services/authService";
import { NewPasswordSchema, ResetPasswordSchema, SignInSchema, SignUpSchema } from "~/schemas";

export async function resetPasswordFromEmailAction(formData: FormData) {
    return runAction({
        formData, 
        schema: ResetPasswordSchema,
        serviceFn: (data) => resetPasswordForEmail(data.email),
        options: {
            "defaultErrorId": "resetpassword.resetError",
        }
    });
};

export async function setPasswordAction(formData: FormData) {
    return runAction({
        formData, 
        schema: NewPasswordSchema,
        serviceFn: (data) => setNewPassword(data.password),
        options: {
            "defaultErrorId": "setpassword.resetError",
        }
    });
}

export async function signInAction(formData: FormData) {
    return runAction({
        formData,
        schema: SignInSchema,
        serviceFn: (data) => signIn(data.email, data.password), 
    });
}

export async function singUpAction(formData: FormData) {
    return runAction({
        formData,
        schema: SignUpSchema,
        serviceFn: (data) => singUp(data), 
        options: {
            transform(raw) {
                return {
                    ...raw,
                    timeZone: raw["timezone"]
                }
            },
        },
    });
}