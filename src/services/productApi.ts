import axios from "axios"

export const fetchCategories = async () => {
    const res = await axios.get("https://dummyjson.com/products/categories");
    return res.data;
}

export const fetchProductByCategory = async (category: string) => {
    const res = await axios.get(`https://dummyjson.com/products/category/${category}`);
    return res.data.products;
}

export const fetchProductById = async (id: string) => {
    const res = await axios.get(`https://dummyjson.com/products//${id}`);
    return res.data;
}

export const fetchAllProducts = async () => {
    const res = await axios.get("https://dummyjson.com/products");
    return res.data.products;
}