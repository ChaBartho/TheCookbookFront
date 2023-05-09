export interface recipe {
  name: string;
  instruction: string;
  ingredient: []
}

export interface ingredient {
  name: string;
  quantity: number;
  uniteMesure: string
}

export interface aliment {
  name: string
}

export interface shoppinglist {
  aliment: [];
  quantity: number;
  creationDate: string
}

export interface user {
  username : string;
  email: string;
  password: string
}
