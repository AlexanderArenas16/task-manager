import { createReducer, on } from "@ngrx/store";
import { addTask, changeStatusTask } from "./task.actions";
import { TaskState } from "./task.state";
import { Task, taskStatus } from "../models/task.model";

export const initialState: TaskState = { list: [] };

const _taskReducer = createReducer(initialState,
    on(addTask, (state: TaskState, task) => {
        return {
            ...state,
            list: state.list.concat(task)
        };
    }),
    on(changeStatusTask, (state: TaskState, task) => {
        return {
            ...state,
            list: state.list.map((i: Task) => i.id === task.id ? ({...i, status: taskStatus.complete}) : i)
        }
    })
);

export function taskReducer(state: any, action: any) {
    return _taskReducer(state, action);
}