import type {UserResponse} from '@auth/interfaces/auth-response.interface';

export interface ProductResponse {
  pages:    number;
  count:    number;
  products: Product[];
}

export interface Product {
  images:      string[];
  sizes:       Size[];
  gender:      Gender;
  price:       number;
  description: string;
  id:          string;
  title:       string;
  stock:       number;
  user:        UserResponse;
  slug:        string;
  tags:        Tag[];
}

export enum Gender {
  Kid = "kid",
  Men = "men",
  Unisex = "unisex",
  Women = "women",
}

export enum Size {
  L = "L",
  M = "M",
  S = "S",
  Xl = "XL",
  Xs = "XS",
  Xxl = "XXL",
}

export enum Tag {
  Hats = "hats",
  Hoodie = "hoodie",
  Jacket = "jacket",
  Shirt = "shirt",
  Sweatshirt = "sweatshirt",
}



