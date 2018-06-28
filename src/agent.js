import axios from 'axios';

const API_ROOT = 'http://localhost:6060/api';

// Helper function to parse our response data
const responseBody = res => res.data;

/**
 * Base request types.
 *
 * Notice how each request forwards its initial
 * response from the Promise onto the `responseBody`
 * function? This is because the Axios response schema
 * returns several pieces of information besides the
 * actual response.
 *
 * So, every time we perform an AJAX call, parse out
 * the relevant data as a helper, and return that
 * instead.
 *
 * @see https://github.com/axios/axios#response-schema
 */
// prettier-ignore
const requests = {
    del: (url) =>
        axios
            .delete(`${API_ROOT}/${url}`)
            .then(responseBody),
    get: (url) =>
        axios
            .get(`${API_ROOT}/${url}`)
            .then(responseBody),
    put: (url, body) =>
        axios
            .put(`${API_ROOT}/${url}`, body)
            .then(responseBody),
    post: (url, body) =>
        axios
            .post(`${API_ROOT}/${url}`, body)
            .then(responseBody),
};
