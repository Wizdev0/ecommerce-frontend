import dayjs from "dayjs";
import axios from "axios";

export function DeliveryDate({ cartItem, deliveryOptions, loadCart, deleteCartItem }) {
    
        
            const selectedDeliveryOptions = deliveryOptions
                .find((deliveryOption) => {
                    return deliveryOption.id === cartItem.deliveryOptionId;
                });

                

            return (

                <div className="delivery-date">
                    Delivery date: {dayjs(selectedDeliveryOptions.estimatedDeliveryTimeMs).format('dddd, MMMM D')}

                </div>
            );
        

}