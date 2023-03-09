import React, {useState} from "react";
import CSRFToken from "./components/getCsrfToken";
import {Navigate, Link} from "react-router-dom";
import {useCookies} from 'react-cookie';
import {login} from "./components/login"

export default function UserLogin(params) {
    if (params.isAuth) {
        return <Navigate to="/"/>;
    }

    const [error, setError] = useState('');

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

    const onSubmit = e => {
        e.preventDefault();

        login(username, password, setCookie, setError);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-4 offset-4 mt-5">
                    <CSRFToken/>
                    <form method="POST" className="login-form text-center"
                          onSubmit={e => onSubmit(e)}>
                        {error && <span className="error-label">{error}</span>}
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
            <div className="row">
                <div className="col-12 text-center mt-3">
                    <span>Нет аккаунта? <Link to="/sign-up">Регистрация</Link></span>
                </div>
            </div>
        </div>
    )
}