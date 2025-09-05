import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from './FilterBar.module.css';

export function FilterBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentSort, setCurrentSort] = useState("popular");

  // Extrai os parâmetros de busca da URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sortParam = searchParams.get("sort");
    if (sortParam) {
      setCurrentSort(sortParam);
    } else {
      setCurrentSort("popular");
    }
  }, [location.search]);

  const handleSortChange = (value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("sort", value);
    searchParams.set("page", "1"); // Reset to first page when changing sort
    
    // Atualiza a URL sem recarregar a página
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterOptions}>
        <span className={styles.filterLabel}>Ordenar por:</span>
        <div className={styles.selectContainer}>
          <select 
            value={currentSort} 
            onChange={(e) => handleSortChange(e.target.value)}
            className={styles.select}
          >
            <option value="popular">Popularidade</option>
            <option value="top_rated">Melhor Avaliação</option>
            <option value="now_playing">Em Cartaz</option>
            <option value="upcoming">Em Breve</option>
          </select>
          <div className={styles.selectArrow}>▼</div>
        </div>
      </div>
    </div>
  );
}