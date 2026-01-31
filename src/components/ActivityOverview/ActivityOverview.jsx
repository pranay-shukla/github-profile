import { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import styles from "./ActivityOverview.module.css";

const RADAR_INDICATORS = [
  { name: "Code review", max: 100 },
  { name: "Commits", max: 100 },
  { name: "Pull requests", max: 100 },
  { name: "Issues", max: 100 },
];

const DEFAULT_RADAR = [0, 80, 20, 0];

function ActivityOverview({
  radarData: radarDataProp,
  loading = false,
  error = null,
}) {
  const radarValues = useMemo(
    () =>
      Array.isArray(radarDataProp) && radarDataProp.length >= 4
        ? radarDataProp.slice(0, 4)
        : DEFAULT_RADAR,
    [
      radarDataProp?.[0],
      radarDataProp?.[1],
      radarDataProp?.[2],
      radarDataProp?.[3],
    ],
  );

  const option = useMemo(
    () => ({
      radar: {
        indicator: RADAR_INDICATORS,
        center: ["50%", "50%"],
        radius: "70%",
        startAngle: 90,
        splitNumber: 2,
        shape: "polygon",
        axisName: {
          color: "#1f2328",
          fontSize: 11,
          formatter: (value) => {
            const idx = RADAR_INDICATORS.findIndex((i) => i.name === value);
            const v = idx >= 0 ? radarValues[idx] : 0;
            if (value === "Commits" && v > 0) return `${v}% >`;
            if (value === "Pull requests" && v > 0) return `${v}% ${value}`;
            return value;
          },
        },
        splitArea: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: "rgba(35, 134, 54, 0.35)",
            width: 1,
          },
        },
        axisLine: {
          lineStyle: {
            color: "rgba(35, 134, 54, 0.5)",
            width: 1,
          },
        },
      },
      series: [
        {
          type: "radar",
          data: [
            {
              value: radarValues,
              name: "Contributions",
              areaStyle: {
                color: "rgba(35, 134, 54, 0.3)",
              },
              lineStyle: {
                color: "#1a7f37",
                width: 1,
              },
              itemStyle: {
                color: "#1a7f37",
              },
              label: {
                show: false,
              },
            },
          ],
        },
      ],
    }),
    [radarValues],
  );

  return (
    <section className={styles.section}>
      <div className={styles.badges}>
        <span
          className={`${styles.badge} ${styles.badgePurple}`}
          title="@UptimeAI"
        >
          @UptimeAI
        </span>
        <span
          className={`${styles.badge} ${styles.badgeYellow}`}
          title="@timescale"
        >
          @timescale
        </span>
      </div>
      <h2 className={styles.title}>Activity overview</h2>
      <div className={styles.content}>
        <div className={styles.left}>
          <p className={styles.summary}>
            <svg
              className={styles.summaryIcon}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M1.75 2.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25H1.75zM0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0114.25 15H1.75A1.75 1.75 0 010 13.25V2.75z" />
              <path d="M4 4.75A.75.75 0 014.75 4h6.5a.75.75 0 010 1.5h-6.5A.75.75 0 014 4.75zM4.75 7a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" />
            </svg>
            Contributed to <a href="/">UptimeAI/uptime_webapp</a>,{" "}
            <a href="/">UptimeAI/uptime_server</a>,{" "}
            <a href="/">UptimeAI/uptime_ml</a> and 13 other repositories
          </p>
        </div>
        <div className={styles.chartWrap}>
          <ReactECharts
            option={option}
            notMerge
            lazyUpdate
            style={{ height: 220, width: "100%" }}
            opts={{ renderer: "canvas" }}
          />
        </div>
      </div>
    </section>
  );
}

export default ActivityOverview;
