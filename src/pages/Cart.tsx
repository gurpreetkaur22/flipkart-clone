import type { RootState } from "../app/store"
import { useDispatch, useSelector } from "react-redux"
import { clearCart, decrementQty, incrementQty, removeFromCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import OrderModal from "../components/OrderModal";

const Cart = () => {

    const cart = useSelector((state: RootState) => state.cart);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
        payment: "COD"
    })

    const handleChange = ((e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    })

    const handlePlaceOrder = () => {
        if (
            !form.name || !form.phone || !form.address || !form.city || !form.pincode
        ) {
            toast.error("Please fill all the address details!");
            return;
        }
        toast.success("Order placed successfully 🎉");
        dispatch(clearCart());
        setShowModal(false);
        setTimeout(() => {
            navigate('/');
        }, 800);
    }

    if (cart.length === 0) return <div className="empty-cart">
        <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" width={400} alt="" />
        <h2>Cart is empty</h2>
    </div>

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.qty, 0
    )

    return (
        <div className="cart-container">

            <div className="cart-items">
                {cart.map((item) => {
                    const itemTotal = item.price * item.qty;
                    return <div key={item.id} className="cart-item">
                        <div className="cart-item-box">
                            <img src={item.thumbnail} alt="" />
                            <div className="qty">
                                <button onClick={() => {
                                    dispatch(decrementQty(item.id))
                                    toast.success(`Quantity decreased to ${item.qty - 1}`)
                                }} disabled={item.qty <= 1}>-</button>
                                <p>Qty: {item.qty}</p>
                                <button onClick={() => {
                                    dispatch(incrementQty(item.id))
                                    toast.success(`Quantity increased to ${item.qty + 1}`)
                                }}>+</button>
                            </div>
                        </div>
                        <div className="cart-item-box">
                            <h4 className="truncate" title={item.title}>{item.title}</h4>
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

            <div className="cart-summary">
                <h3>Price Details</h3>
                <hr style={{ width: '100%' }} />

                <div className="address-section">
                    <h3>Delivery Address</h3>
                    <div className="text-fields">
                        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} />
                        <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} />
                    </div>
                    <div className="text-fields">
                        <textarea name="address" placeholder="Address" onChange={handleChange} />
                        <input type="text" name="city" placeholder="City" onChange={handleChange} />
                    </div>
                    <div className="text-fields">
                        <input name="pincode" placeholder="Pincode" onChange={handleChange} />
                        <select name="payment" onChange={handleChange}>
                            <option value="COD">Cash on Delivery</option>
                            <option value="CARD">Card (Demo)</option>
                            <option value="UPI">UPI</option>
                        </select>
                    </div>
                    <div className="summary-content">
                        <p>Total Items: {cart.length}</p>
                        <h2>Total: $ {total.toFixed(2)}</h2>
                    </div>
                    <button
                        className="checkout-btn"
                        onClick={handlePlaceOrder}
                    >
                        Place Order
                    </button>
                </div>
            </div>

            {showModal &&
                <OrderModal
                    title="Order Confirmation"
                    message="Are you sure you want to place the order?"
                    onCancel={() => setShowModal(false)}
                    onConfirm={() => {
                        toast.success("Order placed successfully 🎉");
                        dispatch(clearCart());
                        setShowModal(false);
                        setTimeout(() => {
                            navigate('/');
                        }, 800);
                    }}
                />}

        </div>
    )
}

export default Cart