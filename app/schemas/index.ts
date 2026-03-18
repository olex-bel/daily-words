import z from 'zod';

export const ResetPasswordSchema = z.object({
    email: z.email({ message: "form.error.invalidEmail" }),
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6, { message: "form.error.passwordMinLength" }).max(10, { message: "form.error.passwordMaxLength" }),
    confirmPassword: z.string().min(1, { message: "form.error.confirmRequired" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "form.error.passwordsDontMatch",
    path: ["confirmPassword"],
});

export const UpdateSettingsSchema = z.object({
    name: z.string().min(2, { message: "form.error.nameMinLength" }).max(10, { message: "form.error.nameMaxLength" }),
    timeZone: z.string().min(1, { message: "form.error.timeZoneRequired" }),
});

export const SignInSchema = z.object({
    email: z.email({ message: "form.error.invalidEmail" }),
    password: z.string().min(1, { message: "form.error.passwordEmpty" }),
});

export const SignUpSchema = z.object({
  name: z.string().min(2, { message: "form.error.nameMinLength" }).max(10, { message: "form.error.nameMaxLength" }),
  email: z.email({ message: "form.error.invalidEmail" }),
  password: z.string().min(6, { message: "form.error.passwordMinLength" }).max(10, { message: "form.error.passwordMaxLength" }),
  confirmPassword: z.string().min(1, { message: "form.error.confirmRequired" }),
  timeZone: z.string().min(1, { message: "form.error.timeZoneRequired" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "form.error.passwordsDontMatch",
  path: ["confirmPassword"],
});
