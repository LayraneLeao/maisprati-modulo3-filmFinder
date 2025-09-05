// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import  HomePage  from "./pages/Home/HomePage";
import FavoritesPage  from "./pages/Favorites/FavoritesPage";
import  MovieDetailsPage  from "./pages/MovieDetails/MovieDetailsPage";
import  ToastProvider  from "./providers/ToastProvider";
import "./App.css";

// Cria uma instância do QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos padrão
      retry: 1, // Tentar apenas 1 vez em caso de erro
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <Router>
        
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
          </Routes>
        </Router>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;