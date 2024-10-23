import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { iconLogin } from "../../Routes";
import styles from "./modal.module.css";
import { useLogout } from "../../api/auth";

export const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { mutate: logout } = useLogout();

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    window.addEventListener("resize", closeModal);

    return () => {
      window.removeEventListener("resize", closeModal);
    };
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <section>
      <button className={styles.menuUser} onClick={toggleModal}>
        <img className={styles.menuIconUser} src={iconLogin} alt="login icon" />
      </button>

      <ul className={`${styles.modal} ${isModalOpen ? styles.modalOpen : ""}`}>
        <li className={styles.modalItem}>
          <NavLink
            className={styles.modalItemText}
            to={"/profile"}
            onClick={closeModal}
          >
            Profile
          </NavLink>
        </li>
        <li className={styles.modalItem}>
          <NavLink
            className={styles.modalItemText}
            to={"/orders"}
            onClick={closeModal}
          >
            Orders
          </NavLink>
        </li>
        <li className={styles.modalItem}>
          <p className={styles.modalItemText} onClick={() => logout()}>
            Logout
          </p>
        </li>
      </ul>

      <span
        className={`${styles.modalBackdrop} ${
          isModalOpen ? styles.modalBackdropVisible : ""
        }`}
        onClick={closeModal}
      ></span>
    </section>
  );
};
