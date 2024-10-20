import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUpdateAddress } from "../../api/address";
import { Button, iconClose, Title } from "../../Routes";
import { IAddress } from "../../types/types";
import { addressSchema } from "../../schemas/schemas";
import styles from "./address.module.css";

interface IAddressProps {
  isEditAddress: boolean;
  setIsEditAddress: (isEditAddress: boolean) => void;
  addressData: IAddress | undefined;
}

export const AddressUpdate = ({
  isEditAddress,
  setIsEditAddress,
  addressData,
}: IAddressProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddress>({
    resolver: zodResolver(addressSchema),
    defaultValues: addressData,
  });
  const { mutate: updateAddress, data } = useUpdateAddress();

  const onSubmit = async (address: IAddress) => {
    if (addressData) {
      const { id } = addressData;
      updateAddress({ address, id });
    }
  };

  if (data?.data.success) {
    setIsEditAddress(false);
  }

  useEffect(() => {
    if (isEditAddress) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isEditAddress]);

  return (
    <section className={styles.modal}>
      <button
        className={styles.closeModal}
        onClick={() => setIsEditAddress(false)}
      >
        <img className={styles.closeIcon} src={iconClose} alt="close modal" />
      </button>

      <form
        className={styles.form}
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Title title="Update adddress" />

        <article className={styles.article}>
          <label className={styles.label}>
            First name
            {errors.first_name && (
              <span className={styles.error}>{errors.first_name.message}</span>
            )}
            <input
              type="text"
              className={`${styles.input} ${
                errors.first_name ? styles.inputError : ""
              }`}
              placeholder="John"
              {...register("first_name")}
            />
          </label>
          <label className={styles.label}>
            Last name
            {errors.last_name && (
              <span className={styles.error}>{errors.last_name.message}</span>
            )}
            <input
              type="text"
              className={`${styles.input} ${
                errors.last_name ? styles.inputError : ""
              }`}
              placeholder="Doe"
              {...register("last_name")}
            />
          </label>
        </article>

        <article className={styles.article}>
          <label className={styles.label}>
            Phone
            {errors.phone && (
              <span className={styles.error}>{errors.phone.message}</span>
            )}
            <input
              type="tel"
              className={`${styles.input} ${
                errors.phone ? styles.inputError : ""
              }`}
              placeholder="678 901 234"
              {...register("phone")}
            />
          </label>
        </article>

        <article className={styles.article}>
          <label className={styles.label}>
            Street
            {errors.street && (
              <span className={styles.error}>{errors.street.message}</span>
            )}
            <input
              type="text"
              className={`${styles.input} ${
                errors.street ? styles.inputError : ""
              }`}
              placeholder="Fake St"
              {...register("street")}
            />
          </label>
          <label className={styles.label}>
            Number
            {errors.number && (
              <span className={styles.error}>{errors.number.message}</span>
            )}
            <input
              type="text"
              className={`${styles.input} ${
                errors.number ? styles.inputError : ""
              }`}
              placeholder="123"
              {...register("number")}
            />
          </label>
          <label className={styles.label}>
            Door
            {errors.door && (
              <span className={styles.error}>{errors.door.message}</span>
            )}
            <input
              type="text"
              className={`${styles.input} ${
                errors.door ? styles.inputError : ""
              }`}
              placeholder="3A"
              {...register("door")}
            />
          </label>
        </article>

        <article className={styles.article}>
          <label className={styles.label}>
            City
            {errors.city && (
              <span className={styles.error}>{errors.city.message}</span>
            )}
            <input
              type="text"
              className={`${styles.input} ${
                errors.city ? styles.inputError : ""
              }`}
              placeholder="Pernambuco"
              {...register("city")}
            />
          </label>
          <label className={styles.label}>
            State
            {errors.state && (
              <span className={styles.error}>{errors.state.message}</span>
            )}
            <input
              type="text"
              className={`${styles.input} ${
                errors.state ? styles.inputError : ""
              }`}
              placeholder="FakeState"
              {...register("state")}
            />
          </label>
          <label className={styles.label}>
            Zip code
            {errors.zip_code && (
              <span className={styles.error}>{errors.zip_code.message}</span>
            )}
            <input
              type="number"
              className={`${styles.input} ${
                errors.zip_code ? styles.inputError : ""
              }`}
              placeholder="12345"
              {...register("zip_code")}
            />
          </label>
        </article>

        <Button type="submit" text="Update Address" />
      </form>
    </section>
  );
};
