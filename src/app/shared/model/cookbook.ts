export interface Recipe {
  name: string;
  instruction: string;
  tempsCuisson : string;
  quantity: number;
  Ingredient: []
}

export interface Ingredient {
  name: string;
  quantity: number;
  uniteMesure: string
}

export interface Aliment {
  name: string
}

export interface Shoppinglist {
  Aliment: [];
  quantity: number;
  creationDate: string
}

export interface User {
  username : string;
  email: string;
  password: string
}
