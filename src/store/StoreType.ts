export interface StoreType {
  product: ProductContainer;
}

interface ProductContainer {
  cart: Array<Product>;
  data: Array<Product>;
  hasError: boolean;
  isLoading: boolean;
  total: number;
  wishlisted: Array<Product>;
}

export interface Product {
  colour: string;
  id: number;
  img: string;
  name: string;
  price: number;
  qty: number;
}
