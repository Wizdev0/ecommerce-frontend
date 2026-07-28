import { formatMoney } from "../../utils/money";
import { DeliveryOptions } from "./DeliveryOptions";
import { CartItemDetails } from "./CartItemDetails";
import { DeliveryDate } from "./DeliveryDate";
import axios from "axios";

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
    return (
        <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map((cartItem) => {

                const deleteCartItem = async () => {
                    await axios.delete(`https://ecommerce-backend-yym4.onrender.com/api/cart-items/${cartItem.productId}`);
                    await loadCart();
                };



                return (
                    <div key={cartItem.productId} className="cart-item-container">

                        <DeliveryDate cartItem={cartItem} deliveryOptions={deliveryOptions} deleteCartItem={deleteCartItem} />

                        <div className="cart-item-details-grid">

                            <CartItemDetails cartItem={cartItem} deleteCartItem={deleteCartItem} loadCart={loadCart} />
                            <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart}  />
                        </div>
                    </div>
                );
            })}    

        </div>
    );
}