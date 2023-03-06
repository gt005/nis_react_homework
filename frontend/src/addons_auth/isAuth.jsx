const API_URL = "http://localhost:8000/api/auth/login-status";

export function isAuth() {
    fetch(API_URL);
}