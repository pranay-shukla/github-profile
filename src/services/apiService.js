export const API_URL = {
  USER: (username) => `/users/${username}`,
  USER_REPOS: (username) => `/users/${username}/repos`,
  CONTRIBUTIONS: (username) => `/users/${username}/contributions`,
}