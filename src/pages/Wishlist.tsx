import type { RootState } from "../app/store";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
    const wishlist = useSelector((state: RootState) => state.wishlist.items);

    if (!wishlist.length) return <h1 style={{ textAlign: 'center', marginTop: '10%' }}>No items in wishlist</h1>;

    return (
        <div>
            <h1 style={{backgroundColor: 'white', textAlign:'center', padding: '.5em', marginTop: '.5em'}}>Wishlist</h1>
            <div className="product">
                {wishlist.map((p: any) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </div>
    );
};

export default Wishlist;