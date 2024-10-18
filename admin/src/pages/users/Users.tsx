import { useDeleteUser, useUsers } from "../../api/users";
import { IUser } from "../../types/types";
import { iconDelete, iconUser, Title } from "../../Routes";
import styles from "./users.module.css";

export const Users = () => {
  const { data: users, error, isLoading } = useUsers();
  const { mutate: deleteUser } = useDeleteUser();

  if (!users || users.length === 0 || error || isLoading) {
    return (
      <section className={styles.empty}>
        <img className={styles.emptyIcon} src={iconUser} alt="" />
        <p className={styles.emptyText}>No data available</p>
      </section>
    );
  }

  return (
    <section className={styles.users}>
      <Title title="Users" />
      <ul className={styles.usersList}>
        {users.map((user: IUser) => (
          <li className={styles.user} key={user.id}>
            <h3>{user.id}</h3>
            <h3>{user.username}</h3>
            <h4>{user.email}</h4>
            <p>{user.role}</p>
            <img
              className={styles.userDelete}
              src={iconDelete}
              alt="remove product"
              onClick={() => deleteUser(user.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
