import axios from 'axios';
import axiosInstance from '../config/axiosConfig';
import { API_URL } from './apiService';
import { CONTRIBUTIONS_API_BASE_URL } from '../constants';

export const getUserProfileData = async (username) => {
  try {
    const response = await axiosInstance.get(API_URL.USER(username));
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile data:', error);
    throw error;
  }
};

export const getUserRepos = async (username, params = {}) => {
  try {
    const { sort = 'updated', per_page = 6 } = params;
    const response = await axiosInstance.get(API_URL.USER_REPOS(username), {
      params: { sort, per_page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user repos:', error);
    throw error;
  }
};

export const getUserStarred = async (username) => {
  try {
    const response = await axiosInstance.get(API_URL.USER_STARRED(username));
    return response.data;
  } catch (error) {
    console.error('Error fetching user starred repos:', error);
    throw error;
  }
};

export const getRepoData = async (owner, repo) => {
  try {
    const response = await axiosInstance.get(API_URL.REPO(owner, repo));
    return response.data;
  } catch (error) {
    console.error('Error fetching repo data:', error);
    throw error;
  }
};

export const getProfileRepos = async () => {
  try {
    const response = await axiosInstance.get(API_URL.PROFILE_REPOS);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile repos:', error);
    throw error;
  }
};

export const getContributions = async (username, params = {}) => {
  try {
    const baseUrl = `${CONTRIBUTIONS_API_BASE_URL}/${encodeURIComponent(username)}`;
    const { y } = params;
    let url = baseUrl;
    if (y !== undefined && y !== null && y !== 'all') {
      const search = new URLSearchParams();
      if (Array.isArray(y)) {
        y.forEach((year) => search.append('y', String(year)));
      } else {
        search.set('y', String(y));
      }
      url = `${baseUrl}?${search.toString()}`;
    }
    const response = await axios.get(url, { timeout: 15000 });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    console.error('Error fetching contributions:', error);
    throw error;
  }
};

export const getActivity = async (username, params = {}) => {
  try {
    const { year } = params;
    const url = API_URL.ACTIVITY(username);
    const config = year ? { params: { year } } : {};
    const response = await axiosInstance.get(url, config);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    console.error('Error fetching activity:', error);
    throw error;
  }
};