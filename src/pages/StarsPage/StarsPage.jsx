import styles from "./StarsPage.module.css";

function StarsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <h1 className={styles.title}>Stars</h1>
        <p className={styles.subtitle}>
          Repositories you have starred. Discover and save interesting projects.
        </p>
        <div className={styles.empty}>
          <p className={styles.emptyText}>No starred repositories yet.</p>
          <p className={styles.emptyHint}>
            Star repositories to save them for later and show your interests.
          </p>
        </div>
      </section>
    </div>
  );
}

export default StarsPage;
