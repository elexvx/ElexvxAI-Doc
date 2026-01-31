import React from 'react';
import { changelog } from '../../../theme/data/changelog';
import Footer from '../footer/Footer';
import styles from './ChangelogPage.module.css';

const ChangelogPage = () => {
  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <p className={styles.kicker}>更新日志</p>
        <h1 className={styles.title}>记录每一次值得关注的改变</h1>
        <p className={styles.subtitle}>持续打磨体验，让进展清晰可见。</p>
      </section>

      <section className={styles.timeline}>
        {changelog.map((entry) => (
          <article key={entry.version} className={styles.entry}>
            <div className={styles.entryMeta}>
              <span className={styles.entryDate}>{entry.date}</span>
              <span className={styles.entryType}>{entry.type}</span>
            </div>
            <h2>{entry.version}</h2>
            <p className={styles.summary}>{entry.summary}</p>
            <ul>
              {entry.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <Footer />
    </div>
  );
};

export default ChangelogPage;
