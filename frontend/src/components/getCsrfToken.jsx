import React, { useState, useEffect } from 'react';

const API_URL = "http://localhost:8000/api/auth"

export default function CSRFToken() {
    const [csrftoken, setcsrftoken] = useState('');

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    useEffect(() => {


        const fetchData = async () => {
            try {
                await fetch(`${API_URL}/csrf_cookie`);
            } catch (err) {

            }
        };

        fetchData();
        setcsrftoken(getCookie('csrftoken'));
    }, []);

    return (
        <input type='hidden' name='csrfmiddlewaretoken' value={csrftoken} />
    );
};