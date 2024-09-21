import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { usersRequest, removeUserRequest } from "../../api/users";
import { IUser } from "../../types/types";

import iconRemove from "../../assets/images/remove.svg";
import "./users.css";

export const Users = () => {
  const [list, setList] = useState<IUser[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await usersRequest();

      if (response.data.success) {
        setList(response.data.rows);
      } else {
        toast.error(response.data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeUser = async (id: number) => {
    try {
      const response = await removeUserRequest(id);

      if (response.data.success) {
        setList(list.filter((user) => user.id !== id));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <section className="list container">
      <h2>All users</h2>
      <ul className="users">
        {list.map((user) => (
          <li className="info" key={user.id}>
            <h3>{user.id}</h3>
            <h3>{user.username}</h3>
            <h4>{user.email}</h4>
            <p>{user.role}</p>
            <img
              src={iconRemove}
              alt="remove product"
              onClick={() => removeUser(user.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
