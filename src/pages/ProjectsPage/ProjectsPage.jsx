import styles from "./ProjectsPage.module.css";

function ProjectsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.subtitle}>
          Projects let you organize and track work across repositories.
        </p>
        <div className={styles.empty}>
          <p className={styles.emptyText}>No projects yet.</p>
          <p className={styles.emptyHint}>
            Create a project to track issues and pull requests.
          </p>
        </div>
      </section>
    </div>
  );
}

export default ProjectsPage;
