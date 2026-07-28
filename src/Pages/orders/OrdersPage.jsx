import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import './OrdersPage.css';
import { Header } from '../../components/Header';
import { OrdersGrid } from './OrdersGrid';

export function OrdersPage({ cart, loadCart }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrderPageData = async () => {
           const response = await axios.get('https://ecommerce-backend-yym4.onrender.com/api/orders?expand=products')
           
            setOrders(response.data);  
        }
        
        fetchOrderPageData();
    }, [])


    return (
        <>
            <title>Orders</title>

            <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />

            <Header cart={cart} />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <OrdersGrid orders={orders} loadCart={loadCart} />
            </div>

        </>
    );
}
