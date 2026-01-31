export const API_URL = {
  USER: (username) => `/users/${username}`,
  USER_REPOS: (username) => `/users/${username}/repos`,
  USER_STARRED: (username) => `/users/${username}/starred`,
  REPO: (owner, repo) => `/repos/${owner}/${repo}`,
  PROFILE_REPOS: '/profile/repos',
  CONTRIBUTIONS: (username) => `/users/${username}/contributions`,
  ACTIVITY: (username) => `/users/${username}/activity`,
}