import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RootLayout } from "./layout/RootLayout";
import {
  Cart,
  Confirmation,
  Contact,
  Detail,
  Home,
  Login,
  NotFound,
  Orders,
  OrderSummary,
  Profile,
  Register,
  ResetPassword,
  Success,
} from "./Routes";
import "./app.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="product/:id" element={<Detail />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="cart" element={<Cart />} />
      <Route path="order-summary" element={<OrderSummary />} />
      <Route path="orders" element={<Orders />} />
      <Route path="profile" element={<Profile />} />
      <Route path="confirmation" element={<Confirmation />} />
      <Route path="success" element={<Success />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export const App = () => {
  return (
    <main className="app container">
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        newestOnTop={true}
      />

      <RouterProvider router={router} />
    </main>
  );
};
