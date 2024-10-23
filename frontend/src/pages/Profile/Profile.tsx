import { useState } from "react";

import { useAuthStore } from "../../store/authStore";
import { useUpdateUsername } from "../../api/user";
import { useAddress, useDeleteAddress } from "../../api/address";
import {
  iconAddress,
  iconDelete,
  iconEdit,
  AddressModal,
  Title,
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
  const { user } = useAuthStore();
  const { mutate: updateUsername } = useUpdateUsername();
  const { mutate: deleteAddress } = useDeleteAddress();
  const { data: addressList } = useAddress();

  const handleUpdateUser = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();

    if (updatedUsername.trim() !== "") {
      updateUsername({ updatedUsername, id });
      setIsEditUsername(false);
    }
  };

  const handleUpdateAddress = (address: IAddress) => {
    setIsEditAddress(true);
    setAddressData(address);
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

        {addressList?.length !== 0 ? (
          <div className={styles.addresses}>
            {addressList?.map((address: IAddress) => (
              <div className={styles.label} key={address.first_name}>
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
              </div>
            ))}
          </div>
        ) : (
          <p>You haven't add any address yet</p>
        )}
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
