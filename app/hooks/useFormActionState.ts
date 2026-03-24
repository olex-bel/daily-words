import { useState, useEffect, useCallback } from "react";
import { useFetcher } from "react-router";

interface ActionResponse {
  success?: boolean;
  errors?: Record<string, string[]>;
  errorId?: string;
  status?: string;
}

export function useFormActionState<T extends ActionResponse>(key?: string) {
    const fetcher = useFetcher<T>({
        key: key,
    });
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
    const [generalError, setGeneralError] = useState<string | null>(null);

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data) {
            const data = fetcher.data;
            if (data.errors) { setFieldErrors(data.errors); }
            if (data.errorId) { setGeneralError(data.errorId); }
        } else {
            setFieldErrors({});
        }
    }, [fetcher.data, fetcher.state]);

    const clearError = useCallback((name: string) => {
        setGeneralError(null);
        setFieldErrors((prev) => {
            if (!prev[name]) return prev;
            const newState = { ...prev };
            delete newState[name];
            return newState;
        });
    }, []);

    return {
        fetcher,
        fieldErrors,
        generalError,
        clearError,
        isSubmitting: fetcher.state === "submitting",
    }
}
