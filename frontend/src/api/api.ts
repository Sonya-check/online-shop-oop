// frontend/src/api/api.ts
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE,
});

export default api;