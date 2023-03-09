import React, {useState} from "react";
import CSRFToken from "./components/getCsrfToken";
import {Navigate, Link} from "react-router-dom";
import {useCookies} from 'react-cookie';
import {getCookie} from "./components/getCookie"
import {login} from "./components/login"

export default function UserSignUp(params) {
    if (params.isAuth) {
        return <Navigate to="/"/>;
    }

    const [cookies, setCookie] = useCookies(['auth_token']);
    const [errorList, setErrorList] = useState([]);
    const setErrorsFromLogin = (errorString) => {
                setErrorList([errorString]);
            }

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        re_password: '',
    });

    const {username, password, re_password} = formData;
    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = e => {
        e.preventDefault();

        const API_URL = "http://localhost:8000/api/users/";

        if (password !== re_password) {
            setErrorList(["Пароли не совпадают"])
        }

        const request = new XMLHttpRequest();
        const params = "username=" + username +
                       "&password=" + password +
                       "&re_password=" + re_password +
                       "&csrfmiddlewaretoken=" + getCookie("csrftoken");

        request.responseType = "json";
        request.open("POST", API_URL, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        request.addEventListener("readystatechange", () => {
            if (request.readyState === 4 && request.status === 201) {
                login(username, password, setCookie, setErrorsFromLogin);
            } else if (request.readyState === 4) {
                setErrorList(
                    request.response.username || request.response.password ||
                    request.response.re_password
                );
            }
        });

        request.send(params);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-4 offset-4 mt-5">
                    <CSRFToken/>
                    <form method="POST" className="sign-up-form text-center"
                          onSubmit={e => onSubmit(e)}>
                        <ul>
                            {errorList.map(e => (
                                <li className="error-label">{e}</li>
                            ))}
                        </ul>
                        <span className=""></span>
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
                        <input
                            className='form-control mb-2'
                            type='password'
                            placeholder='Повторите пароль'
                            name='re_password'
                            onChange={e => onChange(e)}
                            value={re_password}
                            required
                        />
                        <input className="btn btn-outline-secondary"
                               type="submit" value="Отправить"/>
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-12 text-center mt-3">
                    <span>Есть аккаунт? <Link to="/login">Войти</Link></span>
                </div>
            </div>
        </div>
    )
}