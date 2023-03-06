/*jshint esversion: 6 */
/* jshint strict: false */

import React, {useState, useEffect} from "react";
import Header from "./components/Header";
import ProfuctsPage from "./ProductsPage";
import MainPage from "./MainPage";
import UserSignUp from "./UserSignUp";
import UserLogin from "./UserLogin";

import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";

const API_URL = "http://localhost:8000";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetch(API_URL + '/api/auth/login-status')
            .then((response) => {
                if (response.ok) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            })
            .catch(() => {
                setIsLoggedIn(false);
            });
    }, []);

    return (
        <BrowserRouter>
            <div className="wrapper">
                <Header isAuth={isLoggedIn} />
                <Routes>
                    <Route
                        path="/product-list"
                        exact
                        element={<ProfuctsPage page={1}/>}/>

                    <Route
                        path="/"
                        exact
                        element={<MainPage/>}/>

                    <Route
                        path="/sign-up"
                        exact
                        element={<UserSignUp/>}/>

                    <Route
                        path="/login"
                        exact
                        element={<UserLogin isAuth={isLoggedIn} />}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
