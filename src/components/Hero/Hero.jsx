import { useState } from "react"
import { Play, Info, Star, Clock } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "../../components/ui/Dialog/Dialog"
import { tmdbService } from "../../lib/tmdb"
import { formatRuntime, formatRating, formatReleaseYear, getGenreName, getYouTubeEmbedUrl } from "../../lib/utils"
import styles from "./Hero.module.css"

export function Hero({ movie, movieDetails }) {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false)

  const backdropUrl = tmdbService.getBackdropUrl(movie.backdrop_path)
  const posterUrl = tmdbService.getImageUrl(movie.poster_path, "w500")

  // Get trailer from videos if available
  const trailer = movieDetails?.videos?.results.find((video) => video.type === "Trailer" && video.site === "YouTube")

  // Get director from crew if available
  const director = movieDetails?.credits?.crew.find((person) => person.job === "Director")

  // Mock showtimes for cinema feel
  const mockShowtimes = ["14:30", "17:15", "20:00", "22:45"]

  return (
    <section className={styles.heroSection}>
      {/* Background Image with Overlay */}
      <div
        className={styles.backgroundImage}
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className={styles.overlay1} />
        <div className={styles.overlay2} />
      </div>

      {/* Content */}
      <div className={styles.contentContainer}>
        <div className={styles.gridContainer}>
          {/* Movie Poster */}
          <div className={styles.posterContainer}>
            <div className={styles.posterWrapper}>
              <img
                src={posterUrl || "/placeholder.svg"}
                alt={movie.title}
                className={styles.posterImage}
              />
              <div className={styles.posterOverlay} />
            </div>
          </div>

          {/* Movie Info */}
          <div className={styles.infoContainer}>
            {/* Title and Year */}
            <div className={styles.titleContainer}>
              <h1 className={styles.movieTitle}>
                {movie.title}
              </h1>
              <p className={styles.movieYear}>
                {formatReleaseYear(movie.release_date)}
                {director && (
                  <>
                    {" • "}
                    <span className={styles.directorText}>Dirigido por {director.name}</span>
                  </>
                )}
              </p>
            </div>

            {/* Metadata */}
            <div className={styles.metadataContainer}>
              {/* Rating */}
              <div className={styles.ratingBadge}>
                <Star className={styles.starIcon} />
                <span className={styles.ratingText}>{formatRating(movie.vote_average)}</span>
                <span className={styles.voteCount}>({movie.vote_count.toLocaleString()})</span>
              </div>

              {/* Runtime */}
              {movieDetails?.runtime && (
                <div className={styles.runtimeBadge}>
                  <Clock className={styles.clockIcon} />
                  <span className={styles.runtimeText}>{formatRuntime(movieDetails.runtime)}</span>
                </div>
              )}

              {/* Age Rating */}
              <span className={styles.ageBadge}>
                16+
              </span>
            </div>

            {/* Genres */}
            <div className={styles.genresContainer}>
              {movie.genre_ids.slice(0, 4).map((genreId) => (
                <span
                  key={genreId}
                  className={styles.genreBadge}
                >
                  {getGenreName(genreId)}
                </span>
              ))}
            </div>

            {/* Overview */}
            <p className={styles.overviewText}>{movie.overview}</p>

            {/* Showtimes */}
            <div className={styles.showtimesContainer}>
              <h3 className={styles.showtimesTitle}>Sessões de hoje:</h3>
              <div className={styles.showtimesGrid}>
                {mockShowtimes.map((time) => (
                  <span
                    key={time}
                    className={styles.showtimeBadge}
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.buttonsContainer}>
              {/* Watch Trailer Button */}
              {trailer ? (
                <Dialog open={isTrailerOpen} onOpenChange={setIsTrailerOpen}>
                  <DialogTrigger asChild>
                    <button className={styles.trailerButton}>
                      <Play className={styles.buttonIcon} />
                      Assistir Trailer
                    </button>
                  </DialogTrigger>
                  <DialogContent className={styles.dialogContent}>
                    <div className={styles.videoContainer}>
                      <iframe
                        src={getYouTubeEmbedUrl(trailer.key)}
                        title={`${movie.title} - Trailer`}
                        className={styles.videoIframe}
                        allowFullScreen
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <button disabled className={styles.disabledButton}>
                  <Play className={styles.buttonIcon} />
                  Trailer Indisponível
                </button>
              )}

              {/* More Info Button */}
              <button
                className={styles.infoButton}
                onClick={() => (window.location.href = `/movie/${movie.id}`)}
              >
                <Info className={styles.buttonIcon} />
                Ver Detalhes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className={styles.bottomGradient} />
    </section>
  )
}