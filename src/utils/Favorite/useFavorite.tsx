/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

export default function useFavorite() {
  const [favorites, setFavorites] = useState(() => {
    const ls = localStorage.getItem('favorites');
    if (ls) return JSON.parse(ls);
    else return [];
  });

  const handleFavorites = (article: any) => {
    const isFavorite = favorites.some((item: any) => item.id === article.id);
    if (isFavorite)
      setFavorites((prev: any) => prev.filter((e: any) => e.id !== article.id));
    else setFavorites((prev: any) => [...prev, article]);
  };

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return [favorites, handleFavorites];
}
