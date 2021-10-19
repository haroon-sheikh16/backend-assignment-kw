export interface credentials {
  email: string;
  password: string;
}

export interface task {
  name: string;
}

export interface payload {
  payload: {
    email: string;
    id: number;
  };
}
