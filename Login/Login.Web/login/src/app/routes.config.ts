import {Routes} from '@angular/router';
import {LessonsComponent} from "./lessons/lessons.component";
import { Lessons2Component } from './lessons2/lessons2.component';

export const routesConfig: Routes = [
    {
        path: 'lessons',
        component: LessonsComponent
    },
    {
        path: 'lessons2',
        component: Lessons2Component
    },
    {
        path: '',
        redirectTo:'/lessons',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/lessons',
        pathMatch: 'full'
    }
];