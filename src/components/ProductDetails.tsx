import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { getProductById } from '../features/products/productSlice';
import { useEffect } from 'react';
import { MdOutlineStarPurple500 } from 'react-icons/md';
import { FaShoppingCart } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import { addToCart } from '../features/cart/cartSlice';
import { toast } from 'react-toastify';
import { toggleWishlist } from '../features/wishlist/wishlistSlice';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import Loader from './Loader';

const ProductDetail = () => {

  const { slug, id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { productDetail, productsLoading } = useSelector((state: RootState) => state.products);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [id, dispatch]);


  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  )
  const wishlist = useSelector(
    (state: RootState) => state.wishlist.items
  )
  const cart = useSelector(
    (state: RootState) => state.cart
  )

  const isLiked = productDetail && wishlist.some((p: any) => p.id === productDetail?.id);
  const alreadyInCart = productDetail ? cart.some((p: any) => p.id === productDetail.id) : false;

  if (productsLoading) return <div className="loading"><Loader /></div>;
  if (!productDetail) return <div>Product not found</div>;

  const discountedPrice = productDetail.price;
  const discountPercent = productDetail.discountPercentage;

  const originalPrice =
    discountedPrice / (1 - discountPercent / 100);

  return (
    <div className="product-detail">
      <div>
        <div className='pd-img' style={{ position: 'relative' }}>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isLoggedIn) {
                toast.error("Please login to add to wishlist!");
                return;
              }
              dispatch(toggleWishlist(productDetail));
              toast.success(
                (isLiked ? "Removed from wishlist" : "Added to wishlist")
              )
            }}
            style={{ backgroundColor: 'transparent', border: 'none' }}>
            {isLiked ? <IoIosHeart className="pd-heart" /> : <IoIosHeartEmpty className="pd-heart-empty" />}
          </button>
          <img src={productDetail.thumbnail} alt={productDetail.title} />
        </div>
        <div className="btns">
          <button onClick={() => {
            if (!isLoggedIn) {
              toast.error("Please login to continue");
              navigate("/login");
              return;
            }

            if (alreadyInCart) {
              toast.info("Product already in cart");
              return;
            }
            dispatch(addToCart(productDetail));
            toast.success("Added to cart 🛒")

          }} style={{ backgroundColor: "orange", cursor: "pointer" }}><FaShoppingCart /> Add to Cart</button>
          <button onClick={() => {
            if (!isLoggedIn) {
              toast.error("Please login to continue");
              navigate("/login");
              return;
            }
            if(productDetail.stock === 0) {
              toast.error("Product is out of stock!");
            }
            if(!alreadyInCart) {
              dispatch(addToCart(productDetail));
            }
            // toast.success("Proceeding to checkout");
            navigate('/cart');
          }}

            style={{ backgroundColor: "rgb(255, 119, 0)", cursor: "pointer" }}><AiFillThunderbolt />Buy Now</button>
        </div>
      </div>

      <div className='detail-second-part'>
        <h1>{productDetail.title}</h1>
        <p className='p-desc'>{productDetail.description}</p>
        <h3 className='p-price'>${productDetail.price}  &nbsp;
          <span style={{ color: "grey", textDecoration: "line-through" }}>${originalPrice.toFixed(2)}</span>  &nbsp;
          <span>↓{productDetail.discountPercentage}%</span>
        </h3>
        <div className='tags'>
          <span style={{ color: "white" }}>{productDetail.rating} <MdOutlineStarPurple500 />
          </span>
          <span style={{ backgroundColor: "white", border: "1px solid #eeeaea" }}>Stock: {productDetail.stock}</span>
        </div>
        <h3 className='p-heading'>Product Highlights</h3>
        <div className="product-info">
          <p><strong>Brand:</strong> {productDetail.brand}</p>
          <p><strong>Category:</strong> {productDetail.category}</p>
          <p><strong>SKU:</strong> {productDetail.sku}</p>
          <p><strong>Availability:</strong> {productDetail.availabilityStatus}</p>
          <p><strong>Warranty:</strong> {productDetail.warrantyInformation}</p>
          <p><strong>Return Policy:</strong> {productDetail.returnPolicy}</p>
          <p><strong>Shipping:</strong> {productDetail.shippingInformation}</p>
          <p><strong>Minimum Order:</strong> {productDetail.minimumOrderQuantity}</p>
        </div>
        <div className="dimensions">
          <p>
            <strong>Dimensions:</strong>{" "}
            {productDetail.dimensions.width} ×{" "}
            {productDetail.dimensions.height} ×{" "}
            {productDetail.dimensions.depth} cm
          </p>
          <p><strong>Weight:</strong> {productDetail.weight} kg</p>
        </div>
        <div className="tags">
          {productDetail.tags.map((tag: string) => (
            <span key={tag} style={{ backgroundColor: "#eeeaea" }} className="tag">{tag}</span>
          ))}
        </div>
        <div className="reviews">
          <h3 className='p-heading'>Customer Reviews</h3>

          {productDetail.reviews.map((r: any, index: number) => (
            <div key={index} className="review">
              <strong>{r.reviewerName}</strong>
              <span className="review-rating">
                {r.rating} <MdOutlineStarPurple500 />
              </span>
              <p>{r.comment}</p>
              <small>{new Date(r.date).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail