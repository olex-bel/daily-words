import { useRef } from "react";
import { useTranslation } from "react-i18next";
import Surface from "~/shared/components/ui/Surface";
import Button from "~/shared/components/ui/Button";
import ModalDeleteAccount from "./ModalDeleteAccount";

export default function DeleteAccountSection() {
    const deleteDialogRef = useRef<HTMLDialogElement>(null);
    const { t } = useTranslation();

    return (
        <Surface className="p-2 mt-6">
            <h2 className="text-xl font-bold mb-6 text-ink">{t("profile.dangerTitle")}</h2>
            <Button 
                className="
                    w-full bg-surface hover:bg-surface-hover disabled:bg-disabled shadow-md shadow-line 
                    border-1 border-line text-ink transition-all active:scale-95 px-8 py-4 
                    hover:text-error font-semibold
                    outline-none focus-visible:ring-2 focus-visible:ring-error focus-visible:ring-offset-2
                "
                onClick={() => deleteDialogRef.current?.showModal()}
            >
                {t("profile.form.deleteAction")}
            </Button>
            <ModalDeleteAccount ref={deleteDialogRef} />
        </Surface>
    )
}