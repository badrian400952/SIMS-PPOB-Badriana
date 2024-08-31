import axios from 'axios';

export const ApiData = axios.create({
    baseURL: 'https://take-home-test-api.nutech-integrasi.com'
});

// import.meta.env.VITE_API_URL,