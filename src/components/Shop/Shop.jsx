import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../utilities/fakedb';
import './Shop.css'
import { Link, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
const Shop = () => {
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [cart, setCart] = useState([])
    const { totalProducts } = useLoaderData()


    const totalPages = Math.ceil(totalProducts / itemsPerPage)

    // const pageNumber = []
    // for (let i = 0; i < totalPages; i++) {
    //     pageNumber.push(i)
    // }

    const pageNumber = [...Array(totalPages).keys()]



    // useEffect(() => {
    //     fetch('http://localhost:3000/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, [])
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:3000/products?page=${currentPage}&limit=${itemsPerPage}`)
            const data = await response.json()
            setProducts(data)
        }
        fetchData()
    }, [currentPage, itemsPerPage])

    useEffect(() => {
        const storedCart = getShoppingCart();
        const ids = Object.keys(storedCart)
        fetch('http://localhost:3000/productsByIds', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(cartProducts => {
                const savedCart = []
                // step-1: get id 
                for (const id in storedCart) {
                    // step-2: get the product by useing id 
                    const addedProduct = cartProducts.find(product => product._id === id);
                    // step-3: get quantity of the product
                    if (addedProduct) {
                        const quantity = storedCart[id]
                        addedProduct.quantity = quantity;
                        savedCart.push(addedProduct);
                    }
                }
                setCart(savedCart);
            })


    }, [])

    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart)
        addToDb(product._id)
    }
    const handleClearCart = () => {
        setCart([])
        deleteShoppingCart()
    }
    const options = [5, 10, 20]

    const handleSelectChanges = (event) => {
        setItemsPerPage(parseInt(event.target.value))
        setCurrentPage(0)
    }
    return (
        <>
            <div className='shop-container'>
                <div className='product-container'>
                    {
                        products.map(product => <Product key={product._id} product={product} handleAddToCart={handleAddToCart}></Product>)
                    }
                </div>
                <div className='cart-container'>
                    <Cart cart={cart} handleClearCart={handleClearCart}>
                        <Link className='proceed-link' to="/orders">
                            <button className='btn-proceed'>Review Order
                                <FontAwesomeIcon icon={faArrowRight} className="delete-icon" />
                            </button>
                        </Link>
                    </Cart>
                </div>
            </div>

            {/* Pagination */}
            <div className='pagination'>
                <p>Current page: {currentPage} and items per page: {itemsPerPage}</p>
                {
                    pageNumber.map(number => <button key={number} className={currentPage === number ? 'selected' : ''} onClick={() => setCurrentPage(number)}>{number+1}</button>)
                }
                <select value={itemsPerPage} onChange={handleSelectChanges}>
                    {options.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default Shop;