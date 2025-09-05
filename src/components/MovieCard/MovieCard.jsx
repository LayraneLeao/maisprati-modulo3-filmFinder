import { useState } from "react";
import { Star, Heart, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { tmdbService } from "../../lib/tmdb";
import { formatRating, formatReleaseYear, getGenreName, truncateText } from "../../lib/utils";
import styles from './MovieCard.module.css';

export function MovieCard({ movie, onFavoriteToggle, isFavorite = false }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const posterUrl = tmdbService.getImageUrl(movie.poster_path, "w500");
  const year = formatReleaseYear(movie.release_date);
  const rating = formatRating(movie.vote_average);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onFavoriteToggle) {
      onFavoriteToggle(movie.id);
    }
  };

  const handleDetailsClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
      className={styles.cardContainer}
    >
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          {/* Movie Poster */}
          <div className={styles.posterContainer}>
            {!imageError ? (
              <img
                src={posterUrl || "/placeholder.svg"}
                alt={movie.title}
                className={`${styles.posterImage} ${imageLoaded ? styles.imageLoaded : styles.imageLoading}`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className={styles.posterFallback}>
                <div className={styles.fallbackContent}>
                  <div className={styles.fallbackIcon}>
                    <span className={styles.emoji}>🎬</span>
                  </div>
                  <p className={styles.fallbackText}>{movie.title}</p>
                </div>
              </div>
            )}

            {/* Loading skeleton */}
            {!imageLoaded && !imageError && <div className={styles.loadingSkeleton} />}
          </div>

          {/* Overlay with actions */}
          <div className={styles.overlay}>
            <div className={styles.actionsContainer}>
              <div className={styles.actionsButtons}>
                <button
                  onClick={handleDetailsClick}
                  className={styles.detailsButton}
                >
                  <Info className={styles.buttonIcon} />
                  Detalhes
                </button>
                <button
                  onClick={handleFavoriteClick}
                  className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
                >
                  <Heart className={`${styles.heartIcon} ${isFavorite ? styles.heartFilled : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Rating Badge */}
          <div className={styles.ratingBadge}>
            <span className={styles.ratingContent}>
              <Star className={styles.starIcon} />
              {rating}
            </span>
          </div>

          {/* Favorite indicator */}
          {isFavorite && (
            <div className={styles.favoriteIndicator}>
              <div className={styles.favoriteCircle}>
                <Heart className={styles.favoriteHeartIcon} />
              </div>
            </div>
          )}
        </div>

        <div className={styles.cardContent}>
          {/* Title and Year */}
          <div className={styles.titleContainer}>
            <h3 className={styles.movieTitle} title={movie.title}>
              {truncateText(movie.title, 50)}
            </h3>
            <p className={styles.movieYear}>{year}</p>
          </div>

          {/* Genres */}
          <div className={styles.genresContainer}>
            {movie.genre_ids && movie.genre_ids.slice(0, 2).map((genreId) => (
              <span
                key={genreId}
                className={styles.genreBadge}
              >
                {getGenreName(genreId)}
              </span>
            ))}
          </div>

          {/* Overview */}
          {movie.overview && (
            <p className={styles.movieOverview}>
              {truncateText(movie.overview, 120)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}