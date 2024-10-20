import { useState } from "react";

import { useCart } from "../../api/cart";
import { useAddress } from "../../api/address";
import { useCodOrder } from "../../api/order";
import { useCreateCheckoutSession } from "../../api/payment";
import { IAddress, ICartItem } from "../../types/types";
import { formatCurrency } from "../../helpers/formatCurrency";
import { AddressModal, iconAddress, Title } from "../../Routes";
import { imagesURL } from "../config";
import styles from "./checkout.module.css";

export const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isAddAddress, setIsAddAddress] = useState<boolean>(false);
  const { data: cart } = useCart();
  const { data: addressList, error, isLoading } = useAddress();
  const { mutate: addCodOrder } = useCodOrder();
  const { mutate: createCheckoutSession } = useCreateCheckoutSession();

  const totalAmount = cart?.reduce(
    (acc: number, product: ICartItem) => acc + product.price * product.quantity,
    0
  );

  const handleStripeCheckout = () => {
    createCheckoutSession({
      cart,
      shippingAddress,
      totalAmount,
      paymentMethod,
    });
  };

  const handleCodCheckout = () => {
    addCodOrder({ shippingAddress, totalAmount, paymentMethod });
  };

  if (!addressList || !cart || error || isLoading) return <p>No data</p>;

  return (
    <section className={styles.order}>
      <article className={styles.cart}>
        <Title title="Summary" />
        {cart.map((product: ICartItem) => (
          <div className={styles.product} key={product.product_id}>
            <img
              className={styles.productImage}
              src={`${imagesURL}/${product.images[0]}`}
              alt={product.title}
            />
            <h3>{product.title}</h3>
            <p>{product.quantity}</p>
            <p>{product.size}</p>
            <p>{formatCurrency(product.price)}</p>
          </div>
        ))}

        <div className={styles.total}>
          <p className={styles.shipping}>
            Shipping <span>Free</span>
          </p>
          <h3 className={styles.totalAmount}>
            Total <span>{formatCurrency(totalAmount)}</span>
          </h3>
        </div>
      </article>

      <article className={styles.payment}>
        <Title title="Payment method" />
        <div className={styles.paymentInfo}>
          <label className={styles.paymentLabel}>
            <input
              className={styles.paymentRadio}
              type="radio"
              name="paymentMethod"
              onChange={() => setPaymentMethod("stripe")}
            />
            Stripe
          </label>
          <label className={styles.paymentLabel}>
            <input
              className={styles.paymentRadio}
              type="radio"
              name="paymentMethod"
              value="cod"
              onChange={() => setPaymentMethod("cod")}
            />
            Cash on delivery
          </label>
        </div>
      </article>

      <article className={styles.addresses}>
        <Title title="Delivery address" />
        <div className={styles.addressInfo}>
          {addressList.map((address: IAddress) => (
            <label className={styles.addressLabel} key={address.first_name}>
              <input
                className={styles.addressRadio}
                type="radio"
                name="address"
                onChange={() => setShippingAddress(address.id)}
              />
              <h4 className={styles.name}>
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
                <span className={styles.span}>Phone number:</span>{" "}
                {address.phone}
              </p>
            </label>
          ))}
        </div>
      </article>

      <button
        className={styles.addAddress}
        onClick={() => setIsAddAddress(true)}
      >
        <img
          className={styles.addAddressIcon}
          src={iconAddress}
          alt="add new address"
        />
        Add new address
      </button>

      {isAddAddress && (
        <AddressModal
          isAddAddress={isAddAddress}
          setIsAddAddress={setIsAddAddress}
        />
      )}

      <button
        className={`dark_button ${
          paymentMethod === "" || shippingAddress === 0
            ? "dark_button-disabled"
            : ""
        }`}
        onClick={
          paymentMethod === "cod" ? handleCodCheckout : handleStripeCheckout
        }
      >
        {paymentMethod === "cod" ? "Place order" : "Go to Payment"}
      </button>
    </section>
  );
};
