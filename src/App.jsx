import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "./components/Header/Header.jsx";
import { Footer } from "./components/Footer/Footer.jsx";
import { Home } from "./pages/Home/Home.jsx";
import { Explorar } from "./pages/Explorar/Explorar.jsx";
import { Detalle } from "./pages/Detalle/Detalle.jsx";
import { Favoritos } from "./pages/Favoritos/Favoritos.jsx";
import { Contacto } from "./pages/Contacto/Contacto.jsx";
import { Crear } from "./pages/Crear/Crear.jsx";
import { FavoritesProvider } from "./context/FavoritesContext.jsx";
import { ExperienciasProvider } from "./context/ExperienciasContext.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <ExperienciasProvider>
      <FavoritesProvider>
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explorar" element={<Explorar />} />
            <Route path="/experiencia/:id" element={<Detalle />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/crear" element={<Crear />} />
          </Routes>
        </main>
        <Footer />
      </FavoritesProvider>
    </ExperienciasProvider>
  );
}
