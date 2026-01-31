import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import ProfileTabs from "../ProfileTabs/ProfileTabs";
import ProfileSidebar from "../ProfileSidebar/ProfileSidebar";
import {
  profile as fallbackProfile,
  navTabs as fallbackNavTabs,
} from "../../data/profileData";
import { getUserProfileData } from "../../services/httpService";
import { mapGitHubUserToProfile } from "../../utils";
import { USERNAME } from "../../constants";
import styles from "./Layout.module.css";

const DEFAULT_NAV_TABS = [
  { label: "Overview", path: "/", count: null },
  { label: "Repositories", path: "/repositories", count: null },
  { label: "Projects", path: "/projects", count: null },
  { label: "Packages", path: "/packages", count: null },
  { label: "Stars", path: "/stars", count: null },
];

function Layout() {
  const [profile, setProfile] = useState(null);
  const [navTabs, setNavTabs] = useState(DEFAULT_NAV_TABS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    loadProfile(abortController);
    return () => {
      abortController.abort();
    };
  }, []);

  const loadProfile = async (abortController) => {
    try {
      setLoading(true);
      setError(null);
      const raw = await getUserProfileData(USERNAME, abortController);
      if (abortController.signal.aborted) return;
      const mapped = mapGitHubUserToProfile(raw);
      setProfile(mapped);
      setNavTabs(
        DEFAULT_NAV_TABS.map((tab) => {
          if (tab.label === "Repositories") {
            return { ...tab, count: raw.public_repos ?? 0 };
          }
          return { ...tab };
        }),
      );
    } catch (err) {
      if (!abortController.signal.aborted) {
        setError(err);
        setProfile(fallbackProfile);
        setNavTabs(fallbackNavTabs);
      }
    } finally {
      if (!abortController.signal.aborted) setLoading(false);
    }
  };

  const displayProfile = profile ?? fallbackProfile;
  const displayTabs = navTabs ?? fallbackNavTabs;

  if (loading && profile === null) {
    return (
      <div className={styles.app}>
        <div className={styles.loadingWrap}>
          <p>Loading profile…</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <Header profile={displayProfile} />
      <ProfileTabs tabs={displayTabs} />
      {error && (
        <div className={styles.errorBanner} role="alert">
          Could not load latest profile data. Showing cached data.
        </div>
      )}
      <div className={styles.layout}>
        <ProfileSidebar profile={displayProfile} />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
