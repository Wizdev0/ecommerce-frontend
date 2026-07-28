import { NavLink, useNavigate, useSearchParams } from 'react-router';
import './Header.css';
import { useState } from 'react';
import MobilelogoWhite from '../assets/Images/mobile-logo-white.png';
import MobileLogo from '../assets/Images/mobile-logo.png';
import SearchIcon from '../assets/Images/icons/search-icon.png';
import CartIcon from '../assets/Images/icons/cart-icon.png';
import LogoWhite from '../assets/Images/logo-white.png'

export function Header({ cart }) {
    
    const [searchParams] = useSearchParams();

    let totalQuantity = 0;

    const navigate = useNavigate();

    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity; 
    });


    const searchInput = (event) => {
        setIsSearch(event.target.value);
    }

    const searchProducts = () => {
        navigate(`/?search=${isSearch}`)
    }

    const searchText = searchParams.get('isSearch');


    const [isSearch, setIsSearch] = useState(searchText || '');

    return (
        <div className="header">
            <div className="left-section">
                <NavLink to="/" className="header-link">
                    <img className="logo"
                        src={LogoWhite} />
                    <img className="mobile-logo"
                        src={LogoWhite} />
                </NavLink>
            </div>

            <div className="middle-section">
                <input 
                    className="search-bar" 
                    type="text" 
                    placeholder="Search" 
                    value={isSearch} 
                    onChange={searchInput} 
                />

                <button className="search-button">
                    <img className="search-icon" src={SearchIcon} onClick={searchProducts} />
                </button>
            </div>

            <div className="right-section">
                <NavLink className="orders-link header-link" to="/orders">
                
                    <span className="orders-text">Orders</span>
                </NavLink>

                <NavLink className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src={CartIcon} />
                    <div className="cart-quantity">{totalQuantity}</div>
                    <div className="cart-text">Cart</div>
                </NavLink>
            </div>
        </div>
    );
}