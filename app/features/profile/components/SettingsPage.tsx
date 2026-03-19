import { useState, useEffect } from "react";
import { useFetcher, Link } from "react-router";
import { useTranslation } from "react-i18next";
import ProfileSettingsForm from "~/features/profile/components/ProfileSettingsForm";
import PasswordChangeForm from "~/features/profile/components/PasswordChangeForm";
import Toast from "~/shared/components/ui/Toast";
import type { UserProfile } from "~/services/profileService";

type SettingsPageProps = {
    profile: UserProfile;
};

export default function SettingsPage({ profile }: SettingsPageProps) {
    const { t } = useTranslation();
    const [showToast, setShowToast] = useState(false);
    const fetcher = useFetcher({
        key: "profile-form",
    });

    useEffect(() => {
        if (fetcher.data) {
            setShowToast(true);
        }
    }, [fetcher.data]);

    return (
        <div>
            <div className="p-2 md:p-4">
                <Link to="/dashboard" className="no-underline hover:underline">← {t('profile.backToDashboard')}</Link>       
            </div>
            <div className="space-y-8 pt-6 max-w-2xl mx-auto flex flex-col gap-4">
                <ProfileSettingsForm profile={profile} />
                <PasswordChangeForm />
            </div>
                    
            {showToast && fetcher.data && (
                <Toast 
                    key={JSON.stringify(fetcher.data)}
                    onClose={() => setShowToast(false)}
                    type={fetcher.data.success? "success" : "error"}
                >
                    {fetcher.data.success 
                        ? t('profile.updateSuccess') 
                        : t(fetcher.data.errorId || 'profile.updateError')
                    }
                </Toast>
            )}
        </div>
    )
}