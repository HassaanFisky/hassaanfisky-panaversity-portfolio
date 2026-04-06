import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import { useLanguage } from "../context/LanguageContext";
import styles from "./index.module.css";

function HomepageHeader() {
  const { t } = useLanguage();
  return (
    <header className={styles.hero}>
      <div className={styles.heroBadge}>
        <div className={styles.pulseDot} />
        <span>{t?.home?.badge}</span>
      </div>
      <h1 className={styles.heroTitle}>
        {t?.home?.title_p1} <br />
        <span className={styles.heroItalic}>{t?.home?.title_p2}</span>
      </h1>
      <p className={styles.heroSubtitle}>
        {t?.home?.subtitle}
      </p>
      <div className={styles.heroButtons}>
        <Link
          className={styles.btnPrimary}
          to="/docs/module-01-foundations/what-is-physical-ai"
        >
          {t?.ui?.startReading}
        </Link>
        <a href="https://hassaanfisky-aira-digital-fte.vercel.app/" className={styles.btnSecondary} target="_blank" rel="noopener noreferrer">
          {t?.home?.btn_companion}
        </a>
      </div>
    </header>
  );
}

function HomepageFeatures() {
  const { t } = useLanguage();
  const features = t?.home?.features || [];

  return (
    <section id="features" className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <h2>{t?.home?.philosophy_title}</h2>
        <p>{t?.home?.philosophy_desc}</p>
      </div>
      <div className={styles.grid3}>
        {features.map((feature, idx) => (
          <div key={idx} className={styles.card}>
            <div className={styles.cardImageWrapper}>
              {/* Using same images as original, just dynamic text */}
              <img src={idx === 0 ? "/img/dexterity.png" : idx === 1 ? "/img/physical-ai-hero.png" : "/img/perception.png"} alt={feature.title} className={styles.cardImage} />
            </div>
            <h3>{feature.title}</h3>
            <p className={styles.cardDesc}>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ModulePreview() {
  const { t } = useLanguage();
  const m = t?.home?.modules || {};
  
  const modules = [
    { num: "01", title: m.m1?.title, link: "/docs/module-01-foundations/what-is-physical-ai", desc: m.m1?.desc },
    { num: "02", title: m.m2?.title, link: "/docs/module-02-hardware/kinematics-dynamics", desc: m.m2?.desc },
    { num: "03", title: m.m3?.title, link: "/docs/module-03-software/ros2-concepts", desc: m.m3?.desc },
    { num: "04", title: m.m4?.title, link: "https://hassaanfisky-aira-digital-fte.vercel.app/", desc: m.m4?.desc },
    { num: "05", title: m.m5?.title, link: "/docs/module-05-future/emerging-research", desc: m.m5?.desc },
  ];

  return (
    <section id="chapters" className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <h2>{t?.home?.curriculum_title}</h2>
        <p>{t?.home?.curriculum_desc}</p>
      </div>
      <div className={styles.grid3}>
        {modules.map((mod, idx) => (
          <div key={idx} className={clsx(styles.card, styles.chapterCard)}>
            <span className={styles.chapterBadge}>{t?.ui?.chapters} {mod.num}</span>
            <h3 className={styles.chapterTitle}>{mod.title}</h3>
            <p>{mod.desc}</p>
            <div className={styles.chapterFooter}>
              <Link to={mod.link} className={styles.chapterLink}>
                {t?.home?.learn_more} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title="HASSAAN AI ARCHITECT"
      description="The definitive curriculum for Physical AI and Humanoid Robotics"
    >
      <main className={styles.mainWrapper}>
        <HomepageHeader />
        <HomepageFeatures />
        <ModulePreview />
      </main>
    </Layout>
  );
}
