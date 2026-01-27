import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import Cart from "./pages/Cart"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App