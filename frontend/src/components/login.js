import {getCookie} from "./getCookie"

const API_URL = "http://localhost:8000/api/token/login/";

export function login(username, password, setCookieFunction, setErrorFunction) {
    const request = new XMLHttpRequest();
    const params = "username=" + username + "&password=" + password + "&csrfmiddlewaretoken=" + getCookie("csrftoken");

    console.log(username, password)

    request.responseType = "json";
    request.open("POST", API_URL, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            let obj = request.response;
            setCookieFunction('auth_token', obj.auth_token, {path: '/'});

            window.location.reload();
        } else if (request.readyState === 4) {
            setErrorFunction("Неверный логин или пароль");
        }
    });

    request.send(params);
}