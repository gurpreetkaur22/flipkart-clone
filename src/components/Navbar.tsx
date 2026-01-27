import type { RootState } from "@reduxjs/toolkit/query"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../features/auth/authSlice"
import { BsCart3 } from "react-icons/bs";
import { PiUserCircle } from "react-icons/pi";

const Navbar = () => {

    const cartCount = useSelector(
        (state: RootState) => state.cart.length
    )

    const isLoggedIn = useSelector(
        (state: RootState) => state.auth.isLoggedIn
    )

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    }

    return (
        <nav>
            <Link to="/" className="logo"> Flipkart </Link>
            <div>
                {!isLoggedIn ?
                    <Link to="/login" className="login"> <PiUserCircle /> <span>Login</span> </Link>
:
<button className="logout-btn" onClick={handleLogout}>Logout</button>                            }
                <Link to="/cart" className="cart"> <BsCart3 /><span>({cartCount})</span></Link>
            </div>
        </nav>
    )
}

export default Navbar