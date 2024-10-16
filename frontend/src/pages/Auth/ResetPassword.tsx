import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { resetPasswordRequest } from "../../Routes";
import { loginSchema } from "../../schemas/schemas";
import { IUser } from "../../types/types";
import { Button, iconEyeClosed, iconEyeOpen, Title } from "../../Routes";
import styles from "./auth.module.css";

export const ResetPassword = () => {
  const [visible, setIsVisible] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  const onSubmit = (data: IUser) => {
    resetPassword(data);
    reset();
  };

  const resetPassword = async (user: IUser) => {
    try {
      const { data } = await resetPasswordRequest(user);

      if (!data.success) {
        console.log(data.message);
      }

      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Unexpected error");
    }
  };

  return (
    <section className={styles.auth}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <Title title="Reset password" />

        <label className={styles.label}>
          Email
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
          <input
            className={`${styles.input} ${
              errors.email ? styles.inputError : ""
            }`}
            type="email"
            placeholder="johndoe@lorem.com"
            {...register("email")}
          />
        </label>

        <label className={styles.label}>
          New password
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
          <input
            className={`${styles.input} ${
              errors.password ? styles.inputError : ""
            }`}
            type={visible ? "text" : "password"}
            placeholder="A1b2C3d4"
            {...register("password")}
          />
          <button
            className={styles.viewPassword}
            type="button"
            onClick={() => setIsVisible(!visible)}
          >
            <img
              className={styles.viewPasswordIcon}
              src={visible ? iconEyeClosed : iconEyeOpen}
              alt="password visibility"
            />
          </button>
        </label>

        <Button type="submit" text="Set new password" />
      </form>
    </section>
  );
};
