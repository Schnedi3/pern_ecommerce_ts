import { useCartContext } from "../../context/useCartContext";

import { iconCart, iconRemove } from "../../UIIcons";
import "./cart.css";

export const Cart = () => {
  const { cart, updateQuantity, deleteProduct, totalCart } = useCartContext();

  return cart.length === 0 ? (
    <img className="cart_empty" src={iconCart} alt="" />
  ) : (
    <section className="cart_container container">
      <h2>Cart</h2>

      {cart.map((item) => (
        <article className="item_info" key={item.id}>
          <img className="item_photo" src={item.thumbnail} alt={item.title} />
          <h3 className="item_title">{item.title}</h3>
          <input
            type="number"
            id="quantity"
            min={1}
            defaultValue={item.quantity}
            onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
          />
          <p>${item.price}</p>
          <img
            className="item_remove"
            src={iconRemove}
            alt="remove product"
            onClick={() => deleteProduct(item.id)}
          />
        </article>
      ))}

      <article className="cart_total">
        <h2>Total</h2>
        <div className="total_info">
          <p>
            Subtotal <span>${totalCart().toFixed(2)}</span>
          </p>
          <p>
            Shipping fee <span>Free</span>
          </p>
          <h3>
            Total <span>${totalCart().toFixed(2)}</span>
          </h3>
        </div>
        <button className="cart_pay">proceed to checkout</button>
      </article>
    </section>
  );
};
