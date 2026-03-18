import { z } from 'zod';

interface ActionResponse<T, E = any> {
    success?: boolean;
    errors?: Record<string, string[] | undefined>;
    errorId?: string;
    status?: string;
    data?: T;
    error?: E;
}

type RunActionProps<T, R, E> = {
    formData: FormData,
    schema: z.Schema<T>,
    serviceFn: (validatedData: T) => Promise<{ data?: R; error?: E }>,
    options?: {
        transform?: (raw: Record<string, any>) => Record<string, any>,
        defaultErrorId?: string;
        validationErrorId?:string;
    }
}

export async function runAction<T, R, E>({
    formData,
    schema,
    options,
    serviceFn
}: RunActionProps<T, R, E>): Promise<ActionResponse<R, E>> {
    const rawData = Object.fromEntries(formData);
    const dataToValidate = options?.transform ? options.transform(rawData) : rawData;
    const result = schema.safeParse(dataToValidate);

    if (!result.success) {
        return {
            success: false,
            errors: z.flattenError(result.error).fieldErrors,
            errorId: options?.validationErrorId || 'form.error.validation',
        };
    }

    try {
        const { error, data } = await serviceFn(result.data);

        if (error) {
            return { success: false, errorId: options?.defaultErrorId || "form.error.generic", error: error };    
        }

        return { success: true, data };
    } catch (e) {
        return { success: false, errorId: options?.defaultErrorId || "form.error.generic" };
    }
}
