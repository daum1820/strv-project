export const login = (email, pass, cb) => {
    if (localStorage.token) {
        if (cb) cb(true);
        return;
    }
};

export const getToken = () => localStorage.token;

export const logout = (cb) => {
    delete localStorage.token;
    if (cb) cb();
};

export const isAuthenticated = () => !!localStorage.token;