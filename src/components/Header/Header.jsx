import { useState } from "react";
import { Link } from "react-router-dom";
import { Film, Heart, Menu, X } from "lucide-react";
import { useFavorites } from "../../store/favorites";
import styles from './Header.module.css';

export  default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { favoritesCount } = useFavorites();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <Film className={styles.logoIcon} />
          <span className={styles.logoText}>FilmFilder</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <Link to="/" className={styles.navLink}>
            Início
          </Link>
          <Link
            to="/favorites"
            className={styles.favoritesLink}
          >
            <Heart className={styles.heartIcon} />
            Favoritos
            {favoritesCount > 0 && (
              <span className={styles.favoritesBadge}>
                {favoritesCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuButton} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className={styles.menuIcon} /> : <Menu className={styles.menuIcon} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className={styles.mobileNav}>
          <nav className={styles.mobileNavContent}>
            <Link
              to="/"
              className={styles.mobileNavLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              to="/favorites"
              className={styles.mobileFavoritesLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Heart className={styles.mobileHeartIcon} />
              Favoritos
              {favoritesCount > 0 && (
                <span className={styles.mobileFavoritesBadge}>
                  {favoritesCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}