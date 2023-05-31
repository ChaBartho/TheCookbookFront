export interface Recipe {
  id: number;
  name: string;
  instruction: string;
  tempsCuisson : string;
  Ingredient: Ingredient[];
}
export interface Ingredient {
  id: number;
  quantity: number;
  uniteMesure: string;
  name: string;
}
export interface Aliment {
  id: number;
  name: string;
}
export interface Shoppinglist {
  id: number;
  Aliment: [];
  quantity: number;
  creationDate: string
}
export interface User {
  id: number;
  username : string;
  email: string;
  password: string;
}
