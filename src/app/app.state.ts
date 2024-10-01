import { ActionReducerMap } from "@ngrx/store";
import { TaskState } from "./core/state/task.state";
import { taskReducer } from "./core/state/task.reducer";

export interface AppState {
    tasks: TaskState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    tasks: taskReducer
}