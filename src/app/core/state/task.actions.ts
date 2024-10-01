import { createAction, props } from "@ngrx/store";
import { Task } from "../models/task.model";

export const addTask = createAction(
    "[Task] addTask",
    props<Task>()
);

export const changeStatusTask = createAction(
    "[Task] changeStatusTask",
    props<Task>()
);