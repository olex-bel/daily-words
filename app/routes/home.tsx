import { useTranslation } from "react-i18next";
import wordcloud from "~/asset/wordcloud.svg";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="h-screen">
      <title>{t("home.meta.title")}</title>
      <meta name="description" content={t("home.meta.description")}/>
      <meta name="keywords" content={t("home.meta.keywords")} />

      <div className="h-screen flex items-center gap-8 w-[clamp(200px,90%,800px)]">
        <img src={wordcloud} alt={t("home.imageAlt")} className="w-2xs" />
        <section>
          <h1 className="text-[clamp(1rem,2vw,1.875rem)] font-bold text-center">{t('home.headline')}</h1>
          <p className="mt-4 text-justify text-ink-light">{t('home.intro1')} {t('home.intro2')}</p>
        </section>
      </div>
    </div>
  );
}
