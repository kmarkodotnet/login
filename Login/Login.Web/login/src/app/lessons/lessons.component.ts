import { Component, OnInit } from '@angular/core';
import {LessonsService} from "../services/lessons.service";
import {Observable} from "rxjs";
import {Lesson} from "../model/lesson";
import { FacebookAuthService } from '../services/facebook.auth.service';

@Component({
  selector: 'lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

  lessons$: Observable<Lesson[]>;
  isLoggedIn: boolean;

  constructor(private lessonsService:LessonsService, private authService: FacebookAuthService) {
    
   }

  ngOnInit() {
    this.lessons$ = this.lessonsService.loadAllLessons();
    this.isLoggedIn = this.authService.isLoggedIn();
  }

}