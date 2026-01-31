import { pinnedRepos } from "../../data/profileData";
import PopularRepos from "../../components/PopularRepos/PopularRepos";
import styles from "./RepositoriesPage.module.css";

function RepositoriesPage() {
  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <h1 className={styles.title}>Repositories</h1>
        <p className={styles.subtitle}>
          All repositories for this profile. Pinned repositories appear first.
        </p>
        <PopularRepos repos={pinnedRepos} />
      </section>
    </div>
  );
}

export default RepositoriesPage;
