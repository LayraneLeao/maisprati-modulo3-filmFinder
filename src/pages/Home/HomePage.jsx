import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import Header  from "../../components/Header/Header"
import { Hero } from "../../components/Hero/Hero"
import { HeroSkeleton } from "../../components/HeroSkeleton/HeroSkeleton"
import { SearchBar } from "../../components/SearchBar/SearchBar"
import { FilterBar } from "../../components/FilterBar/FilterBar"
import { MovieGrid } from "../../components/MovieGrid/MovieGrid"
import { Pagination } from "../../components/Pagination/Pagination"
import { useFavorites } from "../../store/favorites"
import { toast } from "../../hooks/use-toast"
import {
  useTrendingMovies,
  useMovieDetails,
  useSearchMovies,
  usePopularMovies,
  useTopRatedMovies,
  useNowPlayingMovies,
  useUpcomingMovies,
} from "../../hooks/use-movies"
import styles from "./HomePage.module.css"

function HeroSection() {
  const { data: trendingData, isLoading: isTrendingLoading, error: trendingError } = useTrendingMovies("week")
  const featuredMovie = trendingData?.results?.[0]

  const { data: movieDetails, isLoading: isDetailsLoading } = useMovieDetails(featuredMovie?.id || 0)

  if (isTrendingLoading) {
    return <HeroSkeleton />
  }

  if (trendingError || !featuredMovie) {
    return (
      <section className={styles.errorSection}>
        <div className={styles.errorContent}>
          <h2 className={styles.errorTitle}>Erro ao carregar filmes</h2>
          <p className={styles.errorMessage}>
            Não foi possível carregar os filmes em destaque. Verifique sua conexão e tente novamente.
          </p>
          <button
            onClick={() => window.location.reload()}
            className={styles.retryButton}
          >
            Tentar Novamente
          </button>
        </div>
      </section>
    )
  }

  return <Hero movie={featuredMovie} movieDetails={isDetailsLoading ? undefined : movieDetails} />
}

function MovieSection() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("query") || ""
  const page = Number.parseInt(searchParams.get("page") || "1", 10)
  const sort = searchParams.get("sort") || "popular"

  const { toggleFavorite, favoriteIds } = useFavorites()

  const { data: searchData, isLoading: isSearchLoading, error: searchError } = useSearchMovies(query, page)
  const { data: popularData, isLoading: isPopularLoading } = usePopularMovies(page)
  const { data: topRatedData, isLoading: isTopRatedLoading } = useTopRatedMovies(page)
  const { data: nowPlayingData, isLoading: isNowPlayingLoading } = useNowPlayingMovies(page)
  const { data: upcomingData, isLoading: isUpcomingLoading } = useUpcomingMovies(page)

  let currentData, isLoading, error

  if (query) {
    currentData = searchData
    isLoading = isSearchLoading
    error = searchError
  } else {
    switch (sort) {
      case "top_rated":
        currentData = topRatedData
        isLoading = isTopRatedLoading
        break
      case "now_playing":
        currentData = nowPlayingData
        isLoading = isNowPlayingLoading
        break
      case "upcoming":
        currentData = upcomingData
        isLoading = isUpcomingLoading
        break
      default:
        currentData = popularData
        isLoading = isPopularLoading
    }
  }

  const handleFavoriteToggle = (movieId) => {
    const movie = currentData?.results?.find((m) => m.id === movieId)
    if (movie) {
      const wasFavorite = favoriteIds.has(movieId)
      toggleFavorite(movie)

      toast({
        title: wasFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos",
        description: wasFavorite
          ? `${movie.title} foi removido da sua lista de favoritos.`
          : `${movie.title} foi adicionado à sua lista de favoritos.`,
        duration: 3000,
      })
    }
  }

  const getSectionTitle = () => {
    if (query) return `Resultados para "${query}"`

    switch (sort) {
      case "top_rated":
        return "Filmes Mais Bem Avaliados"
      case "now_playing":
        return "Filmes em Cartaz"
      case "upcoming":
        return "Filmes em Breve"
      default:
        return "Filmes Populares"
    }
  }

  const getEmptyMessage = () => {
    if (query) return `Nenhum resultado encontrado para "${query}"`
    return "Nenhum filme encontrado"
  }

  if (error) {
    return (
      <section className={styles.movieSection}>
        <div className={styles.errorContent}>
          <h2 className={styles.errorTitle}>Erro ao carregar filmes</h2>
          <p className={styles.errorMessage}>
            Não foi possível carregar os filmes. Verifique sua conexão e tente novamente.
          </p>
          <button
            onClick={() => window.location.reload()}
            className={styles.retryButton}
          >
            Tentar Novamente
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.movieSection}>
      {/* Search Bar */}
      <SearchBar />

      {/* Section Title and Filters */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{getSectionTitle()}</h2>
        {!query && <FilterBar />}
      </div>

      {/* Movie Grid */}
      <MovieGrid
        movies={currentData?.results || []}
        isLoading={isLoading}
        emptyMessage={getEmptyMessage()}
        onFavoriteToggle={handleFavoriteToggle}
        favoriteIds={favoriteIds}
      />

      {/* Pagination */}
      {currentData && currentData.total_pages > 1 && (
        <Pagination
          currentPage={currentData.page}
          totalPages={Math.min(currentData.total_pages, 500)}
        />
      )}

      {/* Results Info */}
      {currentData?.results && currentData.results.length > 0 && (
        <div className={styles.resultsInfo}>
          Mostrando {currentData.results.length} de {currentData.total_results?.toLocaleString() || 0} filmes
          {currentData.total_pages &&
            currentData.total_pages > 1 &&
            ` • Página ${currentData.page} de ${Math.min(currentData.total_pages, 500)}`}
        </div>
      )}
    </section>
  )
}

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simula loading inicial
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <main className={styles.main}>
        <Header />
        <HeroSkeleton />
        <div className={styles.loadingFallback}>
          <div className={styles.loadingText}>Carregando...</div>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <Header />
      <HeroSection />
      <MovieSection />
    </main>
  )
}