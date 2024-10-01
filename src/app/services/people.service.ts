import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Resp } from '../core/models/responseAPI';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private http = inject(HttpClient);
  private peopleList = new BehaviorSubject<any>(null);
  peopleList$ = this.peopleList.asObservable();

  // constructor(
	// 	private http: HttpClient,
	// ) {}

  getPeople() {
    const url = `https://rickandmortyapi.com/api/character`;
    this.http.get<Resp>(url).subscribe({
      next: (resp) => {
        this.peopleList.next(resp.results);
      },
      error: (err) => {},
      complete: () => {}
    });
  }
}
