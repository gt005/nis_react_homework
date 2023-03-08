import React from 'react';
import {Link} from "react-router-dom";

export default function Header({isAuth}) {

    return (
        <header>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div>
                            <Link to="/">Главная</Link>
                            {isAuth && (
                                <Link to="/product-list">Каталог</Link>)}
                            {!isAuth ? (<Link to="/login">Войти</Link>) :
                                (<Link to="/logout">Выйти</Link>)}

                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}