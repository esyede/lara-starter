const BASEURL = document.head.querySelector('meta[name="base-url"]').content;
const TIMEZONE = "Asia/Jakarta";
window.BASEURL = BASEURL;
window.TIMEZONE = TIMEZONE;
window.axios = require("axios");
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.axios.defaults.baseURL = BASEURL + "/admin-api/";
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
} else {
    console.error(
        "CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token"
    );
}

window.moment = require("moment");
