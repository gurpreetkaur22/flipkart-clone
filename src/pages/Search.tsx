import type { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { useEffect } from "react";
import { setSearchQuery } from "../features/products/productSlice";

const Search = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { products, searchQuery, productsLoading } = useSelector(
    (state: RootState) => state.products
  );

  const results = products.filter((p: any) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    }
  }, [dispatch])

  if (productsLoading) return <h2>Searching...</h2>;

  return (
    <div className="product">
      {results.length ? (
        results.map((p: any) => <ProductCard key={p.id} product={p} />)
      ) : (
        <div className="no-products">
          <h3>No results for “{searchQuery}”</h3>
        </div>
      )}
    </div>
  );
};

export default Search;