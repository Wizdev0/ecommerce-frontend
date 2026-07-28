import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import './HomePage.css';
import { useSearchParams } from 'react-router';
import { ProductsGrid } from './ProductsGrid';

export function HomePage( { cart, loadCart, isSearch } ) {
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const searchText = searchParams.get('isSearch');


    useEffect(() => {
        const getHomeData = async () => {
            const urlPath = isSearch ? `https://ecommerce-backend-yym4.onrender.com/api/products?search=${isSearch}` 
            : 'https://ecommerce-backend-yym4.onrender.com/api/products';

            const response = await axios.get(urlPath);

            setProducts(response.data);

        }
       
 
        getHomeData();
    },[isSearch]);

    
    

    return (
        <>

            <title>Ecommerce Project</title>
            <link rel="icon" type="image/svg+xml" href="home-favicon.png" />


            <Header cart={cart} isSearch={isSearch} />



            <div className="home-page">
                <ProductsGrid products={ products } loadCart={loadCart} />
            </div>

        </>
    );
}