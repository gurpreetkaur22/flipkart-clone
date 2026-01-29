import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch } from "../app/store"
import type { RootState } from "../app/store";
import { useEffect, useRef, useState } from "react";
import { getCategories, getCategoryCards, getAllProducts } from "../features/products/productSlice";
import HomeCaroursel from "../components/HomeCaroursel";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { products, categories, categoryCards, loading } = useSelector(
        (state: RootState) => state.products
    );

    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);

    const scrollAmount = 600;

    const updateArrow = () => {
        const el = scrollRef.current;
        if (!el) return;

        setShowLeft(el.scrollLeft > 0);
        setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
    }

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }

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

            <div className="categories-wrapper">
                {showLeft && (
                    <button className="cat-arrow left" onClick={scrollLeft}> 
                        <FiChevronLeft/>
                    </button>
                )}
                <div className="categories" ref={scrollRef} onScroll={updateArrow}>
                    {categoryCards.map((cat) => (
                        <CategoryCard
                            key={cat.slug}
                            name={cat.name}
                            slug={cat.slug}
                            image={cat.image}
                        />
                    ))}
                </div>
                {showRight && (
                    <button className="cat-arrow right" onClick={scrollRight}> 
                        <FiChevronRight/>
                    </button>
                )}
            </div>

            <div className="sale-img">
                <img src="https://rukminim2.flixcart.com/fk-p-flap/1570/350/image/432fca89de1074cf.png?q=80" alt="" />
            </div>

            <div className="product">
                {products.map((p: any) => {
                    return <ProductCard key={p.id} product={p} />
                })}
            </div>
        </div>
    );
};

export default Home;
