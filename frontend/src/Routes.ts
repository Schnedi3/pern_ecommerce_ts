// api
import { addOrderRequest } from "./api/order";
import { addStripeOrderRequest } from "./api/order";
import { createCheckoutSessionRequest } from "./api/payment";
import { fetchCheckoutSessionRequest } from "./api/payment";

export {
  addOrderRequest,
  addStripeOrderRequest,
  createCheckoutSessionRequest,
  fetchCheckoutSessionRequest,
};

// components
import { AddressModal } from "./components/AddressModal/AddressModal";
import { Button } from "./components/Button/Button";
import { Footer } from "./components/Footer/Footer";
import { Menu } from "./components/Menu/Menu";
import { Title } from "./components/Title/Title";

export { AddressModal, Button, Footer, Menu, Title };

// icons
import iconAddress from "./assets/icons/address.svg";
import iconArrow from "./assets/icons/arrow.svg";
import iconBox from "./assets/icons/box.svg";
import iconCart from "./assets/icons/cart.svg";
import iconClose from "./assets/icons/close.svg";
import iconConfirm from "./assets/icons/confirm.svg";
import iconDelete from "./assets/icons/delete.svg";
import iconEdit from "./assets/icons/edit.svg";
import iconEyeClosed from "./assets/icons/eyeClosed.svg";
import iconEyeOpen from "./assets/icons/eyeOpen.svg";
import iconGoogle from "./assets/icons/google.svg";
import iconLink from "./assets/icons/link.svg";
import iconLogin from "./assets/icons/login.svg";
import iconMenu from "./assets/icons/menu.svg";
import iconNext from "./assets/icons/next.svg";
import iconPrevious from "./assets/icons/previous.svg";
import iconSearch from "./assets/icons/search.svg";

export {
  iconAddress,
  iconArrow,
  iconBox,
  iconCart,
  iconClose,
  iconConfirm,
  iconDelete,
  iconEdit,
  iconEyeClosed,
  iconEyeOpen,
  iconGoogle,
  iconLink,
  iconLogin,
  iconMenu,
  iconNext,
  iconPrevious,
  iconSearch,
};

// pages
import { Cart } from "./pages/Cart/Cart";
import { Contact } from "./pages/Contact/Contact";
import { Confirmation } from "./pages/Confirmation/Confirmation";
import { Detail } from "./pages/Detail/Detail";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Auth/Login";
import { NotFound } from "./pages/NotFound/NotFound";
import { Orders } from "./pages/Orders/Orders";
import { OrderSummary } from "./pages/OrderSummary/OrderSummary";
import { Profile } from "./pages/Profile/Profile";
import { Register } from "./pages/Auth/Register";
import { ResetPassword } from "./pages/Auth/ResetPassword";
import { Success } from "./pages/Confirmation/Success";

export {
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
};
