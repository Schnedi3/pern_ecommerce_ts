import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { IUser } from "../../types/types";
import {
  deleteUserRequest,
  getUsersRequest,
  iconDelete,
  Title,
} from "../../Routes";
import styles from "./users.module.css";

export const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const getUsers = async () => {
    try {
      const { data } = await getUsersRequest();

      if (!data.success) {
        console.log(data.message);
      }

      setUsers(data.result);
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Unexpected error");
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const { data } = await deleteUserRequest(id);

      if (!data.success) {
        console.log(data.message);
      }

      setUsers(users.filter((user) => user.id !== id));
      toast.success(data.message);
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Unexpected error");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <section className={styles.users}>
      <Title title="Users" />
      <ul className={styles.usersList}>
        {users.map((user) => (
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
