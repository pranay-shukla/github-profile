import styles from "./ProfileSidebar.module.css";

function ProfileSidebar({ profile }) {
  const { links } = profile;

  return (
    <aside className={styles.sidebar}>
      <img src={profile.avatar} alt="" className={styles.avatar} />
      <h1 className={styles.name}>{profile.name}</h1>
      <p className={styles.username}>{profile.username}</p>
      <p className={styles.bio}>{profile.bio}</p>
      <p className={styles.skills}>{profile.skills}</p>
      <button className={styles.editBtn} type="button">
        Edit profile
      </button>
      <p className={styles.stats}>
        <a href="/">{profile.followers} followers</a>
        <span className={styles.statsSep}> · </span>
        <a href="/">{profile.following} following</a>
      </p>
      <ul className={styles.links}>
        <li>
          <svg
            className={styles.linkIcon}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M1.75 2.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25H1.75zM0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0114.25 15H1.75A1.75 1.75 0 010 13.25V2.75z" />
            <path d="M4 4.75A.75.75 0 014.75 4h6.5a.75.75 0 010 1.5h-6.5A.75.75 0 014 4.75zM4.75 7a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" />
          </svg>
          {links.company}
        </li>
        <li>
          <svg
            className={styles.linkIcon}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zM8 12.314l2.828-2.828a3.5 3.5 0 10-4.95-4.95L8 2.586l-.878.878a3.5 3.5 0 104.95 4.95L8 12.314z" />
          </svg>
          {links.location}
        </li>
        {/* <li>
          <svg
            className={styles.linkIcon}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M1.75 2A1.75 1.75 0 000 3.75v8.5C0 12.216.784 13 1.75 13h12.5A1.75 1.75 0 0016 11.25v-8.5A1.75 1.75 0 0014.25 1H1.75zM1.5 3.75a.25.25 0 01.25-.25h12.5a.25.25 0 01.25.25v8.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25v-8.5z" />
            <path d="M2.5 4.5a.5.5 0 01.5-.5h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5z" />
          </svg>
          <a href={`mailto:${links.email}`}>{links?.email}</a>
        </li> */}
        <li>
          <svg
            className={styles.linkIcon}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25z" />
            <path d="M4.025 9.275a3.5 3.5 0 004.95 0l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0 2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 000 4.95z" />
          </svg>
          <a href={links.website} target="_blank" rel="noopener noreferrer">
            {links.website}
          </a>
        </li>
        {/* <li>
          <svg
            className={styles.linkIcon}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M4.75 2a.75.75 0 01.75.75v9.5a.75.75 0 01-1.5 0v-9.5A.75.75 0 014.75 2z" />
            <path d="M10.75 2a.75.75 0 01.75.75v9.5a.75.75 0 01-1.5 0v-9.5a.75.75 0 01.75-.75z" />
          </svg>
          {links.linkedin}
        </li> */}
        <li>
          <svg
            className={styles.linkIcon}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M5.75 2a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5A.75.75 0 015.75 2zm1.5 0a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5A.75.75 0 017.25 2zm1.5 0a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5a.75.75 0 01.75-.75z" />
          </svg>
          {links.twitter}
        </li>
      </ul>
      <section className={styles.achievements}>
        <h3 className={styles.achievementsTitle}>Achievements</h3>
        <div className={styles.achievementsBadges}>
          <span className={styles.badge} title="YOLO">
            YOLO
          </span>
          <span
            className={`${styles.badge} ${styles.badgeEmoji}`}
            title="Arctic Code Vault"
          >
            &#x1F9E0;
          </span>
          <span
            className={`${styles.badge} ${styles.badgeEmoji}`}
            title="Public Sponsor"
          >
            &#x2728;
          </span>
        </div>
      </section>
      <section className={styles.organizations}>
        <h3 className={styles.organizationsTitle}>Organizations</h3>
        <div className={styles.organizationsList}>
          <a href="/" className={styles.orgAvatar} title="UptimeAI">
            <span>U</span>
          </a>
        </div>
      </section>
    </aside>
  );
}

export default ProfileSidebar;
