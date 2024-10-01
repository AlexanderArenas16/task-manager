import { Component, inject, OnInit } from '@angular/core';
import { Task } from 'src/app/core/models/task.model';
import {  MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { TaskService } from 'src/app/services/task.service';
import { PeopleService } from 'src/app/services/people.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { changeStatusTask } from 'src/app/core/state/task.actions';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {

  readonly dialog = inject(MatDialog);
  private taskService= inject(TaskService);
  private peopleService = inject(PeopleService);
  private taskStore = inject(Store<AppState>);
  taskList!: Array<Task>;
  taskListFilter!: Array<Task>;
  filter = 'all';

  ngOnInit(): void {
    this.taskStore.select('tasks').subscribe({
      next: (state) => {
        this.taskList = state.list;
        this.taskListFilter = this.taskList;
      }
    })
    this.peopleService.getPeople();
    // this.taskList = this.taskService.taskList;
    // this.taskListFilter = this.taskList;

  }

  applyFilter(value: string) {
    this.filter = value;

    if (value !== 'all') {
      this.taskListFilter = this.taskList.filter(w => w.status === value);
    } else {
      this.taskListFilter = this.taskList;
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(TaskDialogComponent, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  completeTask(task: Task) {
    this.taskStore.dispatch(changeStatusTask(task))
    // this.taskService.completeTask(id);
    // this.taskList = this.taskService.taskList;
    this.taskListFilter = this.taskList;
    this.applyFilter(this.filter);
  }
}