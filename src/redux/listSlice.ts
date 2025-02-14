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
      const { id, task } = action.payload;
      const listIndex = state.lists.findIndex((list) => list.id === id);

      if (listIndex !== -1) {
        const taskIndex = state.lists[listIndex].tasks.findIndex(
          (t) => t.id === task.id
        );
        state.lists[listIndex].tasks[taskIndex] = task;
      }
    },

    deleteTask: (
      state,
      action: PayloadAction<{ id: string; taskId: string }>
    ) => {
      const { id, taskId } = action.payload;
      const listIndex = state.lists.findIndex((list) => list.id === id);

      if (listIndex !== -1) {
        const taskIndex = state.lists[listIndex].tasks.findIndex(
          (t) => t.id === taskId
        );
        state.lists[listIndex].tasks.splice(taskIndex, 1);
      }
    },
  },
});

export const { addList, addTask, editTask, deleteTask } = listSlice.actions;
export default listSlice.reducer;
