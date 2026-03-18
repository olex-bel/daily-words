import z from 'zod';
import { updateProfile, updatePassword } from '~/services/profileService';

const UpdateSettingsSchema = z.object({
    name: z.string().min(2, { message: "form.error.nameMinLength" }).max(10, { message: "form.error.nameMaxLength" }),
    timeZone: z.string().min(1, { message: "form.error.timeZoneRequired" }),
});

const ChangePasswordSchema = z.object({
  newPassword: z.string().min(6, { message: "form.error.passwordMinLength" }).max(10, { message: "form.error.passwordMaxLength" }),
  confirmNewPassword: z.string().min(1, { message: "form.error.confirmRequired" }),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "form.error.passwordsDontMatch",
  path: ["confirmNewPassword"],
});

export async function updatePorfileSettings(userId: string, formData: FormData) {
    const rawData = Object.fromEntries(formData);

    const result = UpdateSettingsSchema.safeParse({
        ...rawData,
        timeZone: rawData["timezone"],
    });

    if (!result.success) {
        return { 
            success: false, 
            errors: z.flattenError(result.error).fieldErrors,
            errorId: "form.error.validationError" 
        };
    }
    const { name, timeZone } = result.data;

    try {
        await updateProfile(userId, {
            name,
            timeZone,
        });
    } catch (e) {
        return { success: false,  errorId: "form.error.updateError" }
    }

    return { success: true, messageId: 'form.updateSuccess' }
}

export async function changePassword(formData: FormData) {
    const rawData = Object.fromEntries(formData);

    const result = ChangePasswordSchema.safeParse({
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
        await updatePassword(newPassword);
    } catch (e) {
        return { success: false, errorId: 'profile.updateError' };
    }

    return { success: true };
}