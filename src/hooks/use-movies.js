import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { tmdbService } from "../lib/tmdb";

// Hook for trending movies (hero section)
export function useTrendingMovies(timeWindow = "week") {
  return useQuery({
    queryKey: ["trending", timeWindow],
    queryFn: () => tmdbService.getTrending(timeWindow),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook for movie search with pagination
export function useSearchMovies(query, page = 1) {
  return useQuery({
    queryKey: ["search", query, page],
    queryFn: () => tmdbService.searchMovies(query, page),
    enabled: query.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook for movie details
export function useMovieDetails(id) {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => tmdbService.getMovieDetails(id),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}

// Hook for popular movies with pagination
export function usePopularMovies(page = 1) {
  return useQuery({
    queryKey: ["popular", page],
    queryFn: () => tmdbService.getPopularMovies(page),
    staleTime: 10 * 60 * 1000,
  });
}

// Hook for top rated movies
export function useTopRatedMovies(page = 1) {
  return useQuery({
    queryKey: ["top-rated", page],
    queryFn: () => tmdbService.getTopRatedMovies(page),
    staleTime: 30 * 60 * 1000, // 30 minutes (changes less frequently)
  });
}

// Hook for now playing movies
export function useNowPlayingMovies(page = 1) {
  return useQuery({
    queryKey: ["now-playing", page],
    queryFn: () => tmdbService.getNowPlayingMovies(page),
    staleTime: 5 * 60 * 1000,
  });
}

// Hook for upcoming movies
export function useUpcomingMovies(page = 1) {
  return useQuery({
    queryKey: ["upcoming", page],
    queryFn: () => tmdbService.getUpcomingMovies(page),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
}

// Infinite query hook for endless scrolling (optional)
export function useInfiniteMovies(category) {
  return useInfiniteQuery({
    queryKey: ["infinite", category],
    queryFn: ({ pageParam = 1 }) => {
      switch (category) {
        case "popular":
          return tmdbService.getPopularMovies(pageParam);
        case "top_rated":
          return tmdbService.getTopRatedMovies(pageParam);
        case "now_playing":
          return tmdbService.getNowPlayingMovies(pageParam);
        case "upcoming":
          return tmdbService.getUpcomingMovies(pageParam);
        default:
          throw new Error(`Unknown category: ${category}`);
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 10 * 60 * 1000,
  });
}