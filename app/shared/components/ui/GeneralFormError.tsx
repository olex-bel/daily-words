import { useTranslation } from 'react-i18next';
import { RiErrorWarningLine } from "react-icons/ri";

type GeneralFormErrorProps = {
    errorId?: string | null;
};

export default function GeneralFormError({ errorId }: GeneralFormErrorProps) {
    const { t } = useTranslation();
    return (
        <div className={`overflow-hidden transition-all duration-200 ease-out ${errorId ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
            {errorId && (
                <div role="alert" className="gap-2 text-sm p-3 rounded border-1 border-error text-error-dark flex items-start">
                    <RiErrorWarningLine className="shrink-0 text-lg" /> 
                    <span className="leading-tight">{t(errorId)}</span>
                </div>
            )}
        </div>
    )
}