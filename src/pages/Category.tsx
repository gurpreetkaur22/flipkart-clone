import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../app/store";
import { useEffect, useState } from "react";
import { clearProducts, getProductsByCategory } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";

const Category = () => {
    const { slug } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const { products, loading, searchQuery } = useSelector(
        (state: RootState) => state.products
    );

    // 🔹 FILTER STATE
    const [maxPrice, setMaxPrice] = useState(2000);
    const [minRating, setMinRating] = useState(0);

    useEffect(() => {
        if (slug) dispatch(getProductsByCategory(slug));

        return () => {
            dispatch(clearProducts());
        };
    }, [slug, dispatch]);

    // 🔹 APPLY FILTERS
    const filteredProducts = products.filter((p: any) => {
        const matchesPrice = p.price <= maxPrice;
        const matchesRating = p.rating >= minRating;
        const matchesSearch = p.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
        return matchesPrice && matchesRating && matchesSearch;
    });

    return (
        <div className="category-page">
            <h1>{slug?.toUpperCase()}</h1>

            <div className="category-layout">
                {/* filters */}
                <aside className="filters">
                    <h3>Filters</h3>

                    <div className="filter-box-price">
                        <label>Max Price: ${maxPrice}</label>
                        <input
                            type="range"
                            min="0"
                            max="5000"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(+e.target.value)}
                        />
                    </div>

                    <div className="filter-box-rating">
                        <label>Rating</label>
                        <select onChange={(e) => setMinRating(+e.target.value)}>
                            <option value={0}>All</option>
                            <option value={3}>3★ & above</option>
                            <option value={4}>4★ & above</option>
                        </select>
                    </div>
                </aside>

                {/* products */}
                {loading ? (
                    <div className="loading">
                        <h2>Loading Products...</h2>
                    </div>
                ) : (
                    <div className="product category-products">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((p: any) => (
                                <ProductCard key={p.id} product={p} />
                            ))
                        ) : (
                            <div className="no-products">
                                <h3>No products found</h3>
                                <p>Try adjusting your filters.</p>
                            </div>
                        )}
                    </div>

                )}
            </div>
        </div>
    );
};

export default Category;
