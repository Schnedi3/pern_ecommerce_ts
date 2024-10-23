import { pool } from "./db";

export const addOrderDB = async (
  cartId: number,
  userId: number,
  addressId: number,
  amount: number,
  paymentMethod: string,
  date: Date,
  sessionId: string
) => {
  const checkSessionQuery = `
    SELECT id FROM "order"
    WHERE session_id = $1`;

  const { rows: existingOrder } = await pool.query(checkSessionQuery, [
    sessionId,
  ]);

  if (existingOrder.length > 0) {
    return existingOrder[0];
  }

  const addOrderQuery = `
    INSERT INTO "order" (user_id, address_id, amount, payment_method, date, session_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`;

  const { rows: result } = await pool.query(addOrderQuery, [
    userId,
    addressId,
    amount,
    paymentMethod,
    date,
    sessionId,
  ]);

  const addOrderItemQuery = `
    INSERT INTO order_item (order_id, product_id, quantity, size)
    SELECT $1, product_id, quantity, size
    FROM cart_item
    WHERE cart_id = $2
    RETURNING *`;

  await pool.query(addOrderItemQuery, [result[0].id, cartId]);
  return result[0];
};

export const getOrdersDB = async () => {
  const getOrdersQuery = `
    SELECT 
      -- order details
      o.id AS order_id,
      o.amount AS order_amount,
      o.payment_method,
      o.status AS order_status,
      o.date AS order_date,
      
      -- user details
      u.id AS user_id,
      u.username,
      u.email,

      -- address details
      a.first_name,
      a.last_name,
      a.phone,
      a.street,
      a.number,
      a.door,
      a.city,
      a.state,
      a.zip_code,
      
      -- product details array
      array_agg(
        json_build_object(
          'id', p.id,
          'images', p.images,
          'title', p.title,
          'price', p.price,
          'quantity', oi.quantity,
          'size', oi.size
        )
      ) AS products
    FROM "order" o
    LEFT JOIN "user" u ON o.user_id = u.id
    LEFT JOIN address a ON o.address_id = a.id
    LEFT JOIN order_item oi ON o.id = oi.order_id
    LEFT JOIN product p ON oi.product_id = p.id
    GROUP BY 
      o.id,
      u.id,
      u.username,
      u.email,
      a.first_name,
      a.last_name,
      a.phone,
      a.street,
      a.number,
      a.door,
      a.city,
      a.state,
      a.zip_code
    ORDER BY o.id`;

  const result = await pool.query(getOrdersQuery);
  return result.rows;
};

export const getUserOrdersDB = async (userId: number) => {
  const getUserOrdersQuery = `
    SELECT
      -- order details
      o.id AS order_id,
      o.amount AS order_amount,
      o.status AS order_status,
      o.date AS order_date,

      -- product details array
      array_agg(
        json_build_object(
          'id', p.id,
          'title', p.title,
          'price', p.price,
          'images', p.images,
          'quantity', oi.quantity,
          'size', oi.size
        )
      ) AS products
    FROM "order" o
    LEFT JOIN order_item oi ON o.id = oi.order_id
    LEFT JOIN product p ON oi.product_id = p.id
    WHERE o.user_id = $1
    GROUP BY o.id
    ORDER BY o.id`;

  const result = await pool.query(getUserOrdersQuery, [userId]);
  return result.rows;
};

export const updateStatusDB = async (status: string, id: number) => {
  const getOrderQuery = `
    UPDATE "order"
    SET status = $1
    WHERE id = $2
    RETURNING *`;

  const result = await pool.query(getOrderQuery, [status, id]);
  return result.rows[0];
};

export const deleteOrderDB = async (id: number) => {
  const deleteOrderQuery = `
    DELETE FROM "order"
    WHERE id = $1`;

  await pool.query(deleteOrderQuery, [id]);
};
