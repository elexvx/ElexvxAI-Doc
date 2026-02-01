import React from 'react';
import { blogPosts } from '../../../theme/data/blogPosts';
import Footer from '../footer/Footer';
import styles from './BlogPage.module.css';

const BlogPage = () => {
  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <p className={styles.kicker}>博客</p>
        <h1 className={styles.title}>最新文章</h1>
        <p className={styles.subtitle}>聚焦产品迭代、设计洞察与团队实践。</p>
      </section>

      <section className={styles.grid}>
        {blogPosts.map((post) => (
          <a key={post.link} className={styles.card} href={post.link}>
            <div className={styles.cover}>
              <div className={styles.coverGlow} />
              <div className={styles.coverText}>
                <span>{post.coverTitle}</span>
                <strong>{post.coverSubtitle}</strong>
              </div>
            </div>
            <div className={styles.content}>
              <h2>{post.title}</h2>
              <p>{post.summary}</p>
              <div className={styles.meta}>
                <span>作者：{post.author}</span>
                <span>{post.date}</span>
              </div>
            </div>
          </a>
        ))}
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
