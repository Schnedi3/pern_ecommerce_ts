// auth
export interface IAuthStore {
  isAuthenticated: boolean;
  user: IUser | null;
  authData: (data: IAuthResponse) => void;
  logoutAuth: () => void;
}

export interface IAuthResponse {
  success: boolean;
  message: string;
  result: IUser;
  token: string;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
}

// cart
export interface ICartStore {
  cart: CartItem[];
  getCartStore: () => void;
  addToCartStore: (product: CartItem) => void;
  deleteFromCartStore: (id: number) => void;
  updateProductQuantityStore: (id: number, updatedItem: CartItem) => void;
  itemsInCart: number;
  totalAmount: number;
}

export interface CartItem extends IProduct {
  product_id: number;
  quantity: number;
  size: string;
}

export interface IAddress {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  street: string;
  number: string;
  door: string;
  city: string;
  state: string;
  zip_code: string;
}

export interface ICategoriesProps {
  selectedCategory: string;
  setSelectedCategory: (selectedCategory: string) => void;
  products: IProduct[];
}

export interface IContact {
  name: string;
  email: string;
  message: string;
}

export interface IOrder {
  order_amount: number;
  order_date: Date;
  order_id: number;
  order_status: string;
  products: IOrderProduct[];
}

interface IOrderProduct {
  id: number;
  images: string[];
  price: number;
  quantity: number;
  size: string;
  title: string;
}

export interface IProductCardProps {
  filteredProducts: IProduct[];
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  sizes: string[];
  images: string[];
  quantity: number;
}

export interface ISearchProps {
  inputValue: string;
  setInputValue: (inputValue: string) => void;
}
