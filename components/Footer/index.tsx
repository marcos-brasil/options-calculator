import styles from './index.module.css'

export default function Footer() {
  return (
    <div className={styles.container}>
      <footer className={styles.footer}>
        <div className={styles.content}>
          The information on this site is for educational purposes only. This
          website is not giving advice nor is qualified or licensed to provide
          financial advice. You must seek guidance from your personal advisors
          before acting on this information. Trading can result in losses. We
          will accept no responsibility for any losses you may incur. Do not
          invest more than you can afford to lose. Please see other Disclaimers
          and Warnings elsewhere on this site.
        </div>
      </footer>
    </div>
  );
}
