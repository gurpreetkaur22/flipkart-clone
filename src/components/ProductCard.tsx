import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProductCard = ({ product }: any) => {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);
  const { slug } = useParams();
  const currentSlug = slug || product.category;

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

      <Link to={`/category/${currentSlug}/${product.id}`}
        className="card-link"
        style={{ textDecoration: 'none', color: 'inherit' }}>

        {/* FRONT CONTENT */}
        <div className="card-front">
          <div className="product-image">
            <img src={product.thumbnail} alt={product.title} />
          </div>

          <div className="product-content">
            <h4 className="truncate">{product.title}</h4>
            <p className="price">$ {product.price}</p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(addToCart(product));
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* DETAILS CONTENT */}
        <div className="card-back">
          <h4>Description</h4>
          <p>{product.description}</p>
          <button style={{backgroundColor: "green"}}>Check in detail</button>
        </div></Link>
    </div>
  );
};

export default ProductCard;
