import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { updateAddressRequest, iconClose } from "../../Routes";
import { IAddress } from "../../types/types";
import { addressSchema } from "../../schemas/schemas";

import "./address_edit.css";

interface IAddressProps {
  isEditAddress: boolean;
  setIsEditAddress: (isEditAddress: boolean) => void;
  getAddress: () => void;
  addressData: IAddress | undefined;
}

export const AddressEdit = ({
  isEditAddress,
  setIsEditAddress,
  getAddress,
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

  const onSubmit = async (data: IAddress) => {
    try {
      if (addressData) {
        const response = await updateAddressRequest(data, addressData.id);

        if (response.data.success) {
          toast.success(response.data.message);
          getAddress();
          setIsEditAddress(false);
        } else {
          console.log(response.data.message);
        }
      } else {
        toast.error("No address data available");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    if (isEditAddress) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isEditAddress]);

  return (
    <section className="modal">
      <button className="close_modal" onClick={() => setIsEditAddress(false)}>
        <img src={iconClose} alt="close modal" />
      </button>

      <form
        className="address_form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Add address</h2>

        <article>
          <label>
            First name
            {errors.first_name && (
              <span className="error">{errors.first_name.message}</span>
            )}
            <input
              type="text"
              className={errors.first_name ? "input_error" : ""}
              placeholder="John"
              {...register("first_name")}
            />
          </label>
          <label>
            Last name
            {errors.last_name && (
              <span className="error">{errors.last_name.message}</span>
            )}
            <input
              type="text"
              className={errors.last_name ? "input_error" : ""}
              placeholder="Doe"
              {...register("last_name")}
            />
          </label>
        </article>

        <article>
          <label>
            Phone
            {errors.phone && (
              <span className="error">{errors.phone.message}</span>
            )}
            <input
              type="tel"
              className={errors.phone ? "input_error" : ""}
              placeholder="678 901 234"
              {...register("phone")}
            />
          </label>
        </article>

        <article>
          <label>
            Street
            {errors.street && (
              <span className="error">{errors.street.message}</span>
            )}
            <input
              type="text"
              className={errors.street ? "input_error" : ""}
              placeholder="Fake St"
              {...register("street")}
            />
          </label>
          <label>
            Number
            {errors.number && (
              <span className="error">{errors.number.message}</span>
            )}
            <input
              type="text"
              className={errors.number ? "input_error" : ""}
              placeholder="123"
              {...register("number")}
            />
          </label>
          <label>
            Door
            {errors.door && (
              <span className="error">{errors.door.message}</span>
            )}
            <input
              type="text"
              className={errors.door ? "input_error" : ""}
              placeholder="3A"
              {...register("door")}
            />
          </label>
        </article>

        <article>
          <label>
            City
            {errors.city && (
              <span className="error">{errors.city.message}</span>
            )}
            <input
              type="text"
              className={errors.city ? "input_error" : ""}
              placeholder="Pernambuco"
              {...register("city")}
            />
          </label>
          <label>
            State
            {errors.state && (
              <span className="error">{errors.state.message}</span>
            )}
            <input
              type="text"
              className={errors.state ? "input_error" : ""}
              placeholder="FakeState"
              {...register("state")}
            />
          </label>
          <label>
            Zip code
            {errors.zip_code && (
              <span className="error">{errors.zip_code.message}</span>
            )}
            <input
              type="number"
              className={errors.zip_code ? "input_error" : ""}
              placeholder="12345"
              {...register("zip_code")}
            />
          </label>
        </article>

        <button className="dark_button dark_button-address" type="submit">
          Update Address
        </button>
      </form>
    </section>
  );
};
