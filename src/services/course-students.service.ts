import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course_student } from '../models/course_student.model';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { Course } from '../models/course';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CourseStudentsService {

  private baseUrl = 'http://localhost:3000/api/courses';

  public student_courses: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  constructor(private http: HttpClient) { }

  getCoursesToStdent(userId: number) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    this.http.get<Course[]>(`${this.baseUrl}/student/${userId}`,{headers}).subscribe(
      data => {
        this.student_courses.next(data);
        console.log(this.student_courses);
      });
  }
  isStudentEnrolled(studentId: number, courseId: number): Observable<boolean> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return new Observable<boolean>(observer => {
      this.http.get<any[]>(`${this.baseUrl}/student/${studentId}`,{headers}).subscribe(
        courses => {
          console.log('Courses received:', courses);
    console.log('Searching for courseId:', courseId);
          const isEnrolled = courses.some(course => course.id == courseId);
          observer.next(isEnrolled);
          observer.complete();
        },
        error => {
          console.error('Error checking enrollment:', error);
          observer.next(false);
          observer.complete();
        }
      );
    });
  }
  addStudentToCourse(userId: number, courseId: number) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    this.http.post<any>(`${this.baseUrl}/${courseId}/enroll`,{userId}, { headers })
      .subscribe(
        data => {
          console.log('Enrollment successful!', data);
          alert('Enrollment successful');
          this.getCoursesToStdent(userId);
        },
        error => {
          console.error('Enrollment failed', error);
          alert('Enrollment failed');
        }
      );
  }

  RemoveStudentFromCourse(userId: number, courseId: number) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.delete<any>(`${this.baseUrl}/${courseId}/unenroll`, {
      headers: headers,
      body: { userId: userId.toString() }
    })
    .subscribe(
      data => {
        console.log('UnEnrollment successful', data);
        alert('UnEnrollment successful');
        this.getCoursesToStdent(userId);
      },
      error => {
        alert('UnEnrollment failed');
        console.error('UnEnrollment failed', error);
      }
    );
  }
}
