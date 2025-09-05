import { useState } from "react";
import { ArrowLeft, Play, Heart, Star, Clock, Calendar, Globe, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useMovieDetails } from "../../hooks/use-movies";
import { useFavorites } from "../../store/favorites";
import { toast } from "../../hooks/use-toast";
import { tmdbService } from "../../lib/tmdb";
import { formatRuntime, formatRating, formatReleaseDate, getYouTubeEmbedUrl, truncateText } from "../../lib/utils";
import styles from './MovieDetailsContent.module.css';

export function MovieDetailsContent() {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const movieId = parseInt(id);
  
  const { data: movie, isLoading, error } = useMovieDetails(movieId);

  const { toggleFavorite, isFavorite } = useFavorites();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  if (isLoading) {
    return <div>Loading...</div> // This will be replaced by skeleton
  }

  if (error || !movie) {
    return (
      <div className={styles.minHScreenFlex}>
        <div className={styles.textCenterSpaceY4}>
          <h1 className={styles.text2xl}>Erro ao carregar filme</h1>
          <p className={styles.textMutedForeground}>Não foi possível carregar os detalhes do filme. Tente novamente.</p>
          <div className={styles.flexGap4}>
            <button onClick={() => window.location.reload()} className={styles.buttonPrimary}>
              Tentar Novamente
            </button>
            <button onClick={handleGoHome} className={styles.buttonOutline}>
              Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    );
  }

  const backdropUrl = tmdbService.getBackdropUrl(movie.backdrop_path);
  const posterUrl = tmdbService.getImageUrl(movie.poster_path, "w500");

  // Get trailer from videos
  const trailer = movie.videos?.results.find((video) => video.type === "Trailer" && video.site === "YouTube");

  // Get director and main cast
  const director = movie.credits?.crew.find((person) => person.job === "Director");
  const mainCast = movie.credits?.cast.slice(0, 8) || [];

  // Get certification (age rating)
  const usCertification = movie.release_dates?.results
    .find((release) => release.iso_3166_1 === "US")
    ?.release_dates.find((date) => date.certification)?.certification;

  const handleFavoriteToggle = () => {
    const wasFavorite = isFavorite(movie.id);
    toggleFavorite(movie);

    toast({
      title: wasFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos",
      description: wasFavorite
        ? `${movie.title} foi removido da sua lista de favoritos.`
        : `${movie.title} foi adicionado à sua lista de favoritos.`,
      duration: 3000,
    });
  };

  const isMovieFavorite = isFavorite(movie.id);

  return (
    <div className={styles.minHScreen}>
      {/* Hero Header */}
      <section className={styles.relativeMinH60vh}>
        {/* Background Image */}
        <div
          className={styles.absoluteBgCover}
          style={{ backgroundImage: `url(${backdropUrl})` }}
        >
          <div className={styles.absoluteGradient1} />
          <div className={styles.absoluteGradient2} />
        </div>

        {/* Back Button */}
        <div className={styles.absoluteTop6Left6}>
          <button
            onClick={handleBackClick}
            className={styles.backButton}
          >
            <ArrowLeft className={styles.w4H4} />
            Voltar
          </button>
        </div>

        {/* Content */}
        <div className={styles.heroContent}>
          <div className={styles.gridContainer}>
            {/* Movie Poster */}
            <div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={styles.posterContainer}
            >
              <img
                src={posterUrl || "/placeholder.svg"}
                alt={movie.title}
                className={styles.posterImage}
              />
            </div>

            {/* Movie Info */}
            <div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={styles.movieInfo}
            >
              {/* Title and Tagline */}
              <div className={styles.titleContainer}>
                <h1 className={styles.movieTitle}>{movie.title}</h1>
                {movie.tagline && <p className={styles.tagline}>"{movie.tagline}"</p>}
              </div>

              {/* Metadata */}
              <div className={styles.metadataContainer}>
                {/* Rating */}
                <div className={styles.metadataItem}>
                  <Star className={styles.starIcon} />
                  <span className={styles.ratingText}>{formatRating(movie.vote_average)}</span>
                  <span className={styles.voteCount}>({movie.vote_count.toLocaleString()})</span>
                </div>

                {/* Runtime */}
                {movie.runtime && (
                  <div className={styles.metadataItem}>
                    <Clock className={styles.metadataIcon} />
                    <span className={styles.metadataText}>{formatRuntime(movie.runtime)}</span>
                  </div>
                )}

                {/* Release Date */}
                <div className={styles.metadataItem}>
                  <Calendar className={styles.metadataIcon} />
                  <span className={styles.metadataText}>{formatReleaseDate(movie.release_date)}</span>
                </div>

                {/* Certification */}
                {usCertification && (
                  <span className={styles.certificationBadge}>
                    {usCertification}
                  </span>
                )}
              </div>

              {/* Genres */}
              <div className={styles.genresContainer}>
                {movie.genres.map((genre) => (
                  <span key={genre.id} className={styles.genreBadge}>
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className={styles.actionsContainer}>
                {/* Watch Trailer Button */}
                {trailer ? (
                  <>
                    <button 
                      onClick={() => setIsTrailerOpen(true)}
                      className={styles.primaryButton}
                    >
                      <Play className={styles.buttonIcon} />
                      Assistir Trailer
                    </button>
                    
                    {/* Modal for trailer */}
                    {isTrailerOpen && (
                      <div className={styles.modalOverlay} onClick={() => setIsTrailerOpen(false)}>
                        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                          <div className={styles.videoContainer}>
                            <iframe
                              src={getYouTubeEmbedUrl(trailer.key)}
                              title={`${movie.title} - Trailer`}
                              className={styles.trailerIframe}
                              allowFullScreen
                            />
                            <button 
                              className={styles.closeButton}
                              onClick={() => setIsTrailerOpen(false)}
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <button disabled className={styles.disabledButton}>
                    <Play className={styles.buttonIcon} />
                    Trailer Indisponível
                  </button>
                )}

                {/* Favorite Button */}
                <button
                  onClick={handleFavoriteToggle}
                  className={isMovieFavorite ? styles.favoriteButtonActive : styles.favoriteButton}
                >
                  <Heart className={`${styles.buttonIcon} ${isMovieFavorite ? styles.heartFilled : ''}`} />
                  {isMovieFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className={styles.detailsSection}>
        <div className={styles.detailsGrid}>
          {/* Main Content */}
          <div className={styles.mainContent}>
            {/* Synopsis */}
            <div className={styles.synopsisContainer}>
              <h2 className={styles.sectionTitle}>Sinopse</h2>
              <p className={styles.synopsisText}>
                {movie.overview || "Sinopse não disponível."}
              </p>
            </div>

            {/* Cast */}
            {mainCast.length > 0 && (
              <div className={styles.castContainer}>
                <h2 className={styles.sectionTitle}>Elenco Principal</h2>
                <div className={styles.castGrid}>
                  {mainCast.map((actor) => (
                    <div
                      key={actor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className={styles.actorCard}
                    >
                      <div className={styles.actorImageContainer}>
                        <img
                          src={tmdbService.getProfileUrl(actor.profile_path, "w185") || "/placeholder.svg"}
                          alt={actor.name}
                          className={styles.actorImage}
                        />
                      </div>
                      <div className={styles.actorInfo}>
                        <p className={styles.actorName}>{actor.name}</p>
                        <p className={styles.actorCharacter}>{truncateText(actor.character, 30)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            {/* Movie Info */}
            <div className={styles.infoCard}>
              <h3 className={styles.sidebarTitle}>Informações</h3>

              {/* Director */}
              {director && (
                <div className={styles.infoItem}>
                  <p className={styles.infoLabel}>
                    <Users className={styles.infoIcon} />
                    Direção
                  </p>
                  <p className={styles.infoText}>{director.name}</p>
                </div>
              )}

              {/* Status */}
              <div className={styles.infoItem}>
                <p className={styles.infoLabel}>Status</p>
                <p className={styles.infoText}>{movie.status || "Não informado"}</p>
              </div>

              {/* Original Language */}
              <div className={styles.infoItem}>
                <p className={styles.infoLabel}>
                  <Globe className={styles.infoIcon} />
                  Idioma Original
                </p>
                <p className={styles.infoText}>{movie.original_language?.toUpperCase() || "N/A"}</p>
              </div>

              {/* Budget */}
              {movie.budget > 0 && (
                <div className={styles.infoItem}>
                  <p className={styles.infoLabel}>Orçamento</p>
                  <p className={styles.infoText}>
                    ${movie.budget.toLocaleString("en-US")}
                  </p>
                </div>
              )}

              {/* Revenue */}
              {movie.revenue > 0 && (
                <div className={styles.infoItem}>
                  <p className={styles.infoLabel}>Bilheteria</p>
                  <p className={styles.infoText}>
                    ${movie.revenue.toLocaleString("en-US")}
                  </p>
                </div>
              )}
            </div>

            {/* Production Companies */}
            {movie.production_companies.length > 0 && (
              <div className={styles.infoCard}>
                <h3 className={styles.sidebarTitle}>Produção</h3>
                <div className={styles.companiesList}>
                  {movie.production_companies.slice(0, 5).map((company) => (
                    <div key={company.id} className={styles.companyItem}>
                      {company.logo_path && (
                        <img
                          src={tmdbService.getImageUrl(company.logo_path, "w92") || "/placeholder.svg"}
                          alt={company.name}
                          className={styles.companyLogo}
                        />
                      )}
                      <div>
                        <p className={styles.companyName}>{company.name}</p>
                        <p className={styles.companyCountry}>{company.origin_country}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}