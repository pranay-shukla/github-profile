import { useMemo, useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { getContributionCalendarData } from "../../data/profileData";
import { formatNumber } from "../../utils";
import ActivityOverview from "../ActivityOverview/ActivityOverview";
import styles from "./Contributions.module.css";

const MOBILE_BREAKPOINT = 768;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT,
  );
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const update = () => setIsMobile(mql.matches);
    mql.addEventListener("change", update);
    update();
    return () => mql.removeEventListener("change", update);
  }, []);
  return isMobile;
}

const CONTRIB_COLORS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

function Contributions({
  years,
  yearTotals = {},
  activeYear,
  onYearChange,
  calendarData: calendarDataProp,
  loading = false,
  error = null,
  radarData,
}) {
  const isMobile = useIsMobile();
  const calendarData = useMemo(() => {
    if (loading && calendarDataProp == null) return [];
    return calendarDataProp ?? getContributionCalendarData(activeYear);
  }, [activeYear, calendarDataProp, loading]);

  const option = useMemo(() => {
    const cellHeight = isMobile ? 10 : 12;
    const cellWidth = isMobile ? 14 : 16;
    const dayLabelWidth = isMobile ? 22 : 28;
    const labelFontSize = isMobile ? 10 : 11;
    const leftMargin = isMobile ? 24 : 32;
    return {
      tooltip: {
        trigger: "item",
        formatter: (params) => {
          const [dateStr, value] = params.value || [];
          if (dateStr == null) return "";
          const date = new Date(dateStr);
          const formattedDate = date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          });
          const count = Number(value) || 0;
          const contribText =
            count === 0
              ? "No contributions"
              : count === 1
                ? "1 contribution"
                : `${count} contributions`;
          return `${contribText} on ${formattedDate}`;
        },
        backgroundColor: "rgba(255, 255, 255, 0.96)",
        borderColor: "#d0d7de",
        borderWidth: 1,
        padding: [8, 12],
        textStyle: {
          color: "#1f2328",
          fontSize: 12,
        },
      },
      calendar: {
        range: [String(activeYear) + "-01-01", String(activeYear) + "-12-31"],
        left: leftMargin,
        right: 8,
        top: 28,
        bottom: 4,
        cellSize: [cellWidth, cellHeight],
        itemStyle: {
          borderWidth: 1,
          borderColor: "#fff",
        },
        dayLabel: {
          show: true,
          firstDay: 0,
          nameMap: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          margin: 2,
          fontSize: labelFontSize,
          color: "#1f2328",
          width: dayLabelWidth,
        },
        monthLabel: {
          show: true,
          fontSize: labelFontSize,
          color: "#1f2328",
          nameMap: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          margin: 4,
        },
        yearLabel: {
          show: false,
        },
      },
      series: [
        {
          type: "heatmap",
          coordinateSystem: "calendar",
          data: calendarData,
        },
      ],
      visualMap: {
        show: false,
        min: 0,
        max: 20,
        inRange: {
          color: CONTRIB_COLORS,
        },
      },
    };
  }, [activeYear, calendarData, isMobile]);

  return (
    <section className={styles.section}>
      <div
        className={styles.contentRow}
        style={isMobile ? { maxWidth: "100%" } : undefined}
      >
        <div
          className={styles.content}
          style={isMobile ? { maxWidth: "100%" } : undefined}
        >
          <div className={styles.header}>
            <h2 className={styles.title}>
              {yearTotals[activeYear] != null && yearTotals[activeYear] > 0
                ? `${formatNumber(yearTotals[activeYear])} contributions in ${activeYear}`
                : `Contributions in ${activeYear}`}
            </h2>
            <div className={styles.actions}>
              <button type="button" className={styles.settingsBtn}>
                Contribution settings
                <svg
                  className={styles.settingsChevron}
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
                </svg>
              </button>
            </div>
          </div>
          <div className={styles.chartWrap}>
            {loading && calendarDataProp == null && (
              <p className={styles.contribLoading}>Loading contributions…</p>
            )}
            {error && !loading && (
              <p className={styles.contribError}>
                Could not load contributions. Showing cached data.
              </p>
            )}
            {loading && calendarDataProp == null ? (
              <div className={styles.heatmapBlock}>
                <div className={styles.heatmapSkeleton} aria-hidden="true">
                  <div className={styles.heatmapSkeletonChart} />
                </div>
              </div>
            ) : (
              <div className={styles.heatmapBlock}>
                <div className={styles.heatmapScrollWrap}>
                  <div
                    className={styles.chart}
                    style={{
                      width: "100%",
                      overflowX: "auto",
                      overflowY: "hidden",
                      minWidth: 0,
                    }}
                  >
                    <ReactECharts
                      key={activeYear}
                      option={option}
                      notMerge
                      lazyUpdate
                      style={{
                        height: 160,
                        width: isMobile ? 400 : "100%",
                        minWidth: isMobile ? 400 : undefined,
                        minHeight: 160,
                      }}
                      opts={{ renderer: "canvas" }}
                    />
                  </div>
                </div>
                <div className={styles.heatmapFooter}>
                  <a
                    href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-your-profile-readme/about-your-profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.learnLink}
                  >
                    Learn how we count contributions
                  </a>
                  <div className={styles.legend}>
                    <span>Less</span>
                    <div className={styles.legendCells}>
                      {CONTRIB_COLORS.map((color, i) => (
                        <span
                          key={i}
                          className={styles.legendCell}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <span>More</span>
                  </div>
                </div>
              </div>
            )}
            <ActivityOverview
              radarData={radarData}
              loading={loading}
              error={error}
            />
          </div>
        </div>
        <div className={styles.years}>
          {years.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => onYearChange?.(y)}
              className={
                y === activeYear
                  ? `${styles.yearBtn} ${styles.yearBtnActive}`
                  : styles.yearBtn
              }
            >
              {yearTotals[y] != null ? `${y}` : String(y)}
            </button>
          ))}
        </div>
        <div className={styles.yearSelectWrap}>
          <label htmlFor="contrib-year" className={styles.yearSelectLabel}>
            Year
          </label>
          <select
            id="contrib-year"
            className={styles.yearSelect}
            value={activeYear}
            onChange={(e) => onYearChange?.(Number(e.target.value))}
            aria-label="Select year"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {yearTotals[y] != null ? `${y}` : String(y)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}

export default Contributions;
