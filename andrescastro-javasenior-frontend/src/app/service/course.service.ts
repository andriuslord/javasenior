import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courseURL = 'http://localhost:9090/course/';
  createCourseURL = 'http://localhost:9090/auth/';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.courseURL + 'list');
  }

  public detail(id: number): Observable<Course> {
    return this.httpClient.get<Course>(this.courseURL + `detail/${id}`);
  }

  // public courseStudent(userName: string): Observable<Course> {
  //   return this.httpClient.get<Course>(this.createCourseURL + `courseStudent/${userName}`);
  // }

  public save(req): Observable<any> {
    return this.httpClient.post<any>(this.createCourseURL + 'create', req);
  }

  public update(id: number, course: Course): Observable<any> {
    return this.httpClient.put<any>(this.courseURL + `update/${id}`, course);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.courseURL + `delete/${id}`);
  }
}
