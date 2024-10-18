import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

import { useRegister } from "../../api/auth";
import { registerSchema } from "../../schemas/schemas";
import { IUser } from "../../types/types";
import { Button, iconEyeClosed, iconEyeOpen, Title } from "../../Routes";
import styles from "./auth.module.css";

export const Register = () => {
  const [visible, setIsVisible] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: zodResolver(registerSchema),
  });
  const { mutate: registerUser } = useRegister();

  const onSubmit = (data: IUser) => {
    registerUser(data);
  };

  return (
    <section className={styles.auth}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <Title title="Sign up" />

        <label className={styles.label}>
          Username
          {errors.username && (
            <span className={styles.error}>{errors.username.message}</span>
          )}
          <input
            className={`${styles.input} ${
              errors.username ? styles.inputError : ""
            }`}
            type="text"
            placeholder="John Doe"
            {...register("username")}
          />
        </label>

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
          Password
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

        <Button type="submit" text="Sign Up" />

        <article className={styles.footer}>
          <p>Already have an account?</p>
          <Link className={styles.footerLink} to="/login">
            Login
          </Link>
        </article>
      </form>
    </section>
  );
};
