export type User = {
  id: number;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
};

export type CreateUserPayload = {
  email: string;
  phone: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type UpdateUserPayload = {
  email?: string;
  phone?: string;
  password?: string;
};
