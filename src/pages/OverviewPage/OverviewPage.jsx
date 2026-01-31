import { useState, useEffect, useMemo } from "react";
import PopularRepos from "../../components/PopularRepos/PopularRepos";
import Contributions from "../../components/Contributions/Contributions";
import ContributionActivity from "../../components/ContributionActivity/ContributionActivity";
import {
  pinnedRepos as fallbackPinnedRepos,
  contributionActivity as fallbackContributionActivity,
  getContributionCalendarData,
} from "../../data/profileData";
import { getUserRepos, getContributions } from "../../services/httpService";
import {
  mapGitHubRepoToPinnedRepo,
  getYearsAndTotalsFromContributions,
  mapContributionApiToCalendar,
  getYearRange,
} from "../../utils";
import { USERNAME } from "../../constants";
import styles from "./OverviewPage.module.css";

const DEFAULT_RADAR = [0, 80, 20, 0];

const FALLBACK_YEARS_COUNT = 14;

function OverviewPage() {
  const currentYear = new Date().getFullYear();
  const [activeYear, setActiveYear] = useState(currentYear);

  const [repos, setRepos] = useState(fallbackPinnedRepos);
  const [reposLoading, setReposLoading] = useState(true);
  const [reposError, setReposError] = useState(null);

  const [contributionsCache, setContributionsCache] = useState(null);
  const [calendarDataByYear, setCalendarDataByYear] = useState({});
  const [calendarLoading, setCalendarLoading] = useState(false);
  const [contribLoading, setContribLoading] = useState(true);
  const [contribError, setContribError] = useState(null);

  const { years: contributionYears, yearTotals } = useMemo(() => {
    if (contributionsCache) {
      return getYearsAndTotalsFromContributions(contributionsCache);
    }
    const years = getYearRange(currentYear, FALLBACK_YEARS_COUNT);
    const totals = {};
    years.forEach((y) => {
      totals[y] = 0;
    });
    return { years, yearTotals: totals };
  }, [contributionsCache, currentYear]);

  const calendarData = calendarDataByYear[activeYear] ?? null;

  useEffect(() => {
    if (
      contributionYears.length > 0 &&
      !contributionYears.includes(activeYear)
    ) {
      setActiveYear(contributionYears[0]);
    }
  }, [contributionYears, activeYear]);

  useEffect(() => {
    if (calendarDataByYear[activeYear] != null) return;
    let cancelled = false;

    async function loadYearContributions() {
      setCalendarLoading(true);
      try {
        const res = await getContributions(USERNAME, { y: activeYear }).catch(
          () => null,
        );
        if (cancelled) return;
        const mapped = res
          ? mapContributionApiToCalendar(res, activeYear)
          : null;
        if (cancelled) return;
        setCalendarDataByYear((prev) => ({ ...prev, [activeYear]: mapped }));
      } finally {
        if (!cancelled) setCalendarLoading(false);
      }
    }

    loadYearContributions();
    return () => {
      cancelled = true;
    };
  }, [activeYear, calendarDataByYear]);

  useEffect(() => {
    let cancelled = false;

    async function loadRepos() {
      try {
        setReposLoading(true);
        setReposError(null);
        const data = await getUserRepos(USERNAME, {
          sort: "updated",
          per_page: 6,
        });
        if (cancelled) return;
        const mapped = Array.isArray(data)
          ? data.map(mapGitHubRepoToPinnedRepo)
          : [];
        setRepos(mapped.length ? mapped : fallbackPinnedRepos);
      } catch (err) {
        if (!cancelled) {
          setReposError(err);
          setRepos(fallbackPinnedRepos);
        }
      } finally {
        if (!cancelled) setReposLoading(false);
      }
    }

    loadRepos();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadContributionsAll() {
      try {
        setContribLoading(true);
        setContribError(null);
        const contribRes = await getContributions(USERNAME, { y: "all" }).catch(
          () => null,
        );
        if (cancelled) return;
        setContributionsCache(contribRes ?? null);
      } catch (err) {
        if (!cancelled) {
          setContribError(err);
          setContributionsCache(null);
        }
      } finally {
        if (!cancelled) setContribLoading(false);
      }
    }

    loadContributionsAll();
    return () => {
      cancelled = true;
    };
  }, []);

  const heatmapCalendarData =
    calendarData ??
    (calendarLoading ? null : getContributionCalendarData(activeYear));

  return (
    <>
      <PopularRepos repos={repos} loading={reposLoading} error={reposError} />
      <div className={styles.contentBlock}>
        <Contributions
          years={contributionYears}
          yearTotals={yearTotals}
          activeYear={activeYear}
          onYearChange={setActiveYear}
          calendarData={heatmapCalendarData}
          loading={contribLoading || calendarLoading}
          error={contribError}
          radarData={DEFAULT_RADAR}
        />
        <ContributionActivity
          activity={fallbackContributionActivity}
          years={contributionYears}
          activeYear={activeYear}
          onYearChange={setActiveYear}
        />
      </div>
    </>
  );
}

export default OverviewPage;
