import React, {useState} from "react";
import CSRFToken from "./components/getCsrfToken";
import {login} from "./addons_auth/login";
import { Navigate } from "react-router-dom";

export default function UserLogin(params) {
    if (params.isAuth) {
        return <Navigate to="/" />;
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

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        console.log(getCookie("csrftoken"));

        login(username, password, getCookie("csrftoken"));
    };

    return (
        <main>
            <CSRFToken />
            <form method="POST" className="login-form" onSubmit={e => onSubmit(e)}>
                <input
                        className='form-control'
                        type='text'
                        placeholder='Username'
                        name='username'
                        onChange={e => onChange(e)}
                        value={username}
                        required
                    />
                <input
                        className='form-control'
                        type='password'
                        placeholder='Password'
                        name='password'
                        onChange={e => onChange(e)}
                        value={password}
                        required
                    />
                <input type="submit" value="Отправить"/>
            </form>
        </main>
    )
}