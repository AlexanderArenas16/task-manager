import { Injectable } from '@angular/core';
import { Task, taskStatus } from '../core/models/task.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskList: Array<Task> = [
    { 
      id: 1,
      status: taskStatus.pending,
      name: 'Example',
      expirationDate: new Date(),
      associatedPerson: [
        {
          name: 'Alex',
          age: 30,
          skills: ['TypeScript']
        },
        {
          name: 'Marco',
          age: 30,
          skills: ['TypeScript']
        }
      ]
    },
    { 
      id: 2,
      status: taskStatus.pending,
      name: 'Example',
      expirationDate: new Date(),
      associatedPerson: [
        {
          name: 'Alex',
          age: 30,
          skills: ['TypeScript']
        }
      ]
    },
    { 
      id: 3,
      status: taskStatus.pending,
      name: 'Example',
      expirationDate: new Date(),
      associatedPerson: [
        {
          name: 'Alex',
          age: 30,
          skills: ['TypeScript']
        }
      ]
    },
    { 
      id: 4,
      status: taskStatus.pending,
      name: 'Example',
      expirationDate: new Date(),
      associatedPerson: [
        {
          name: 'Alex',
          age: 30,
          skills: ['TypeScript']
        }
      ]
    },
    { 
      id: 5,
      status: taskStatus.pending,
      name: 'Example',
      expirationDate: new Date(),
      associatedPerson: [
        {
          name: 'Alex',
          age: 30,
          skills: ['TypeScript']
        }
      ]
    }
  ];

  constructor() { }

  addTask(task: Task) {
    this.taskList.push(task);
  }

  completeTask(id: number) {
    this.taskList = this.taskList.map(t => t.id == id ? ({...t, status: taskStatus.complete}) : t);
  }
}
