import axios from 'axios';
import axiosInstance from '../config/axiosConfig';
import { API_URL } from './apiService';
import { CONTRIBUTIONS_API_BASE_URL } from '../constants';

export const getUserProfileData = async (username, abortController) => {
  try {
    const response = await axiosInstance.get(API_URL.USER(username), {
      signal: abortController.signal,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile data:', error);
    throw error;
  }
};

export const getUserRepos = async (username, params = {}, abortController) => {
  try {
    const { sort = 'updated', per_page = 6 } = params;
    const response = await axiosInstance.get(API_URL.USER_REPOS(username), {
      params: { sort, per_page },
      signal: abortController.signal,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user repos:', error);
    throw error;
  }
};

export const getContributions = async (username, params = {}, abortController) => {
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
    const response = await axios.get(url, { timeout: 15000, signal: abortController.signal });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404 || abortController.signal.aborted) {
      return null;
    }
    console.error('Error fetching contributions:', error);
    throw error;
  }
};
