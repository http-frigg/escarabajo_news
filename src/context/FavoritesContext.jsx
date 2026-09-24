import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useLocalStorage("escarabajo:favoritos", []);

  const value = useMemo(() => {
    const isFavorite = (id) => favoriteIds.includes(id);

    const toggleFavorite = (id) => {
      setFavoriteIds((current) =>
        current.includes(id) ? current.filter((favId) => favId !== id) : [...current, id]
      );
    };

    return { favoriteIds, isFavorite, toggleFavorite };
  }, [favoriteIds, setFavoriteIds]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
