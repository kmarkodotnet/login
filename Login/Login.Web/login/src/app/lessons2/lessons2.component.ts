import { Component, OnInit } from '@angular/core';
import {LessonsService} from "../services/lessons.service";
import {Observable} from "rxjs";
import {Lesson} from "../model/lesson";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'lessons2',
  templateUrl: './lessons2.component.html',
  styleUrls: ['./lessons2.component.css']
})
export class Lessons2Component implements OnInit {


  lessons$: Observable<Lesson[]>;
  isLoggedIn: boolean;

  constructor(private lessonsService:LessonsService, private authService: AuthService) { }

  ngOnInit() {
    this.lessons$ = this.lessonsService.loadAllLessons();
    this.isLoggedIn = this.authService.isLoggedIn();
  }

}
