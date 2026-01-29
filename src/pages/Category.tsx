import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import type { AppDispatch } from "../app/store";
import type { RootState } from "../app/store";
import { useEffect } from "react";
import { clearProducts, getProductsByCategory } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";

const Category = () => {

    const { slug } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const { products, loading } = useSelector(
        (state: RootState) => state.products
    )

    useEffect(() => {
        if (slug) {
            dispatch(getProductsByCategory(slug));
        }
        return () => {
            dispatch(clearProducts());
        };
    }, [slug, dispatch])

    return (
        <div className="category-page">
            <h1>{slug?.toUpperCase()}</h1>
            {loading ? (
                <div className="loading">
                    {/* You can replace this with a nice Spinner component */}
                    <h2>Loading Products...</h2>
                </div>
            ) : (
                <div className="product">
                    {products.map((p: any) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            )}
        </div>
  )
}

export default Category