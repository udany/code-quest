import axios from 'axios';

const options = {
    baseURL: '',
    withCredentials: true
};

const localApi = axios.create(options);

export default localApi;