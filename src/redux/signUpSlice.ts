import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignUp {
  name?: string;
  email?: string;
  password?: string;
}

interface SignUpState {
  users: SignUp[];
  loggedInUser: SignUp | null;
  error: string | null;
}
const initialState: SignUpState = {
  users: [],
  loggedInUser: null,
  error: null,
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<SignUp>) => {
      const { email, password } = action.payload;
      const user = state.users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        state.loggedInUser = user;
        state.error = null;
      } else {
        state.error = "Invalid email or password";
      }
    },
    signUp: (state, action: PayloadAction<SignUp>) => {
      state.users.push(action.payload);
    },
  },
});

export const { signUp, logIn } = signUpSlice.actions;
export default signUpSlice.reducer;
