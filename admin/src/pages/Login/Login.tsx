import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

import { useAuthStore } from "../../store/authStore";
import { useLogin, useLoginGoogle } from "../../api/auth";
import { ILogin } from "../../types/types";
import { iconEyeClosed, iconEyeOpen, iconGoogle, Title } from "../../Routes";
import styles from "./login.module.css";

export const Login = () => {
  const [visible, setIsVisible] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();
  const { isAuthenticated } = useAuthStore();
  const { mutate: googleLogin } = useLoginGoogle();
  const { mutate: login } = useLogin();
  const navigate = useNavigate();

  const loginGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => googleLogin(codeResponse.access_token),
    onError: (error) => console.log("Login Failed:", error),
  });

  const onSubmit = (data: ILogin) => {
    login(data);
  };

  useEffect(() => {
    if (isAuthenticated) return navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <section className={styles.login}>
      <button className={styles.gbutton} onClick={() => loginGoogle()}>
        <img className={styles.googleIcon} src={iconGoogle} />
        <p className={styles.gbuttonText}>Login with Google</p>
      </button>

      <article className={styles.separator}>
        <span></span>
        <p>or</p>
        <span></span>
      </article>

      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <Title title="Login" />

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
            {...register("email", { required: "Email is required" })}
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
            {...register("password", { required: "Password is required" })}
          />
          <button
            className={styles.viewPassword}
            type="button"
            onClick={() => setIsVisible(!visible)}
          >
            <img
              className={styles.viewIcon}
              src={visible ? iconEyeClosed : iconEyeOpen}
              alt="password visibility"
            />
          </button>
        </label>

        <button className="dark_button" type="submit">
          Login
        </button>
      </form>
    </section>
  );
};
