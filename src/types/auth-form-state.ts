export type AuthFormState = {
  data: {
    email: string;
    password: string;
  };
  validation: string | null;
};
