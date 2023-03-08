import React, { useState, useEffect } from 'react';
import {getCookie} from './getCookie';

const API_URL = "http://localhost:8000/api/auth"

export default function CSRFToken() {
    const [csrftoken, setcsrftoken] = useState('');

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