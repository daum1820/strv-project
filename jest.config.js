process.env.BASE_URL = 'https://private-anon-245cb480ea-strvtestproject.apiary-mock.com';

const localStorageMock = (function () {
    let store = {};

    return {
        getItem: function (key) {
            return store[key] || null;
        },
        setItem: function (key, value) {
            store[key] = value;
        },
        clear: function () {
            store = {};
        }
    };

})();

window.localStorage = localStorageMock;