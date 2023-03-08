import React from "react";
import {Link} from "react-router-dom";

export default function MainPage(params) {

    return (
        <div className="main-page py-5">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Главная страница списка обуви</h1>
                    </div>
                </div>
                <div className="row">
                    {
                        !params.isAuth ? (
                            <div
                                className="col-12 d-flex flex-column align-items-center">
                                <h2 className="main-page__label">Войдите, чтобы
                                    просматривать каталог</h2>
                                <Link className="btn-outline-secondary btn"
                                      to="/login">Войти</Link>
                            </div>) : (

                            <div
                                className="col-12 d-flex flex-column align-items-center">
                                <h2 className="main-page__label">Вы успешно
                                    вошли,
                                    просматривайте каталог</h2>
                                <Link className="btn-outline-secondary btn"
                                      to="/product-list">Каталог</Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>

    )
}