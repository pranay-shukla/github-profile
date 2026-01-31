import { USERNAME } from "../../constants";
import styles from "./Header.module.css";

function Header({ profile }) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.iconBtn} aria-label="Menu">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 100 1.5h12.5a.75.75 0 100-1.5H1.75z" />
          </svg>
        </button>
        <a href="/" className={styles.logo}>
          <svg
            height="32"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.07 1.32-.46 1.07-1.2 1.32-2.2.56-1.33-.78-2.33-2.33-2.33-3.73 0-.88.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27z" />
          </svg>
        </a>
        <span className={styles.username}>{profile.username || USERNAME}</span>
      </div>
      <div className={styles.center}>
        <div className={styles.searchWrap}>
          <svg
            className={styles.searchIcon}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M10.68 11.74a6 6 0 01-7.922-8.982 6 6 0 018.982 7.922l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z" />
          </svg>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Type / to search"
          />
          <span className={styles.searchShortcut}>/</span>
        </div>
      </div>
      <div className={styles.right}>
        <img src={profile.avatar} alt="" className={styles.avatar} />
      </div>
    </header>
  );
}

export default Header;
