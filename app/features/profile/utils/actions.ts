import { runAction, runService } from "~/utils/formLib";
import { UpdateSettingsSchema, NewPasswordSchema } from "~/schemas";
import { updateProfile, updatePassword, deleteAccount } from "~/services/profileService";

export async function updatePorfileSettingsAction(userId: string, formData: FormData) {
    return runAction({
        formData: formData,
        schema: UpdateSettingsSchema,
        serviceFn: (data) => updateProfile(userId, data),
        options: {
            defaultErrorId: "form.error.updateError",
            transform(raw) {
                return {
                    ...raw,
                    timeZone: raw["timezone"]
                }
            },
        },
    });
}

export async function changePasswordAction(formData: FormData) {
    return runAction({
        formData: formData,
        schema: NewPasswordSchema,
        serviceFn: (data) => updatePassword(data.password),
        options: {
            defaultErrorId: "profile.updateError",
        }
    });
}

export async function deleteAction() {
    return runService(
        async () => deleteAccount()
    )
}
