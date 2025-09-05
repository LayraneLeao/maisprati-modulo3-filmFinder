const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const TMDB_API_KEY = "SUA_CHAVE_API"; // ← Substitua pela sua chave

class TMDBService {
  constructor() {
    this.apiKey = TMDB_API_KEY;
  }

  async fetchFromTMDB(endpoint) {
    try {
      const separator = endpoint.includes('?') ? '&' : '?';
      const url = `${TMDB_BASE_URL}${endpoint}${separator}api_key=${this.apiKey}&language=pt-BR`;
      console.log(`Fetching from TMDB: ${url}`);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching from TMDB:', error);
      throw error;
    }
  }

  async getTrending(timeWindow = "week") {
    return this.fetchFromTMDB(`/trending/movie/${timeWindow}`);
  }

  async searchMovies(query, page = 1) {
    const encodedQuery = encodeURIComponent(query);
    return this.fetchFromTMDB(`/search/movie?query=${encodedQuery}&page=${page}`);
  }

  async getMovieDetails(id) {
    return this.fetchFromTMDB(`/movie/${id}?append_to_response=credits,videos`);
  }

  async getPopularMovies(page = 1) {
    return this.fetchFromTMDB(`/movie/popular?page=${page}`);
  }

  async getTopRatedMovies(page = 1) {
    return this.fetchFromTMDB(`/movie/top_rated?page=${page}`);
  }

  async getNowPlayingMovies(page = 1) {
    return this.fetchFromTMDB(`/movie/now_playing?page=${page}`);
  }

  async getUpcomingMovies(page = 1) {
    return this.fetchFromTMDB(`/movie/upcoming?page=${page}`);
  }

  // Image URL helpers
  getImageUrl(path, size = "w500") {
    if (!path) return "/abstract-movie-poster.png";
    return `${TMDB_IMAGE_BASE_URL}${size}${path}`;
  }

  getBackdropUrl(path, size = "original") {
    if (!path) return "/movie-backdrop.png";
    return `${TMDB_IMAGE_BASE_URL}${size}${path}`;
  }

  getProfileUrl(path, size = "w185") {
    if (!path) return "/diverse-person-profiles.png";
    return `${TMDB_IMAGE_BASE_URL}${size}${path}`;
  }
}

// Export singleton instance
export const tmdbService = new TMDBService();

// Export individual functions for convenience
export const {
  getTrending,
  searchMovies,
  getMovieDetails,
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  getImageUrl,
  getBackdropUrl,
  getProfileUrl,
} = tmdbService;