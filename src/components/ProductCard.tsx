import { useDispatch } from "react-redux"
import { addToCart } from "../features/cart/cartSlice";

const ProductCard = ({product} : any) => {

    const dispatch = useDispatch();

  return (
    <div className="product-card">
        <img src={product.image} alt="" />
        <h4 className="truncate" title={product.title}>{product.title}</h4>
        <p>$ {product.price}</p>

        <button onClick={() => dispatch(addToCart(product))}>
            Add to Cart
        </button>
    </div>
  )
}

export default ProductCard