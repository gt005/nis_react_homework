import {useCookies} from 'react-cookie';
import { Navigate } from "react-router-dom";
import React, {useState} from "react";
import {getCookie} from './components/getCookie'

export default function UserLogout(params) {
    const [cookie, setCookie, removeCookie] = useCookies();

    if (!params.isAuth) {
        return <Navigate to="/" />;
    }

    const API_URL = "http://localhost:8000/api/token/logout/";

    const request = new XMLHttpRequest();

    request.open("POST", API_URL, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.setRequestHeader("Authorization", 'Token ' + getCookie('auth_token'));

    console.log('Token ' + getCookie('auth_token'));
    request.addEventListener("readystatechange", () => {
        console.log(request)
        if (request.readyState === 4) {
            let obj = request.response;
            removeCookie('auth_token');
        }
    });

    request.send();
    return <Navigate to="/" />;
}