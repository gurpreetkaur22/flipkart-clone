import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch } from "../app/store"
import type { RootState } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import { getProducts } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";

const Home = () => {

    const dispatch = useDispatch<AppDispatch>();
    const {products, loading} = useSelector(
        (state: RootState) => state.products
    )
    console.log(products);

    useEffect(()=> {
        dispatch(getProducts());
    }, [])

    if(loading) return <div className="loading"><h2>Loading...</h2></div>

  return (
    <div className="product">
        {products.map((p : any) => {
            return <ProductCard key={p.id} product={p}/>
        })}
    </div>
  )
}

export default Home