
import { useTranslation } from 'react-i18next';

const timezones = Intl.supportedValuesOf('timeZone');

type TimezoneSelectProps = {
    defaultValue?: string;
};

export default function TimezoneSelect({ defaultValue }: TimezoneSelectProps) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label
                htmlFor="timezone"
                className="text-xs font-bold text-ink tracking-wider ml-1"
            >
                {t('profile.timezoneLabel')}
            </label>

            <div className="relative group">
                <select
                    id="timezone"
                    name="timezone"
                    defaultValue={defaultValue || Intl.DateTimeFormat().resolvedOptions().timeZone}
                    className="
                        w-full appearance-none px-4 py-1
                        bg-ink/5 border-transparent rounded-md
                        transition-all cursor-pointer
                    "
                >
                    {timezones.map((tz) => (
                        <option key={tz} value={tz} className="bg-white dark:bg-zinc-900">
                            {tz.replace('_', ' ')}
                        </option>
                    ))}
                </select>

                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m3 4.5 3 3 3-3" />
                    </svg>
                </div>
            </div>

            <p className="text-[11px] text-ink-muted ml-1">
                {t('profile.timezoneHint')}
            </p>
        </div>
    );
}