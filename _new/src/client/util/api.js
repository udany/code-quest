import axios from 'axios';

const options = {
    baseURL: '/api/',
    withCredentials: true
};

const api = axios.create(options);

export default api;