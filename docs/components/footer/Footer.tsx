import React from 'react';
import { footerData } from '../../data/footer';
import styles from './Footer.module.css';

const Footer = () => {
  const { brand, description, columns, social, legal } = footerData;

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <h2>{brand}</h2>
          <p>{description}</p>
          <div className={styles.social}>
            {social.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <div className={styles.columns}>
          {columns.map((column) => (
            <div key={column.title}>
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noreferrer' : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.legalRow}>
          <span>{legal.licenseLabel}</span>
          <a href={legal.licenseLink} target="_blank" rel="noreferrer">
            查看协议
          </a>
          <span>
            {legal.statusLabel}：<strong>{legal.statusValue}</strong>
          </span>
        </div>
        <div className={styles.legalRow}>
          <span>{legal.copyright}</span>
          <a href={legal.companyLink} target="_blank" rel="noreferrer">
            {legal.company}
          </a>
          <a href={legal.icpLink} target="_blank" rel="noreferrer">
            {legal.icpLabel}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
