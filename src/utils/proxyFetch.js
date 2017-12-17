import queryString from 'query-string';

const DEFAULTS = {
    method: 'GET',
    headers: {
        'Content-type': 'application/json'
    }
};

function validateStatus(status) {
    return status >= 200 && status < 300;
}

function getParams(params) {
    return params ? queryString.stringify(params) : {};
}

// Proxy Fetch API abstraction and improvements
// allows call CORS domains
// allows plain object in 'data' option
// allows plain object as query params in 'params' option
export default function localFetch(url, options = {}) {
    const { data, params } = options;

    if (data) {
        options.body = JSON.stringify(data);
    }
    
    // 'https://cors-anywhere.herokuapp.com/' url allows CORS request
    return fetch(`https://cors-anywhere.herokuapp.com/${url}?${getParams(params)}`, Object.assign({}, DEFAULTS, options))
        .then(res => {
            if (!validateStatus(res.status)) {
                throw new Error(res.status);
            }

            return res.json();
        })
}