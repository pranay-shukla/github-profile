import styles from "./ContributionActivity.module.css";

function CommitIcon() {
  return (
    <svg
      className={styles.icon}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M3.25 1A2.25 2.25 0 001 3.25v9.5A2.25 2.25 0 003.25 15h9.5A2.25 2.25 0 0015 12.75v-9.5A2.25 2.25 0 0012.75 1h-9.5zM2.5 3.25a.75.75 0 01.75-.75h9.5a.75.75 0 01.75.75v9.5a.75.75 0 01-.75.75h-9.5a.75.75 0 01-.75-.75v-9.5z"
      />
      <path
        fillRule="evenodd"
        d="M5.25 5a.75.75 0 01.75-.75h4a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75zM5.25 8a.75.75 0 01.75-.75h4a.75.75 0 010 1.5H6A.75.75 0 015.25 8zM5.25 11a.75.75 0 01.75-.75h2a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75z"
      />
    </svg>
  );
}

function PullRequestIcon() {
  return (
    <svg
      className={styles.icon}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z" />
    </svg>
  );
}

function DragHandleIcon() {
  return (
    <svg
      className={styles.dragHandle}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M5 3a1 1 0 102 0 1 1 0 00-2 0zm0 5a1 1 0 102 0 1 1 0 00-2 0zm0 5a1 1 0 102 0 1 1 0 00-2 0zm5-10a1 1 0 102 0 1 1 0 00-2 0zm0 5a1 1 0 102 0 1 1 0 00-2 0zm0 5a1 1 0 102 0 1 1 0 00-2 0z" />
    </svg>
  );
}

function ContributionActivity({ activity, years, activeYear, onYearChange }) {
  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Contribution activity</h2>
        {years && years.length > 0 && (
          <div className={styles.yearSelectWrap}>
            <label
              htmlFor="contrib-activity-year"
              className={styles.yearSelectLabel}
            >
              Year:
            </label>
            <select
              id="contrib-activity-year"
              className={styles.yearSelect}
              value={activeYear}
              onChange={(e) => onYearChange?.(Number(e.target.value))}
              aria-label="Select year"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <p className={styles.month}>October 2025</p>
      <ul className={styles.timeline}>
        {activity.map((item, i) => (
          <li key={i} className={styles.item}>
            <div className={styles.itemLine} />
            <div className={styles.itemContent}>
              <div className={styles.itemRow}>
                {item.type === "commits" && <CommitIcon />}
                {item.type === "pull_requests" && <PullRequestIcon />}
                <span className={styles.text}>{item.text}</span>
                <span className={styles.dragHandleWrap}>
                  <DragHandleIcon />
                </span>
              </div>
              {item.repos && (
                <ul className={styles.repos}>
                  {item.repos.map((r) => (
                    <li key={r.name} className={styles.repo}>
                      <a href="/" className={styles.repoLink}>
                        {r.name}
                      </a>
                      <span className={styles.repoPills}>
                        {r.merged > 0 && (
                          <span
                            className={`${styles.prTag} ${styles.prTagMerged}`}
                          >
                            {r.merged} merged
                          </span>
                        )}
                        {r.open > 0 && (
                          <span
                            className={`${styles.prTag} ${styles.prTagOpen}`}
                          >
                            {r.open} open
                          </span>
                        )}
                      </span>
                      <span className={styles.dragHandleWrap}>
                        <DragHandleIcon />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.showMoreWrap}>
        <button type="button" className={styles.showMoreBtn}>
          Show more activity
        </button>
      </div>
      <p className={styles.footerNote}>
        Seeing something unexpected? Take a look at the{" "}
        <a href="/">GitHub profile guide</a>.
      </p>
    </section>
  );
}

export default ContributionActivity;
