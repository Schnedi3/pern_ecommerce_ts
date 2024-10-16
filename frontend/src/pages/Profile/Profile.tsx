import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useAuthStore } from "../../store/authStore";
import { useShopContext } from "../../context/useShopContext";
import {
  iconAddress,
  iconDelete,
  iconEdit,
  AddressModal,
  deleteAddressRequest,
  updateUsernameRequest,
  Title,
} from "../../Routes";
import { AddressUpdate } from "./AddressUpdate";
import { IAddress } from "../../types/types";
import styles from "./profile.module.css";

export const Profile = () => {
  const {
    getAddress,
    addressList,
    setAddressList,
    isModalAddress,
    setIsModalAddress,
  } = useShopContext();
  const { user, authData } = useAuthStore();

  useEffect(() => {
    getAddress();
  }, [getAddress]);

  const [isEditUsername, setIsEditUsername] = useState<boolean>(false);
  const [updatedUsername, setUpdatedUsername] = useState<string>("");

  const handleUpdateUser = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();

    try {
      if (updatedUsername.trim() !== "") {
        const response = await updateUsernameRequest(updatedUsername, id);

        if (response.data.success) {
          toast.success(response.data.message);
          authData(response.data.result);
          localStorage.setItem("user", JSON.stringify(response.data.result));
          setIsEditUsername(false);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [isEditAddress, setIsEditAddress] = useState<boolean>(false);
  const [addressData, setAddressData] = useState<IAddress | undefined>(
    undefined
  );
  const handleUpdateAddress = (address: IAddress) => {
    setIsEditAddress(true);
    setAddressData(address);
  };

  const deleteAddress = async (id: number) => {
    try {
      const response = await deleteAddressRequest(id);

      if (response.data.success) {
        setAddressList(addressList.filter((address) => address.id !== id));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  return (
    <section className={styles.profile}>
      {user && (
        <article className={styles.personal}>
          <Title title="Personal information" />

          <div className={styles.personalInfo}>
            <label className={styles.personalLabel}>
              <h4 className={styles.labelTitle}>Username</h4>
              {isEditUsername ? (
                <form onSubmit={(e) => handleUpdateUser(e, user.id)}>
                  <input
                    className={styles.input}
                    type="text"
                    value={updatedUsername}
                    onChange={(e) => setUpdatedUsername(e.target.value)}
                    autoFocus
                    onBlur={() => setIsEditUsername(false)}
                  />
                </form>
              ) : (
                <p
                  className={styles.labelText}
                  onDoubleClick={() => {
                    setIsEditUsername(true), setUpdatedUsername(user.username);
                  }}
                >
                  {user.username}
                </p>
              )}
            </label>
            <label className={styles.personalLabel}>
              <h4 className={styles.labelTitle}>Email</h4>
              <p className={styles.labelText}>{user.email}</p>
            </label>
          </div>
        </article>
      )}

      <article>
        <Title title="Your addresses" />

        <div className={styles.addresses}>
          {addressList.map((address) => (
            <label className={styles.label} key={address.first_name}>
              <div>
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
              </div>

              <div className={styles.buttons}>
                <button
                  className={styles.button}
                  onClick={() => handleUpdateAddress(address)}
                >
                  <img
                    className={styles.buttonIcon}
                    src={iconEdit}
                    alt="edit address"
                  />
                </button>
                <button
                  className={styles.button}
                  onClick={() => deleteAddress(address.id)}
                >
                  <img
                    className={styles.buttonIcon}
                    src={iconDelete}
                    alt="delete address"
                  />
                </button>
              </div>
            </label>
          ))}
        </div>
      </article>

      <button
        className={styles.addAddress}
        onClick={() => setIsModalAddress(true)}
      >
        <img
          className={styles.addAddressIcon}
          src={iconAddress}
          alt="add new address"
        />
        Add new address
      </button>

      {isModalAddress && <AddressModal getAddress={getAddress} />}
      {isEditAddress && (
        <AddressUpdate
          isEditAddress={isEditAddress}
          setIsEditAddress={setIsEditAddress}
          getAddress={getAddress}
          addressData={addressData}
        />
      )}
    </section>
  );
};
