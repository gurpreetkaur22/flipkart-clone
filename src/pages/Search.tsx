import type { RootState } from "../app/store";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

const Search = () => {
    const { products, searchQuery, loading } = useSelector(
      (state: RootState) => state.products
    );
  
    const results = products.filter((p: any) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    if (loading) return <h2>Searching...</h2>;
  
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