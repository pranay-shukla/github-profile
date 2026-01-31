
import { CONTRIBUTION_DAYS, CONTRIBUTION_LEVELS } from '../constants';

export function isEmpty(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

export function formatNumber(num, locale = 'en-IN') {
  if (typeof num !== 'number' || Number.isNaN(num)) return '0';
  return num.toLocaleString(locale);
}

export function formatDate(date, options = { year: 'numeric', month: 'long', day: 'numeric' }) {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-IN', options);
}

export function getYearRange(startYear, count = 6) {
  return Array.from({ length: count }, (_, i) => startYear - i);
}

export function getContributionData() {
  return Array.from({ length: CONTRIBUTION_DAYS }, () =>
    Math.floor(Math.random() * CONTRIBUTION_LEVELS)
  );
}

export function buildQueryString(params) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      search.append(key, String(value));
    }
  });
  const str = search.toString();
  return str ? `?${str}` : '';
}

export function getByPath(obj, path, defaultValue = undefined) {
  if (obj == null) return defaultValue;
  const keys = path.split('.');
  let result = obj;
  for (const key of keys) {
    result = result?.[key];
    if (result === undefined) return defaultValue;
  }
  return result;
}


export function mapGitHubUserToProfile(user) {
  if (!user || typeof user !== 'object') return {};
  return {
    name: user.name || user.login || '',
    username: user.login || '',
    bio: user.bio || '',
    skills: user.bio || '',
    followers: user.followers ?? 0,
    following: user.following ?? 0,
    avatar: user.avatar_url || user.avatar || '',
    links: {
      company: user.company ? `@${user.company.replace(/^@/, '')}` : '',
      location: user.location || '',
      email: user.email || '',
      website: user.blog || '',
      linkedin: user.linkedin_username || '',
      twitter: user.twitter_username ? `@${user.twitter_username}` : '',
    },
  };
}

export function mapGitHubRepoToPinnedRepo(repo) {
  if (!repo || typeof repo !== 'object') return {};
  const langColor = repo.language ? getLanguageColor(repo.language) : null;
  return {
    name: repo.name || '',
    forked: repo.parent ? repo.parent.full_name : null,
    desc: repo.description || '',
    lang: repo.language || null,
    langColor,
  };
}

function getLanguageColor(lang) {
  const colors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    'Jupyter Notebook': '#da5b0b',
    Dart: '#00B4AB',
    Java: '#b07219',
    Go: '#00ADD8',
    Rust: '#dea584',
    Ruby: '#701516',
    PHP: '#4F5D95',
    CSS: '#563d7c',
    HTML: '#e34c26',
  };
  return colors[lang] || null;
}

export function getYearsAndTotalsFromContributions(apiResponse) {
  const total = apiResponse?.total;
  if (!total || typeof total !== 'object') {
    return { years: [], yearTotals: {} };
  }
  const years = Object.keys(total)
    .map((y) => Number(y))
    .filter((y) => !Number.isNaN(y))
    .sort((a, b) => b - a);
  const yearTotals = {};
  years.forEach((y) => {
    yearTotals[y] = Number(total[String(y)]) || 0;
  });
  return { years, yearTotals };
}

export function mapContributionApiToCalendar(apiResponse, year) {
  const raw = Array.isArray(apiResponse)
    ? apiResponse
    : Array.isArray(apiResponse?.contributions)
      ? apiResponse.contributions
      : [];
  const byDate = new Map();
  raw.forEach((item) => {
    const date = item?.date ?? item?.day;
    const count = Math.min(20, Math.max(0, Number(item?.count ?? item?.contributions ?? 0) || 0));
    if (date) byDate.set(String(date).slice(0, 10), count);
  });
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);
  const data = [];
  const d = new Date(start);
  while (d <= end) {
    const dateStr = d.toISOString().slice(0, 10);
    data.push([dateStr, byDate.get(dateStr) ?? 0]);
    d.setDate(d.getDate() + 1);
  }
  return data;
}

export function mapActivityApiToApp(apiResponse) {
  const raw = Array.isArray(apiResponse)
    ? apiResponse
    : Array.isArray(apiResponse?.activity)
      ? apiResponse.activity
      : [];
  return raw.map((item) => ({
    type: item?.type ?? 'commits',
    text: item?.text ?? '',
    repos: Array.isArray(item?.repos) ? item.repos.map((r) => ({
      name: r?.name ?? '',
      merged: Number(r?.merged ?? 0) || 0,
      open: Number(r?.open ?? 0) || 0,
    })) : undefined,
  })).filter((a) => a.text);
}

export function mapActivityApiToRadar(apiResponse) {
  const s = apiResponse?.summary ?? apiResponse ?? {};
  const codeReview = Math.min(100, Math.max(0, Number(s.codeReview ?? s.code_review ?? 0) || 0));
  const commits = Math.min(100, Math.max(0, Number(s.commits ?? 0) || 0));
  const pullRequests = Math.min(100, Math.max(0, Number(s.pullRequests ?? s.pull_requests ?? 0) || 0));
  const issues = Math.min(100, Math.max(0, Number(s.issues ?? 0) || 0));
  return [codeReview, commits, pullRequests, issues];
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default {
  isEmpty,
  formatNumber,
  formatDate,
  getYearRange,
  getContributionData,
  buildQueryString,
  getByPath,
  mapGitHubUserToProfile,
  mapGitHubRepoToPinnedRepo,
  getYearsAndTotalsFromContributions,
  mapContributionApiToCalendar,
  mapActivityApiToApp,
  mapActivityApiToRadar,
  delay,
};
