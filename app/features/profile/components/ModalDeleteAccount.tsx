import { useTranslation } from "react-i18next";
import { useFormActionState } from "~/hooks/useFormActionState";
import Modal from "~/shared/components/ui/Modal";
import Button from "~/shared/components/ui/Button";

type ModalDeleteAccountProps = {
    ref: React.RefObject<HTMLDialogElement | null>;
}

export default function ModalDeleteAccount({ ref }: ModalDeleteAccountProps) {
    const { fetcher, isSubmitting } = useFormActionState("profile-form");
    const { t } = useTranslation();

    return (
        <Modal ref={ref}>
            <fetcher.Form method="post" className="flex flex-col gap-2">
                <div>
                    <h3 className="font-bold">{t("profile.deleteAccountTitle")}</h3>
                    <p className="text-sm text-error my-2">{t("profile.deleteAccountSubtitle")}</p>
                </div>

                <div className="grid grid-flow-row md:grid-flow-col auto-cols-fr gap-4">
                    <Button 
                        type="submit"
                        name="action"
                        value="delete-account"
                        disabled={isSubmitting}
                        className="
                            bg-surface hover:bg-surface-hover disabled:bg-disabled shadow-md shadow-line font-semibold
                            border-1 border-error text-error-dark transition-all active:scale-95 px-4 py-2
                            outline-none focus-visible:ring-2 focus-visible:ring-error focus-visible:ring-offset-2
                        "
                    >
                        {t("profile.form.deleteAction")}
                    </Button>

                    <Button
                        type="button"
                        className="
                            bg-primary text-primary-ink disabled:bg-disabled px-4 py-2
                            rounded-md shadow-md active:scale-95 transition-all
                            outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                        "
                        onClick={() => ref.current?.close()}
                        disabled={isSubmitting}
                    >
                        {t('profile.form.cancelAction')}
                    </Button>
                </div>
            </fetcher.Form>
        </Modal>
    );
}