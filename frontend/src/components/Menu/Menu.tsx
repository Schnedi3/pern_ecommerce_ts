import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { useAuthContext } from "../../context/useAuthContext";
import { useShopContext } from "../../context/useShopContext";
import { iconCart, iconClose, iconLogin, iconMenu } from "../../Routes";
import { Modal } from "./Modal";
import styles from "./menu.module.css";

export const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const { itemsInCart } = useShopContext();
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    window.addEventListener("resize", closeMenu);

    return () => {
      window.removeEventListener("resize", closeMenu);
    };
  }, []);

  return (
    <nav className={styles.menu}>
      <Link to="/" className={styles.menuTitle}>
        Shopify
      </Link>

      <ul
        className={`${styles.menuLinks} ${isMenuOpen ? styles.mobileMenu : ""}`}
      >
        <img
          className={styles.menuIconClose}
          onClick={closeMenu}
          src={iconClose}
          alt="close menu"
        />
        <li>
          <NavLink className={styles.menuLink} to="/" onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={styles.menuLink}
            to="/contact"
            onClick={closeMenu}
          >
            Contact
          </NavLink>
        </li>
      </ul>

      <article className={styles.menuUserCart}>
        {!isAuthenticated ? (
          <Link to="/login">
            <img
              className={styles.menuIconUser}
              src={iconLogin}
              alt="login icon"
            />
          </Link>
        ) : (
          <Modal />
        )}
        <Link className={styles.menuCart} to="/cart">
          <img className={styles.menuIconCart} src={iconCart} alt="cart icon" />
          <span className={styles.menuBadge}>{itemsInCart}</span>
        </Link>
        <img
          className={styles.mobileMenuIcon}
          src={iconMenu}
          alt="mobile menu icon"
          onClick={toggleMenu}
        />
      </article>
    </nav>
  );
};
