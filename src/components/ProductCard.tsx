import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { toast } from "react-toastify";
import type { RootState } from "../app/store";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";

const ProductCard = ({ product }: any) => {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);
  const { slug } = useParams();

  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  )
  const wishlist = useSelector(
    (state: RootState) => state.wishlist.items
  )

  const cart = useSelector(
    (state: RootState) => state.cart
  )

  const isLiked = product && wishlist.some((p: any) => p.id === product?.id);
  const alreadyInCart = cart.some((p: any) => p.id === product.id);

  const currentSlug = slug || product.category;

  const discountedPrice = product.price;
  const discountPercent = product.discountPercentage;

  const originalPrice =
    discountedPrice / (1 - discountPercent / 100);

  return (

    <div className={`product-card ${showDetails ? "show-details" : ""}`}>
      {/* expanding background */}
      <span className="reveal-bg" />

      {/* 3 dots */}
      {!showDetails && (
        <div
          className="details-icon"
          onClick={(e) => {
            e.stopPropagation();
            setShowDetails(true);
          }}
        >
          <BsThreeDotsVertical />
        </div>
      )}

      {/* close */}
      {showDetails && (
        <div
          className="close-icon"
          onClick={(e) => {
            e.stopPropagation();
            setShowDetails(false);
          }}
        >
          <MdClose />
        </div>
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          if (!isLoggedIn) {
            toast.error("Please login to add to wishlist!");
            return;
          }
          dispatch(toggleWishlist(product));
          toast.success(
            (isLiked ? "Removed from wishlist" : "Added to wishlist")
          )
        }}
        style={{ backgroundColor: 'transparent', border:'none', cursor:"pointer" }}>
        {isLiked ? <IoIosHeart className="heart" /> : <IoIosHeartEmpty className="heart-empty" />}
      </button>

      <Link to={`/category/${currentSlug}/${product.id}`}
        className="card-link"
        style={{ textDecoration: 'none', color: 'inherit' }}>

        {/* FRONT CONTENT */}
        <div className="card-front">
          <div className="product-image">
            <img src={product.thumbnail} alt={product.title} />
          </div>

          <div className="product-content">
            <h4 className="truncate" title={product.title}>{product.title}</h4>
            <p className="truncate-desc" style={{ fontSize: '.8em' }} title={product.description}>{product.description}</p>
            <div className='tags'>
              <span style={{ color: "white" }}>{product.rating} <MdOutlineStarPurple500 />
              </span>
              <span style={{ backgroundColor: "white", border: "1px solid #eeeaea" }}>Stock: {product.stock}</span>
            </div>
            <p className="price">$ {product.price} &nbsp;
              <span style={{ color: "grey", textDecoration: "line-through", fontSize: '.8em' }}>${originalPrice.toFixed(2)}</span> &nbsp;
              <span style={{ fontSize: '.8em', color: "green" }}>{product.discountPercentage}%</span></p>
          </div>
        </div>

        {/* DETAILS CONTENT */}
        <div className="card-back">
          <h4>Description</h4>
          <div className="tags">
            {product.tags.map((tag: string) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          <h5 style={{margin:0, textAlign:'center'}}>Brand: {(product.brand) ? product.brand : product.category}</h5>
          <p className="truncate-back" title={product.description}>{product.description}</p>
          <button className="detail-btn">Check in detail</button>
        </div></Link>


      <button className="cart-btn"
        onClick={(e) => {
          e.stopPropagation();
          if (alreadyInCart) {
            toast.info("Product already in cart");
            return;
          }
          dispatch(addToCart(product));
          toast.success("Added to cart 🛒");
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
