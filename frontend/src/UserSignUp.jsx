import React, {useState, useEffect} from "react";
import CSRFToken from "./components/getCsrfToken";
import { Navigate } from "react-router-dom";

export default function UserSignUp(params) {
    if (params.isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <CSRFToken />
    )
}