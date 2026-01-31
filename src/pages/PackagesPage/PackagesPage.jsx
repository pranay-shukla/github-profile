import styles from "./PackagesPage.module.css";

function PackagesPage() {
  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <h1 className={styles.title}>Packages</h1>
        <p className={styles.subtitle}>
          Publish and manage packages for your profile or organization.
        </p>
        <div className={styles.empty}>
          <p className={styles.emptyText}>No packages yet.</p>
          <p className={styles.emptyHint}>
            Publish your first package to get started.
          </p>
        </div>
      </section>
    </div>
  );
}

export default PackagesPage;
