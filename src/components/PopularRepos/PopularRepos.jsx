import styles from "./PopularRepos.module.css";

function PopularRepos({ repos = [], loading = false, error = null }) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Popular repositories</h2>
        <a href="/" className={styles.link}>
          Customize your pins
        </a>
      </div>
      {loading && <p className={styles.loading}>Loading repositories…</p>}
      {error && !loading && (
        <p className={styles.error}>
          Could not load repositories. Showing cached data.
        </p>
      )}
      <div className={styles.grid}>
        {repos.map((repo) => (
          <article key={repo.name} className={styles.card}>
            <div className={styles.cardHeader}>
              <a href="/" className={styles.name}>
                {repo.name}
              </a>
              <span className={styles.visibility}>Public</span>
            </div>
            {repo.forked && (
              <p className={styles.forked}>Forked from {repo.forked}</p>
            )}
            <p className={styles.desc}>{repo.desc}</p>
            {repo.lang && (
              <p className={styles.lang}>
                <span
                  className={styles.langDot}
                  style={{ backgroundColor: repo.langColor }}
                />
                {repo.lang}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default PopularRepos;
