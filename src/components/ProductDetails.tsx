import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { getProductById } from '../features/products/productSlice';
import { useEffect } from 'react';

const ProductDetail = () => {

  const { slug, id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { productDetail, loading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [id, dispatch]);

  if (loading) return <div className="loading">Loading Product...</div>;
  if (!productDetail) return <div>Product not found</div>;

  return (
    <div className="product-detail">
      <div>
        <div className='pd-img'>
          <img src={productDetail.thumbnail} alt={productDetail.title} />
        </div>
        <div className='tags'>
          <span style={{ color: "white" }}>⭐️ {productDetail.rating}</span>
          <span style={{ backgroundColor: "white", border: "1px solid #eeeaea" }}>Stock: {productDetail.stock}</span>
        </div>
      </div>
      <div className='detail-second-part'>
        <h1>{productDetail.title}</h1>
        <p>{productDetail.description}</p>
        <h3><span>↓{productDetail.discountPercentage}%</span>  ${productDetail.price}</h3>
        <div className="btns">
          <button>Add to Cart</button>
          <button style={{ backgroundColor: "rgb(250, 196, 4)" }}>Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail