
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Course } from '../models/course';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://localhost:3000/api/courses';
  public courses: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  public course= new BehaviorSubject<Course>(new Course(0,'','',0));
  course$ = this.course.asObservable();
  constructor(private http: HttpClient,private authService:AuthService) { }
  setCourses() {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<Course[]>(this.baseUrl, { headers }).subscribe(data => {
      console.log(data);

      this.courses.next(data);
    })
  }

  setCourseById(id: number) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);    
    console.log('ID course:', id);
     this.http.get<Course>(`${this.baseUrl}/${id}`,{headers}).subscribe(
      course => {
        console.log('Response received:', course);
        this.course.next(course);
      },
      error => {
        console.error('Error in getCourseById:', error);
      } );
  }
  addCourse(title: string, description: string) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post<any>(this.baseUrl, {title,description},{headers}).subscribe(
      data => {
        this.setCourses();
        alert('Course added successfully');
      },
      error => {
        alert('Course add failed');
      }
    )
  }

  editCourse(courseId: number, course: Course) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put<any>(`${this.baseUrl}/${courseId}`, course,{headers}).subscribe(
      data => {
        this.setCourses();
        alert('Course updated successfully');
      },
      error => {
        alert('Course update failed');
      }
    );
  }

  deleteCourse(courseId: number) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.delete<any>(`${this.baseUrl}/${courseId}`,{headers}).subscribe(
      data => {
        this.setCourses();
        alert('Course deleted successfully');
      },
      error => {
        alert('Course delete failed');
      }
    );
  }

}
