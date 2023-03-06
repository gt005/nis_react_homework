import React from 'react';
import { Link } from "react-router-dom";

export default function Header({isAuth}) {
    return (
        <header>
            <div>
                <Link to="/">Главная</Link>
                <Link to="/product-list">Каталог</Link>
                {!isAuth ? (<Link to="/api/auth/login">Войти</Link>) :
                    (<Link to="/api/auth/logout">Выйти</Link>)}

            </div>
        </header>
    )
}