import type { AppDispatch, RootState } from "../app/store"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../features/auth/authSlice"
import { BsCart3 } from "react-icons/bs";
import { PiUserCircle } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { useState } from "react";
import { getAllProducts, searchAllProducts, setSearchQuery } from "../features/products/productSlice";
import type { Root } from "react-dom/client";
import { toast } from "react-toastify";

const Navbar = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState(false);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(setSearchQuery(value));
      
        if (value.trim().length > 1) {
          dispatch(searchAllProducts(value));
          navigate('/search');
        }
      };
      

    const cartCount = useSelector(
        (state: RootState) => state.cart.length
    )

    const likedCount = useSelector(
        (state: RootState) => state.wishlist.items.length
    )

    const isLoggedIn = useSelector(
        (state: RootState) => state.auth.isLoggedIn
    )

    const searchQuery = useSelector(
        (state: RootState) => state.products.searchQuery
    )

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
        toast.success("User logged out successfully!")
    }

    return (
        <nav>
            <Link to="/" className="logo"> Flipkart </Link>

            {/* search */}
            <div className={`search-box ${showSearch ? 'active' : ''}`}>
                <input type="text" placeholder="Search products..." value={searchQuery} onChange={handleSearch} />
                <FiSearch className="search" onClick={() => {
                    setShowSearch(!showSearch);
                    if(showSearch) {
                        setSearchQuery("");
                    }
                }} />
            </div>

            <div>
                <Link to="/wishlist" className="nav-wishlist"> <IoIosHeartEmpty style={{color: 'black', fontSize:'1.7em', paddingTop:'.3em'}}/><span className="likes-count">{likedCount}</span></Link>
                <Link to="/cart" className="cart"> <BsCart3 /><span className="count">{cartCount}</span></Link>
                {!isLoggedIn ?
                    <Link to="/login" className="login"> <PiUserCircle /> <span>Login</span> </Link>
                    :
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>}
            </div>
        </nav>
    )
}

export default Navbar