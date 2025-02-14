import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: string;
  title: string;
  desc: string;
}

interface List {
  id: string;
  title: string;
  tasks: Task[];
}

interface ListState {
  lists: List[];
}
const initialState: ListState = {
  lists: [],
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<List>) => {
      state.lists.push(action.payload);
    },

    addTask: (state, action: PayloadAction<{ id: string; task: Task }>) => {
      const id = action.payload.id;
      const listIndex = state.lists.findIndex((list) => list.id === id);

      if (listIndex !== -1) {
        state.lists[listIndex].tasks.push(action.payload.task);
      }
    },
    editTask: (state, action: PayloadAction<{ id: string; task: Task }>) => {
      const id = action.payload.id;
      const listIndex = state.lists.findIndex((list) => list.id === id);

      if (listIndex !== -1) {
        state.lists[listIndex].tasks.push(action.payload.task);
      }
    },

    // logIn: (state, action: PayloadAction<SignUp>) => {
    //   const { email, password } = action.payload;
    //   const user = state.users.find(
    //     (user) => user.email === email && user.password === password
    //   );

    //   if (user) {
    //     state.loggedInUser = user;
    //     state.error = null;
    //   } else {
    //     state.error = "Invalid email or password";
    //   }
    // },
    // signUp: (state, action: PayloadAction<SignUp>) => {
    //   state.users.push(action.payload);
    // },
  },
});

export const { addList, addTask, editTask } = listSlice.actions;
export default listSlice.reducer;
