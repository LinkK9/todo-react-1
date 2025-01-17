import TodoService from "../TodoService";
import {
  ChangeInputValueType,
  GetTasksListValue,
  ChangeStatusCompleteValue,
  ChooseFavouriteTaskValue,
  LoginSucces,
  LogoutSucces,
  BeginAddTodo,
  AddTodoSuccess,
  GetTodoList,
  SyncError,
  GetTodoSuccess,
} from "./ActionType";

export const ChangeInputValue = (newInputValue) => {
  return {
    type: ChangeInputValueType,
    payload: {
      newInputValue,
    },
  };
};
export const GetTasksList = (tasksList) => {
  return {
    type: GetTasksListValue,
    payload: {
      tasksList,
    },
  };
};

export const ChangeStatusComplete = (id, value) => {
  return {
    type: ChangeStatusCompleteValue,
    payload: {
      id,
      value,
    },
  };
};

export const ChooseFavouriteTask = (id, value) => {
  return {
    type: ChooseFavouriteTaskValue,
    payload: {
      id,
      value,
    },
  };
};

export const AttempLogin = () => {
  return {
    type: LoginSucces,
  };
};

export const AttempLogout = () => {
  return {
    type: LogoutSucces,
  };
};

export const AddNewTaskAsync = (inputValue) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BeginAddTodo,
    });
    await TodoService.AddTodo(inputValue);
    dispatch({
      type: AddTodoSuccess,
      payload: {
        newTaskName: inputValue,
      },
    });
  } catch (ex) {
    dispatch({
      type: SyncError,
    });
  } finally {
    // END_ADD_TODO
  }
};

export const GetData = () => async (dispatch, getState) => {
  try {
    const data = await TodoService.GetTodoList();
    dispatch({
      type: GetTodoSuccess,
      payload: {
        taskList: data.data,
      },
    });
  } catch (err) {
    dispatch({
      type: SyncError,
    });
  }
};
