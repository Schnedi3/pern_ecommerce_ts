// api
import { loginRequest, loginGoogleRequest } from "./api/auth";
import {
  addProductRequest,
  deleteProductRequest,
  getProductsRequest,
} from "./api/product";
import { deleteUserRequest, getUsersRequest } from "./api/users";

export {
  loginRequest,
  loginGoogleRequest,
  addProductRequest,
  deleteProductRequest,
  getProductsRequest,
  deleteUserRequest,
  getUsersRequest,
};

// components
import { Menu } from "./components/Menu/Menu";
import { Title } from "./components/Title/Title";

export { Menu, Title };

// icons
import iconBox from "./assets/icons/box.svg";
import iconClose from "./assets/icons/close.svg";
import iconDelete from "./assets/icons/delete.svg";
import iconEyeClosed from "./assets/icons/eye_closed.svg";
import iconEyeOpen from "./assets/icons/eye_open.svg";
import iconGoogle from "./assets/icons/google.svg";
import iconLink from "./assets/icons/link.svg";
import iconList from "./assets/icons/list.svg";
import iconLoad from "./assets/icons/load.svg";
import iconMenu from "./assets/icons/menu.svg";
import iconUpload from "./assets/icons/upload.svg";

export {
  iconBox,
  iconClose,
  iconDelete,
  iconEyeClosed,
  iconEyeOpen,
  iconGoogle,
  iconLink,
  iconList,
  iconLoad,
  iconMenu,
  iconUpload,
};

// pages
import { Login } from "./pages/Login/Login";
import { NewProduct } from "./pages/NewProduct/NewProduct";
import { NotFound } from "./pages/NotFound/NotFound";
import { Orders } from "./pages/Orders/Orders";
import { Products } from "./pages/Products/Products";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { Users } from "./pages/users/Users";

export { Login, NewProduct, NotFound, Orders, Products, ProtectedRoute, Users };
