import CartPage from "./pages/CartPage";
import HomePages from "./pages/HomePages";
import { Routes, Route, useLocation } from 'react-router-dom'
import { Header } from './components/Header';
import { Footer } from './components/Footer'
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import ProductsDetailPage from "./pages/ProductDetailPage";
import ProductManagementPage from "./pages/admin/ProductManagementPage";

function App() {
  const location = useLocation();
  // console.log(location.pathname);
  return (
    <>
      {!location.pathname.startsWith("/admin") ? <Header /> : null}
      <Routes>
        <Route path="/" Component={HomePages} />
        <Route path="/cart" Component={CartPage} />
        {/* Artinya bintang (*) pada path dibawah ini, adalah semua cocok pada halaman  */}
        <Route path="*" Component={NotFoundPage} />
        <Route path="/product/:productId" Component={ProductsDetailPage} /> {/*Route Params */}
        <Route path="login" Component={LoginPage} />
        <Route path="/admin/products" Component={ProductManagementPage} />
      </Routes>
      {!location.pathname.startsWith("/admin") ? <Footer /> : null}
    </>
  );
}

export default App
