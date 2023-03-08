import React, {useState} from "react";
import CSRFToken from "./components/getCsrfToken";
import {Navigate} from "react-router-dom";
import {useCookies} from 'react-cookie';
import {useNavigate} from "react-router-dom"

export default function UserLogin(params) {
    if (params.isAuth) {
        return <Navigate to="/"/>;
    }
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const {username, password} = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const [cookies, setCookie] = useCookies(['auth_token']);
    const navigate = useNavigate()

    const onSubmit = e => {
        e.preventDefault();

        const API_URL = "http://localhost:8000/api/token/login/";

        const request = new XMLHttpRequest();
        const params = "username=" + username + "&password=" + password + "&csrfmiddlewaretoken=" + getCookie("csrftoken");

        request.responseType = "json";
        request.open("POST", API_URL, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        request.addEventListener("readystatechange", () => {
            if (request.readyState === 4 && request.status === 200) {
                let obj = request.response;
                setCookie('auth_token', obj.auth_token, {path: '/'});

                window.location.reload();
            }
        });

        request.send(params);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-4 offset-4 mt-5">
                    <CSRFToken/>
                    <form method="POST" className="login-form"
                          onSubmit={e => onSubmit(e)}>
                        <input
                            className='form-control mb-2'
                            type='text'
                            placeholder='Username'
                            name='username'
                            onChange={e => onChange(e)}
                            value={username}
                            required
                        />
                        <input
                            className='form-control mb-2'
                            type='password'
                            placeholder='Пароль'
                            name='password'
                            onChange={e => onChange(e)}
                            value={password}
                            required
                        />
                        <input className="btn btn-outline-secondary" type="submit" value="Отправить"/>
                    </form>
                </div>
            </div>
        </div>
    )
}