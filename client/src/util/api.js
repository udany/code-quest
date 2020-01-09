import axios from 'axios';
import config from '../config';

const options = {
    baseURL: config.apiUrl,
    withCredentials: true
};

const api = axios.create(options);

export default api;