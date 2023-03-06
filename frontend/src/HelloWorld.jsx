/*jshint esversion: 6 */
/* jshint strict: false */

import React, { useEffect, useState } from "react";

function HelloWorld ({pageNumber}) {
    // const sayHello = () => alert("Привет");
    const [counter, setCounter] = useState(1);
    const [items, setItems] = useState([]);

    const onInc = () => {
        setCounter(counter => counter + 1);
    };

    useEffect( () => {
        fetch(`http://localhost:8000/?page=${counter}`)
        .then((response) => {
            // response.data()
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log(data);
            setItems(data.products);
        })
        .catch(() => console.log('we'));
    }, [counter]);

    return (
        <div>
            <button  onClick={onInc}>
                Кнопка
            </button>
            {counter}

            <ul>
                {items.map(el => (
                    <li key={el.id}>{el.name}</li>
                ))}
            </ul>

        </div>
    )
}

export default HelloWorld;