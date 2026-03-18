import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";

type FormFieldProps = {
    label: string;
    name: string;
    className?: string;
    errors?: string[];
    children?: ReactNode;
    onClear: (name: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function FormField({ label, name, errors, children, className  = "", onClear, ...args }: FormFieldProps) {
    const { t } = useTranslation();
    const hasErrors = errors && errors.length > 0;

    return (
        <label className="flex flex-col">
            <span className="font-semibold mb-1">{label}</span>
            <input
                name={name}
                {...args}
                className={
                    `
                    bg-ink/5 rounded-md p-2
                    outline-none border-1
                    ${hasErrors? "border-error" : "border-transparent focus:border-primary" }
                    ${className}
                    `
                }
                onChange={(e) => onClear(name)}
            />
            {children}
            {hasErrors && (
                <span className="text-error text-xs mt-1">
                    {t(errors[0])}
                </span>
            )}
        </label>
    );
}
