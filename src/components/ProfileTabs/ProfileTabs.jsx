import { NavLink } from "react-router-dom";
import styles from "./ProfileTabs.module.css";

function ProfileTabs({ tabs }) {
  return (
    <nav className={styles.tabs}>
      <div className={styles.inner}>
        {tabs.map((tab) => (
          <NavLink
            key={tab.label}
            to={tab.path}
            end={tab.path === "/"}
            className={({ isActive }) =>
              `${styles.tab} ${isActive ? styles.tabActive : ""}`
            }
          >
            {tab.label}
            {tab.count != null && (
              <span className={styles.tabCount}>{tab.count}</span>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default ProfileTabs;
