import axios from 'axios'

const BASE_URL = 'https://ai-powered-job-match-platform-hbhf.onrender.com/api/v1'
const token = localStorage.getItem('token')?.replace(/"/g, '');

export const publicRequest = axios.create({
    baseURL: BASE_URL
})
export const privateRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${token}`
    }
})