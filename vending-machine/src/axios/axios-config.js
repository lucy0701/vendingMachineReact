import axios from 'axios';

axios.defaults.baseURL = 'https://66a1da3d-b723-448d-8524-f1adf80c6cbe.mock.pstmn.io/';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.maxBodyLength = Infinity;

export default axios;
