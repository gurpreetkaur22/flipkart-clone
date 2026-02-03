import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import Cart from "./pages/Cart"
import Search from "./pages/Search"
import Navbar from "./components/Navbar"
import { ToastContainer } from "react-toastify"
import Category from "./pages/Category"
import ProductDetails from "./components/ProductDetails"
import Wishlist from "./pages/Wishlist"
import Footer from "./components/Footer"

const App = () => {
  return (
    <BrowserRouter>

      {/* LAYOUT WRAPPER */}
      <div className="app-container">

        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/category/:slug/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<Search />} />
            <Route path="/wishlist" element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            } />
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
            />
          </Routes>
        </div>

        <Footer />

      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />

    </BrowserRouter>
  )
}

export default App