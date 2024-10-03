import { useState } from "react";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

import { useCartContext } from "../../context/useCartContext";
import { useAddress } from "../../hooks/useAddress";
import { formatCurrency } from "../../helpers/formatCurrency";
import { AddressModal, iconAddress } from "../../Routes";

import "./summary.css";
import "../globals.css";
import { createCheckoutSessionRequest } from "../../api/payment";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const OrderSummary = () => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [orderAddress, setOrderAddress] = useState<number>(0);

  const { cart, totalAmount } = useCartContext();
  const { addresses, isModalOpen, setIsModalOpen } = useAddress();

  const handleCheckout = async () => {
    if (!paymentMethod) {
      toast.error("Please select payment method");
      return;
    }

    if (!orderAddress) {
      toast.error("Please select an address");
      return;
    }

    setLoading(true);
    try {
      const stripe = await stripePromise;

      const response = await createCheckoutSessionRequest(
        cart,
        orderAddress,
        totalAmount,
        paymentMethod
      );

      if (response.data.success) {
        stripe &&
          (await stripe.redirectToCheckout({ sessionId: response.data.id }));
      } else {
        toast.error(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("Failed to redirect to Stripe Checkout");
      setLoading(false);
    }
  };

  return (
    <section className="place_order container">
      <article className="cart_summary">
        <h2>Summary</h2>
        {cart.map((item, index) => (
          <div className="product" key={index}>
            <img src={item.images[0]} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.quantity}</p>
            <p>{item.size}</p>
            <p>{formatCurrency(item.price)}</p>
          </div>
        ))}

        <div className="total">
          <p>
            Shipping <span>Free</span>
          </p>
          <h3>
            Total <span>{formatCurrency(totalAmount)}</span>
          </h3>
        </div>
      </article>

      <article className="payment">
        <h2>Payment method</h2>
        <div>
          <label>
            <input
              type="radio"
              name="payment_method"
              onChange={() => setPaymentMethod("stripe")}
            />
            Stripe
          </label>
          <label>
            <input
              type="radio"
              name="payment_method"
              value="cod"
              onChange={() => setPaymentMethod("cod")}
            />
            Cash on delivery
          </label>
        </div>
      </article>

      <article className="addresses">
        <h2>Delivery address</h2>
        {addresses.map((address) => (
          <label className="label" key={address.first_name}>
            <input
              type="radio"
              className="radio"
              name="address"
              onChange={() => setOrderAddress(address.id)}
            />
            <h4>
              {address.first_name} {address.last_name}
            </h4>
            <p>
              {address.street}, {address.number}
            </p>
            <p>{address.door}</p>
            <p>{address.city}</p>
            <p>
              {address.state}, {address.zip_code}
            </p>
            <p>
              <span>Phone number:</span> {address.phone}
            </p>
          </label>
        ))}
        <button className="new_address" onClick={() => setIsModalOpen(true)}>
          <img src={iconAddress} alt="add new address" />
          Add new address
        </button>
      </article>

      {isModalOpen && <AddressModal />}

      <button
        className="dark_button"
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? "Processing..." : "Go to Checkout"}
      </button>
    </section>
  );
};
