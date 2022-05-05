import { Course } from './course';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiServerUrl = '';
  constructor(private http: HttpClient) { }

  public getCourse(): Observable<Course[]>{
    return this.http.get<Course[]>(`${this.apiServerUrl}/all`);
  }

  public addCourse(course: Course): Observable<Course>{
    return this.http.post<Course>(`${this.apiServerUrl}/add`,course);
  }

  // Chỗ này cần tìm cách truyền id vào;
  public updateCourse(course: Course,courseId: number): Observable<Course>{
    return this.http.put<Course>(`${this.apiServerUrl}/update/${courseId}`,course);
  }

  public deleteCourse(courseId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${courseId}`);
  }
}
