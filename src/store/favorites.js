import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],
      favoriteIds: new Set(),

      addFavorite: (movie) => {
        const { favorites, favoriteIds } = get()
        if (!favoriteIds.has(movie.id)) {
          const newFavorites = [...favorites, movie]
          const newFavoriteIds = new Set(favoriteIds)
          newFavoriteIds.add(movie.id)

          set({
            favorites: newFavorites,
            favoriteIds: newFavoriteIds,
          })
        }
      },

      removeFavorite: (movieId) => {
        const { favorites, favoriteIds } = get()
        if (favoriteIds.has(movieId)) {
          const newFavorites = favorites.filter((movie) => movie.id !== movieId)
          const newFavoriteIds = new Set(favoriteIds)
          newFavoriteIds.delete(movieId)

          set({
            favorites: newFavorites,
            favoriteIds: newFavoriteIds,
          })
        }
      },

      toggleFavorite: (movie) => {
        const { isFavorite, addFavorite, removeFavorite } = get()
        if (isFavorite(movie.id)) {
          removeFavorite(movie.id)
        } else {
          addFavorite(movie)
        }
      },

      isFavorite: (movieId) => {
        return get().favoriteIds.has(movieId)
      },

      clearFavorites: () => {
        set({
          favorites: [],
          favoriteIds: new Set(),
        })
      },
    }),
    {
      name: "cinema-app-favorites",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        favorites: state.favorites,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Rebuild favoriteIds Set from favorites array after hydration
          state.favoriteIds = new Set(state.favorites.map((movie) => movie.id))
        }
      },
    },
  ),
)

// Custom hook for easier usage
export function useFavorites() {
  const store = useFavoritesStore()

  return {
    favorites: store.favorites,
    favoriteIds: store.favoriteIds,
    addFavorite: store.addFavorite,
    removeFavorite: store.removeFavorite,
    toggleFavorite: store.toggleFavorite,
    isFavorite: store.isFavorite,
    clearFavorites: store.clearFavorites,
    favoritesCount: store.favorites.length,
  }
}