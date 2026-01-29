import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import Cart from "./pages/Cart"
import Navbar from "./components/Navbar"
import { ToastContainer } from "react-toastify"
import Category from "./pages/Category"
import ProductDetails from "./components/ProductDetails"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/category/:slug/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App