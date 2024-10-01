import { Person } from "./person.model";

export interface Task {
    id: number,
    status: taskStatus,
    name: string,
    expirationDate: Date,
    associatedPerson: Array<Person>,
}

export enum taskStatus {
    complete = 'complete',
    pending = 'pending'
}