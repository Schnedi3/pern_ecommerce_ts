import { Outlet } from "react-router-dom";

import { useAuthStore } from "../store/authStore";
import { Menu } from "../Routes";

export const RootLayout = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <section>
      {isAuthenticated && <Menu />}
      <Outlet />
    </section>
  );
};
