export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}


export function formatRuntime(minutes) {
  if (!minutes) return "N/A";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

export function formatRating(rating) {
  return rating ? rating.toFixed(1) : "N/A";
}

export function formatReleaseYear(dateString) {
  if (!dateString) return "N/A";
  return new Date(dateString).getFullYear().toString();
}

export function formatReleaseDate(dateString) {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getYouTubeEmbedUrl(key) {
  return `https://www.youtube.com/embed/${key}?autoplay=1&rel=0`;
}

export function truncateText(text, maxLength) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

// Genre mapping for Portuguese
export const genreMap = {
  28: "Ação",
  12: "Aventura",
  16: "Animação",
  35: "Comédia",
  80: "Crime",
  99: "Documentário",
  18: "Drama",
  10751: "Família",
  14: "Fantasia",
  36: "História",
  27: "Terror",
  10402: "Música",
  9648: "Mistério",
  10749: "Romance",
  878: "Ficção Científica",
  10770: "Filme para TV",
  53: "Thriller",
  10752: "Guerra",
  37: "Faroeste",
};

export function getGenreName(genreId) {
  return genreMap[genreId] || "Desconhecido";
}