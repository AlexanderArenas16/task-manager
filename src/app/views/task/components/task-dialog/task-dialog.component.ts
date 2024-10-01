import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { MatNativeDateModule  } from '@angular/material/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { taskStatus } from 'src/app/core/models/task.model';
import { Person } from 'src/app/core/models/person.model';
import { SkillService } from 'src/app/services/skill.service';
import { PeopleService } from 'src/app/services/people.service';
import { map, Observable, startWith } from 'rxjs';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
  standalone: true,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
    MatAutocompleteModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<TaskDialogComponent>);
  private taskService = inject(TaskService);
  private skillService = inject(SkillService);
  private peopleService = inject(PeopleService);
  private fb = inject(FormBuilder);

  form!: FormGroup;
  validPeople = false;
  validSkills = false;
  peopleListFiltered$!: Observable<any>;
  skillList!: Array<string>;

  ngOnInit(): void {
    this.skillList = this.skillService.skills;
    this.form = this.fb.group({
      id: [0],
      status: [taskStatus.pending],
      name: ['', [Validators.required, Validators.minLength(5)]],
      expirationDate: [new Date(), Validators.required],
      associatedPerson: this.fb.array([])
    });
    this.peopleListFiltered$ = this.peopleService.peopleList$
  }

  get associatedPerson() {
    return this.form.get('associatedPerson') as FormArray;
  }

  personSkills(personIndex: number): FormArray {
    return this.associatedPerson.at(personIndex).get('skills') as FormArray;
  }

  addPerson() {
    const personForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([])
    });

    this.associatedPerson.push(personForm);
  }

  addSkill(personIndex: number) {
    this.personSkills(personIndex).push(this.fb.control('', [Validators.required]));
  }

  removeSkill(personIndex: number, skillIndex: number) {
    this.personSkills(personIndex).removeAt(skillIndex);
  }

  removePerson(index: number) {
    this.associatedPerson.removeAt(index);
  }

  onValidPeople<T>(array: T[], property: keyof T): boolean {
    const seen = new Set();
    const result = array.filter(item => {
      const value = item[property];
      if (seen.has(value)) {
        return true;
      }
      seen.add(value);
      return false;
    });
    return !!result.find(t => t)
  }

  onValidSkills() {
    const people = this.form.value.associatedPerson;
    if (people.length > 0) {
      const result = people.map((p: Person) => p.skills.length > 0 ? true : false);
      return result.includes(false);
    }
    return false;
  }

  onSubmit() {
    this.validPeople = this.onValidPeople(this.form.value.associatedPerson, 'name');
    this.validSkills = this.onValidSkills();
    if (this.form.valid && this.associatedPerson.length > 0 && !this.validPeople && !this.validSkills) {
      const formValue = this.form.value;
      formValue.expirationDate = new Date(formValue.expirationDate).toString();
      this.taskService.addTask(formValue);
    }
  }
}
