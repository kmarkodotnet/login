
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Lesson} from "../model/lesson";
import { Config } from '../config';
import { Observable } from 'rxjs';


@Injectable()
export class LessonsService {

    constructor(private http: HttpClient) {
    }

    loadAllLessons():Observable<Lesson[]> {
        const url = Config.API_BASE_URL + 'lessons';
        return this.http.get<Lesson[]>(url);
    }

    findLessonById(id:number) {
        return this.http.get<Lesson>('/api/lessons/' + id);
    }

}