import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch } from "../app/store"
import type { RootState } from "../app/store";
import { useEffect } from "react";
import { getCategories, getCategoryCards, getAllProducts } from "../features/products/productSlice";
import HomeCaroursel from "../components/HomeCaroursel";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { products, categories, categoryCards, loading } = useSelector(
        (state: RootState) => state.products
    );

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getAllProducts());
    }, [dispatch]);

    useEffect(() => {
        if (categories.length) {
            dispatch(getCategoryCards(categories));
        }
    }, [categories]);

    if (loading) {
        return (
            <div className="loading">
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
        <div className="home-page">
            <div className="carousel">
                <HomeCaroursel />
            </div>

            <div className="categories">
                {categoryCards.map((cat) => (
                    <CategoryCard
                        key={cat.slug}
                        name={cat.name}
                        slug={cat.slug}
                        image={cat.image}
                    />
                ))}
            </div>

            <div className="sale-img">
                <img src="https://rukminim2.flixcart.com/fk-p-flap/1570/350/image/432fca89de1074cf.png?q=80" alt="" />
            </div>

            <div className="product">
                {products.map((p: any) => {
                    return <ProductCard key={p.id} product={p}/>
                })}
            </div>
        </div>
    );
};

export default Home;
