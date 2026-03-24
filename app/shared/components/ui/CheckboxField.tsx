import { useTranslation } from "react-i18next";
import type { ReactNode, InputHTMLAttributes } from "react";

type CheckboxFieldProps = {
    label: ReactNode;
    name: string;
    errors?: string[];
    onClear: (name: string) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export default function CheckboxField({
    label, 
    name, 
    errors, 
    onClear, 
    className = "", 
    ...args
}: CheckboxFieldProps) {
    const { t } = useTranslation();
    const hasErrors = errors && errors.length > 0;

    return (
        <div className="flex flex-col">
            <label className="flex items-start gap-3 cursor-pointer group">
                <input
                    type="checkbox"
                    name={name}
                    {...args}
                    className={`
                        mt-1 h-4 w-4 shrink-0 rounded border-gray-300 
                        text-primary focus:ring-primary cursor-pointer
                        ${className}
                    `}
                    onChange={(e) => {
                        onClear(name);
                        if (args.onChange) args.onChange(e);
                    }}
                />
                
                <span className="text-xs leading-tight text-gray-600 select-none">
                    {label}
                </span>
            </label>

            {hasErrors && (
                <span className="text-error text-xs mt-1 ml-7">
                    {t(errors[0])}
                </span>
            )}
        </div>
    );
}