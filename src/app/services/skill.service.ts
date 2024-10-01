import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  skills: Array<string> = [
    'TypeScript',
    'HTML',
    'CSS',
    'Angular',
    'Git',
    'PostgreSQL'
  ]

}
