import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { useAuthContext } from "../../context/useAuthContext";

import { iconClose, iconMenu } from "../../Routes";
import styles from "./menu.module.css";

export const Menu = () => {
  const { isAuthenticated, logout } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    window.addEventListener("resize", closeMenu);

    return () => {
      window.removeEventListener("resize", closeMenu);
    };
  }, []);

  return (
    isAuthenticated && (
      <nav className={styles.menu}>
        <Link to={"/"}>
          <h2 className={styles.menuTitle}>Shopify</h2>
          <h3 className={styles.menuSubtitle}>admin panel</h3>
        </Link>

        <img
          className={styles.menuOpen}
          src={iconMenu}
          alt="menu icon"
          onClick={openMenu}
        />

        <ul
          className={`${styles.menuLinks} ${
            isMenuOpen ? styles.menuLinksVisible : ""
          }`}
        >
          <img
            className={styles.menuClose}
            onClick={closeMenu}
            src={iconClose}
            alt="close menu"
          />
          <li>
            <NavLink className={styles.menuLink} to="/" onClick={closeMenu}>
              New Product
            </NavLink>
          </li>
          <li>
            <NavLink
              className={styles.menuLink}
              to="/products"
              onClick={closeMenu}
            >
              Manage Products
            </NavLink>
          </li>
          <li>
            <NavLink
              className={styles.menuLink}
              to="/orders"
              onClick={closeMenu}
            >
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              className={styles.menuLink}
              to="/users"
              onClick={closeMenu}
            >
              Manage Users
            </NavLink>
          </li>
          <li className={styles.logout}>
            <p onClick={logout}>Logout</p>
          </li>
        </ul>
      </nav>
    )
  );
};
