import { Outlet } from "react-router-dom";

import { Footer, Menu } from "../Routes";

export const RootLayout = () => {
  return (
    <section>
      <Menu />
      <Outlet />
      <Footer />
    </section>
  );
};
