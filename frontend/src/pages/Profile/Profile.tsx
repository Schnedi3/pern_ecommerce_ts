import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useAuthStore } from "../../store/authStore";
import { useCartStore } from "../../store/cartStore";
import {
  deleteAddressRequest,
  updateUsernameRequest,
  AddressModal,
  Title,
  iconAddress,
  iconDelete,
  iconEdit,
} from "../../Routes";
import { AddressUpdate } from "./AddressUpdate";
import { IAddress } from "../../types/types";
import styles from "./profile.module.css";

export const Profile = () => {
  const [isEditUsername, setIsEditUsername] = useState<boolean>(false);
  const [updatedUsername, setUpdatedUsername] = useState<string>("");

  const [isAddAddress, setIsAddAddress] = useState<boolean>(false);
  const [isEditAddress, setIsEditAddress] = useState<boolean>(false);
  const [addressData, setAddressData] = useState<IAddress | undefined>(
    undefined
  );

  const { user, authData } = useAuthStore();
  const { addressList, deleteAddressStore, getAddressStore } = useCartStore();

  const handleUpdateAddress = (address: IAddress) => {
    setIsEditAddress(true);
    setAddressData(address);
  };

  useEffect(() => {
    getAddressStore();
  }, [getAddressStore]);

  const deleteAddress = async (id: number) => {
    try {
      const { data } = await deleteAddressRequest(id);

      if (!data.success) {
        console.log(data.message);
      }

      deleteAddressStore(id);
      toast.success(data.message);
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Unexpected error");
    }
  };

  const handleUpdateUser = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();

    try {
      if (updatedUsername.trim() !== "") {
        const { data } = await updateUsernameRequest(updatedUsername, id);

        if (!data.success) {
          console.log(data.message);
        }

        authData(data.result);
        toast.success(data.message);
        setIsEditUsername(false);
      }
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Unexpected error");
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
      {isEditAddress && (
        <AddressUpdate
          isEditAddress={isEditAddress}
          setIsEditAddress={setIsEditAddress}
          addressData={addressData}
        />
      )}
    </section>
  );
};
