import React, {useState, useEffect} from "react";
import {getCookie} from './components/getCookie'

const API_URL = "http://localhost:8000/api/products"

function useServerGoods() {
    const [items, setItems] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [errorString, setErrorString] = useState('');

    const changeItemList = (newData) => {
        setItems(items.concat(newData));
    }

    const getProducts = (params) => {
        fetch(
            API_URL + `?page=${params.page}`, {
                headers: {
                    'Authorization': 'Token ' + getCookie('auth_token')
                }
            }
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.products) {
                    changeItemList(data.products);
                    setNextPage(data.nextPage);
                } else {
                    setErrorString("Ошибка соединения");
                }
            })
            .catch(() => {
                setErrorString("Ошибка соединения")
            });
    };

    return [items, nextPage, getProducts, errorString];
}

export default function ProductsPage({page}) {
    const [items, nextPage, getProducts, errorString] = useServerGoods();
    const showLoader = () => {
        const loader = document.querySelector(".products-list-loader");
        loader.classList.remove("d-none");
    }

    const hideLoader = () => {
        const loader = document.querySelector(".products-list-loader");
        loader.classList.add("d-none");
    }

    useEffect(() => {
        setTimeout(() => {
                    getProducts({page});

        }, 2000)
    }, [page]);

    useEffect(() => {
        if (items.length) {
            console.log(items)
            hideLoader();
        }
    }, [items])

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="product-page__header-label">Каталог</h1>
                    <div
                        className="error-label">{errorString}</div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 mb-5">
                    <div className="product-page__list">
                        <div className="products-list-loader">
                            <div className="spinner-border" role="status">
                                <span></span>
                            </div>
                        </div>
                        {items.map(el => (
                            <div className="product-page__list__item"
                                 key={el.id}>
                                <div>{el.name}</div>
                                <div>{el.date_created}</div>
                                <div>{el.price} ₽</div>
                            </div>
                        ))}
                    </div>
                    {(nextPage !== -1) && (
                        <button className="btn btn-outline-secondary mb-5"
                                onClick={() => {
                                    showLoader();
                                    setTimeout(() => {
                                        getProducts({page: nextPage});
                                    }, 2000)
                                }}>Загрузить
                            ещё</button>)}
                    {(nextPage === -1) && (
                        <span>Выведены все записи</span>)}
                </div>
            </div>
        </div>
    )
}
