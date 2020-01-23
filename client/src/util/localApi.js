import axios from 'axios';
import config from '../config';

const options = {
    baseURL: config.localApiUrl,
    withCredentials: true
};

const localApi = axios.create(options);

export default localApi;