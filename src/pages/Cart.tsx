import type { RootState } from "../app/store"
import { useDispatch, useSelector } from "react-redux"
import { decrementQty, incrementQty, removeFromCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

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
                        <img src={item.thumbnail} alt="" />
                        <div className="qty">
                            <button onClick={() => {
                                dispatch(decrementQty(item.id))
                                toast.success(`Quantity decreased to ${item.qty-1}`)
                                }} disabled={item.qty <= 1}>-</button>
                            <p>Qty: {item.qty}</p>
                            <button onClick={() => {
                                dispatch(incrementQty(item.id))
                                toast.success(`Quantity increased to ${item.qty+1}`)
                                }}>+</button>
                        </div>
                    </div>
                    <div className="cart-item-box">
                        <h4>{item.title}</h4>
                        <p>$ {itemTotal.toFixed(2)}</p>
                    </div>
                    <button className="remove-btn" onClick={() => {
                        dispatch(removeFromCart(item.id))
                        toast.success("Item removed successfully!")
                        }}>
                        Remove
                    </button>
                </div>
            })}
        </div>
    )
}

export default Cart