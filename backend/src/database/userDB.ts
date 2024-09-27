import { pool } from "./db";

export const getUsersDB = async () => {
  const getUsersQuery = "SELECT * FROM users";

  const result = await pool.query(getUsersQuery);
  return result.rows;
};

export const getUserDB = async (id: number) => {
  const getUserQuery = `
    SELECT * FROM users
    WHERE id = $1`;

  const result = await pool.query(getUserQuery, [id]);
  return result.rows[0];
};

export const deleteUserDB = async (id: number) => {
  const deleteUserQuery = `
    DELETE FROM users
    WHERE id = $1`;

  await pool.query(deleteUserQuery, [id]);
};
