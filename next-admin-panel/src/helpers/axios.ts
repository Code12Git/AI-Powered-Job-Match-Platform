// src/helpers/axios.ts
import axios from 'axios'

const BASE_URL = 'https://ai-powered-job-match-platform-hbhf.onrender.com/api/v1'

let token: string | null = null;

if (typeof window !== 'undefined') {
  token = localStorage.getItem('token');
}

export const publicRequest = axios.create({
  baseURL: BASE_URL
});

export const privateRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : ''
  }
});
