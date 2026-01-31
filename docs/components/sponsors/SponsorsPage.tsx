import React from 'react';
import { sponsors } from '../../data/sponsors';
import Footer from '../footer/Footer';
import styles from './SponsorsPage.module.css';

const SponsorsPage = () => {
  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <p className={styles.kicker}>赞助商</p>
        <h1 className={styles.title}>感谢以下合作伙伴的支持</h1>
        <p className={styles.subtitle}>携手共建可信赖的创新生态</p>
      </section>

      <section className={styles.grid}>
        {sponsors.map((sponsor) => (
          <article key={sponsor.name} className={styles.card}>
            <div className={styles.cover}>
              <span className={styles.coverTitle}>{sponsor.coverTitle}</span>
              <p className={styles.coverTagline}>{sponsor.tagline}</p>
            </div>
            <div className={styles.content}>
              <h2>{sponsor.name}</h2>
              <p>{sponsor.description}</p>
              <a
                className={styles.link}
                href={sponsor.link}
                target="_blank"
                rel="noreferrer"
              >
                访问 {new URL(sponsor.link).hostname} ↗
              </a>
            </div>
          </article>
        ))}
      </section>

      <Footer />
    </div>
  );
};

export default SponsorsPage;
