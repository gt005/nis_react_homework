import React, {useState, useEffect} from "react";

const API_URL = "http://localhost:8000/api/products"

function useServerGoods() {
    const [items, setItems] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [errorString, setErrorString] = useState('');

    const changeItemList = (newData) => {
        setItems(items.concat(newData));
    }

    const getProducts = (params) => {
        fetch(API_URL + `?page=${params.page}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data) {
                    changeItemList(data.products);
                    setNextPage(data.nextPage);
                } else {
                    setErrorString(data.error);
                }
            })
            .catch(() => setErrorString("Ошибка соединения"));
    };

    return [items, nextPage, getProducts, errorString];
}

export default function ProductsPage({page}) {
    const [items, nextPage, getProducts, errorString] = useServerGoods();

    useEffect(() => {
        getProducts({page});
    }, [page]);

    return (
        <div>
            {items.map(el => (
                <div key={el.id}>{el.name}</div>
            ))}
            {(nextPage != -1) && (<button onClick={() => getProducts({page: nextPage})}>Загрузить ещё</button>)}
            {(nextPage == -1) && (<span>Выведены все записи</span>)}
            <div color="red">{errorString}</div>
        </div>
    )
}
