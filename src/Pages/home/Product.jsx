import { formatMoney } from "../../utils/money";
import CheckmarkIcon from '../../assets/Images/icons/checkmark.png';
import { useState } from "react";
import axios from "axios";


export function Product({ product, loadCart }) {

    const [quantity, SetQuantity] = useState(1);
    const [showAdded, setShowAdded] = useState(false);

    const addToCart = async () => {
        await axios.post('https://ecommerce-backend-yym4.onrender.com/api/cart-items', {
            productId: product.id,
            quantity
        });
        await loadCart();

        setShowAdded(true);

        setTimeout(() => {
            setShowAdded(false);
        }, 2000);

    };

    const selectQuantity = (event) => {
        const quantitySelected = Number(event.target.value);
        SetQuantity(quantitySelected);
    }



    return (


        <div className="product-container"
            data-testid="product-container" >
            <div className="product-image-container">
                <img className="product-image"
                    data-testid="product-image"
                    src={product.image} />
            </div>

            <div className="product-name limit-text-to-2-lines">
                {product.name}
            </div>

            <div className="product-rating-container">
                <img className="product-rating-stars"
                    data-testid="product-rating-stars-image"
                    src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
                <div className="product-rating-count link-primary">
                    {product.rating.count}
                </div>
            </div>

            <div className="product-price">
                {formatMoney(product.priceCents)}
            </div>

            <div className="product-quantity-container">
                <select value={quantity} onChange={selectQuantity} data-testid="quantity-selector">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div className="product-spacer"></div>

            <div className="added-to-cart" style={{ opacity: showAdded ? 1 : 0, }}>
                <img src={CheckmarkIcon} />
                Added
            </div>

            <button className="add-to-cart-button button-primary"
                data-testid="add-to-cart-button"
                onClick={addToCart}>
                Add to Cart
            </button>
        </div>
    );


}