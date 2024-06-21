import axios from "axios";

export const api = axios.create({
    baseURL: 'https://chat-data-api.onrender.com',
    timeout: 10000,
});
