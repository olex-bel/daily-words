import z from 'zod';
import { resetPasswordForEmail, setNewPassword } from "~/services/profileService";

const ResetPasswordSchema = z.object({
    email: z.email({ message: "form.error.invalidEmail" }),
});

const SetPasswordSchema = z.object({
    newPassword: z.string().min(6, { message: "form.error.passwordMinLength" }).max(10, { message: "form.error.passwordMaxLength" }),
    confirmNewPassword: z.string().min(1, { message: "form.error.confirmRequired" }),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "form.error.passwordsDontMatch",
    path: ["confirmNewPassword"],
});

export async function resetPasswordFromEmail(formData: FormData) {
    const rawData = Object.fromEntries(formData);

    const result = ResetPasswordSchema.safeParse({
        ...rawData,
    });

    if (!result.success) {
        return { 
            success: false, 
            errors: z.flattenError(result.error).fieldErrors,
            errorId: "form.error.validationError" 
        };
    }
    const { email } = result.data;

    try {
        await resetPasswordForEmail(email);
    } catch (e) {
        return { success: false,  errorId: "resetpassword.resetError" }
    }

    return { success: true }
}

export async function setPassword(formData: FormData) {
    const rawData = Object.fromEntries(formData);
    
    const result = SetPasswordSchema.safeParse({
        ...rawData,
    });

    if (!result.success) {
        return { 
            success: false, 
            errors: z.flattenError(result.error).fieldErrors,
            errorId: "form.error.validationError" 
        };
    }

    const { newPassword } = result.data;
    try {
        await setNewPassword(newPassword);
    } catch (e) {
        return { success: false,  errorId: "setpassword.resetError" }
    }

    return { success: true }
}
