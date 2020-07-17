
export const getStudents = (params) => {
    const path = '/api/students';
    const url = createUrl(path, params);
    return fetch(url)
        .then(response => response.json());
};

export const createStudent = (params, body) => {
    const path = '/api/students';
    const url = createUrl(path, params);
    return fetch(url, {
        method: 'POST',
        body
    });
};

export const searchStudents = (params) => {
    const path = '/api/search-students';
    const url = createUrl(path, params);
    return fetch(url)
        .then(response => response.json());
};

export const sortStudents = (params) => {
    const path = '/api/sort-students';
    const url = createUrl(path, params);
    return fetch(url)
        .then(response => response.json());
};

const createUrl = (path, params) => {
    const url = new URL(window.location.toString());
    url.pathname = path;
    const paramToQuery = (paramValue) => url.searchParams.set(...paramValue);
    Object.entries(params).forEach(paramToQuery);
    console.info(url.toString())
    return url.toString();
}
