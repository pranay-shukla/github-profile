import { get } from './httpService';
import { ENDPOINTS } from '../constants';
import { mapGitHubUserToProfile, mapGitHubRepoToPinnedRepo } from '../utils';

export async function fetchProfile(username) {
  const url = ENDPOINTS.USER(username);
  const data = await get(url, { baseUrl: API_BASE_URL });

  if (typeof mapGitHubUserToProfile === 'function') {
    return mapGitHubUserToProfile(data);
  }
  return data;
}

export async function fetchPinnedRepos(username, params = {}) {
  const { sort = 'updated', per_page = 6 } = params;
  const query = new URLSearchParams({ sort, per_page }).toString();
  const url = `${ENDPOINTS.USER_REPOS(username)}?${query}`;
  const data = await get(url, { baseUrl: API_BASE_URL });

  if (Array.isArray(data) && typeof mapGitHubRepoToPinnedRepo === 'function') {
    return data.map(mapGitHubRepoToPinnedRepo);
  }
  return Array.isArray(data) ? data : [];
}

export async function fetchProfileCounts(username) {
  const url = ENDPOINTS.USER(username);
  const data = await get(url, { baseUrl: API_BASE_URL });
  return {
    publicRepos: data.public_repos ?? 0,
    totalPrivateRepos: data.total_private_repos,
  };
}

export async function fetchContributionActivity(username, params = {}) {
  const { year = new Date().getFullYear() } = params;
  try {
    const url = `${ENDPOINTS.ACTIVITY(username)}?year=${year}`;
    const data = await get(url, { baseUrl: API_BASE_URL });
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function fetchProfileOverview(username) {
  const [profile, pinnedRepos, counts] = await Promise.all([
    fetchProfile(username),
    fetchPinnedRepos(username),
    fetchProfileCounts(username).catch(() => ({ publicRepos: 0 })),
  ]);

  const navTabs = [
    { label: 'Overview', active: true },
    { label: 'Repositories', count: counts.publicRepos ?? 0 },
    { label: 'Projects' },
    { label: 'Packages', count: 0 },
    { label: 'Stars', count: 0 },
  ];

  let contributionActivity = [];
  try {
    contributionActivity = await fetchContributionActivity(username);
  } catch {
    contributionActivity = [];
  }

  return {
    profile,
    pinnedRepos,
    contributionActivity,
    navTabs,
  };
}

export default {
  fetchProfile,
  fetchPinnedRepos,
  fetchProfileCounts,
  fetchContributionActivity,
  fetchProfileOverview,
};
