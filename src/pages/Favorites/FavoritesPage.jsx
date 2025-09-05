import { useState, useEffect } from "react"
import  Header  from "../../components/Header/Header"
import { MovieGrid } from "../../components/MovieGrid/MovieGrid"
import { useFavorites } from "../../store/favorites"
import { Heart, Trash2 } from "lucide-react"
import styles from "./FavoritesPage.module.css"

function FavoritesContent() {
  const { favorites, clearFavorites, toggleFavorite, favoriteIds } = useFavorites()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simula loading inicial
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleFavoriteToggle = (movieId) => {
    const movie = favorites.find((m) => m.id === movieId)
    if (movie) {
      toggleFavorite(movie)
    }
  }

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingText}>Carregando favoritos...</div>
      </div>
    )
  }

  if (favorites.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyContent}>
          <div className={styles.emptyIcon}>
            <Heart className={styles.heartIcon} />
          </div>
          <div className={styles.emptyText}>
            <h2 className={styles.emptyTitle}>Nenhum favorito ainda</h2>
            <p className={styles.emptyDescription}>
              Explore nossa coleção de filmes e adicione seus favoritos para vê-los aqui.
            </p>
          </div>
          <button
            onClick={() => (window.location.href = "/")} 
            className={styles.discoverButton}
          >
            Descobrir Filmes
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.content}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Meus Favoritos</h1>
          <p className={styles.subtitle}>
            {favorites.length} {favorites.length === 1 ? "filme" : "filmes"} na sua lista de favoritos
          </p>
        </div>
        {favorites.length > 0 && (
          <button
            variant="outline"
            onClick={clearFavorites}
            className={styles.clearButton}
          >
            <Trash2 className={styles.trashIcon} />
            Limpar Todos
          </button>
        )}
      </div>

      {/* Movies Grid */}
      <MovieGrid
        movies={favorites}
        onFavoriteToggle={handleFavoriteToggle}
        favoriteIds={favoriteIds}
        emptyMessage="Nenhum filme nos favoritos"
      />
    </div>
  )
}

export default function FavoritesPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <FavoritesContent />
      </main>
    </div>
  )
}