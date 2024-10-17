import { pool } from "./db";

export const createGoogleUserDB = async (
  name: string,
  email: string,
  googleId: string
) => {
  const username = name;
  const createUserQuery = `
    INSERT INTO "user" (username, email, google_id, password)
    VALUES ($1, $2, $3, NULL)
    ON CONFLICT (email) DO UPDATE
    SET google_id = EXCLUDED.google_id
    RETURNING *`;

  const result = await pool.query(createUserQuery, [username, email, googleId]);
  return result.rows[0];
};

export const loginDB = async (email: string) => {
  const loginQuery = `
    SELECT * FROM "user"
    WHERE email = $1`;

  const result = await pool.query(loginQuery, [email]);
  return result.rows[0];
};

export const registerDB = async (
  username: string,
  email: string,
  hashedPassword: string
) => {
  const registerQuery = `
    INSERT INTO "user" (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING *`;

  const result = await pool.query(registerQuery, [
    username,
    email,
    hashedPassword,
  ]);

  return result.rows[0];
};

export const resetPasswordDB = async (
  hashedPassword: string,
  email: string
) => {
  const registerQuery = `
    UPDATE "user"
    SET password = $1
    WHERE email = $2`;

  await pool.query(registerQuery, [hashedPassword, email]);
};
