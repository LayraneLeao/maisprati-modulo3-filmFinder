import { MovieCard } from "../MovieCard/MovieCard";
import { MovieCardSkeleton } from "../MovieCardSkeleton/MovieCardSkeleton";
import styles from './MovieGrid.module.css';

export function MovieGrid({
  movies,
  isLoading = false,
  onFavoriteToggle,
  favoriteIds = new Set(),
  emptyMessage = "Nenhum filme encontrado",
}) {
  if (isLoading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 12 }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <span className={styles.emoji}>🎬</span>
        </div>
        <h3 className={styles.emptyTitle}>{emptyMessage}</h3>
        <p className={styles.emptyDescription}>
          Tente ajustar sua busca ou explore nossa seleção de filmes populares.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onFavoriteToggle={onFavoriteToggle}
          isFavorite={favoriteIds.has(movie.id)}
        />
      ))}
    </div>
  );
}