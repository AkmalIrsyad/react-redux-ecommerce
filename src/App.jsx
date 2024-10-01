import CartPage from "./pages/CartPage";
import HomePages from "./pages/HomePages";
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header';
import { Footer } from './components/Footer'
import NotFoundPage from "./pages/NotFoundPage";

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" Component={HomePages} />
        <Route path="/cart" Component={CartPage} />
        {/* Artinya bintang (*) pada path dibawah ini, adalah semua cocok pada halaman  */}
        <Route path="*" Component={NotFoundPage} />
      </Routes>
      <Footer />
    </>
  );
}

export default App
