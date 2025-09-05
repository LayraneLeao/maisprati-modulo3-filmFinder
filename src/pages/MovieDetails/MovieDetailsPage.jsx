import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { MovieDetailsContent } from "../../components/MovieDetailsContent/MovieDetailsContent"
import { MovieDetailsSkeleton } from "../../components/MovieDetailsSkeleton/MovieDetailsSkeleton"
import styles from "./MovieDetailsPage.module.css"

export default function MovieDetailsPage() {
  const { id } = useParams()
  const movieId = Number.parseInt(id, 10)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simula loading inicial
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  if (!movieId || Number.isNaN(movieId)) {
    return (
      <main className={styles.main}>
        <div className={styles.errorContainer}>
          <h1 className={styles.errorTitle}>Filme não encontrado</h1>
          <p className={styles.errorMessage}>O ID do filme fornecido é inválido.</p>
          <button
            onClick={() => (window.location.href = "/")}
            className={styles.homeButton}
          >
            Voltar ao Início
          </button>
        </div>
      </main>
    )
  }

  if (isLoading) {
    return (
      <main className={styles.main}>
        <MovieDetailsSkeleton />
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <MovieDetailsContent movieId={movieId} />
    </main>
  )
}