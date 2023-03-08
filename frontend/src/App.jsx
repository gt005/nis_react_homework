/*jshint esversion: 6 */
/* jshint strict: false */

import React, {useState, useEffect} from "react";
import Header from "./components/Header";
import ProfuctsPage from "./ProductsPage";
import MainPage from "./MainPage";
import UserSignUp from "./UserSignUp";
import UserLogin from "./UserLogin";
import {getCookie} from './components/getCookie';

import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(
        Boolean(getCookie("auth_token"))
    );
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
