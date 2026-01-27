import type { RootState } from "@reduxjs/toolkit/query"
import { useDispatch, useSelector } from "react-redux"
import { decrementQty, incrementQty, removeFromCart } from "../features/cart/cartSlice";

const Cart = () => {

    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    if (cart.length === 0) return <div className="empty-cart"> <h2>Cart is empty</h2></div>

    return (
        <div className="cart-container">
            {cart.map((item) => {
                const itemTotal = item.price * item.qty;
                return <div key={item.id} className="cart-item">
                    <div className="cart-item-box">
                        <img src={item.image} alt="" />
                        <div className="qty">
                            <button onClick={() => dispatch(decrementQty(item.id))} disabled={item.qty <= 1}>-</button>
                            <p>Qty: {item.qty}</p>
                            <button onClick={() => dispatch(incrementQty(item.id))}>+</button>
                        </div>
                    </div>
                    <div className="cart-item-box">
                        <h4>{item.title}</h4>
                        <p>$ {itemTotal.toFixed(2)}</p>
                    </div>
                    <button onClick={() => dispatch(removeFromCart(item.id))}>
                        Remove
                    </button>
                </div>
            })}
        </div>
    )
}

export default Cart