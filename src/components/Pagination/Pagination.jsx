// components/Pagination.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import styles from './Pagination.module.css';

export function Pagination({ currentPage, totalPages, maxVisiblePages = 5 }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigateToPage = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    setSearchParams(params);
  };

  const getVisiblePages = () => {
    const pages = [];
    const half = Math.floor(maxVisiblePages / 2);

    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages();

  return (
    <div className={styles.pagination}>
      {/* Previous Button */}
      <button
        onClick={() => navigateToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className={styles.navButton}
      >
        <ChevronLeft className={styles.navIcon} />
        Anterior
      </button>

      {/* First page */}
      {visiblePages[0] > 1 && (
        <>
          <button
            onClick={() => navigateToPage(1)}
            className={1 === currentPage ? styles.pageButtonActive : styles.pageButton}
          >
            1
          </button>
          {visiblePages[0] > 2 && <span className={styles.ellipsis}>...</span>}
        </>
      )}

      {/* Visible pages */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => navigateToPage(page)}
          className={page === currentPage ? styles.pageButtonActive : styles.pageButton}
        >
          {page}
        </button>
      ))}

      {/* Last page */}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className={styles.ellipsis}>...</span>
          )}
          <button
            onClick={() => navigateToPage(totalPages)}
            className={totalPages === currentPage ? styles.pageButtonActive : styles.pageButton}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => navigateToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={styles.navButton}
      >
        Próxima
        <ChevronRight className={styles.navIcon} />
      </button>
    </div>
  );
}