import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Lesson } from '../models/lesson';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private baseUrl = 'http://localhost:3000/api/courses';
  public lessons: BehaviorSubject<Lesson[]> = new BehaviorSubject<Lesson[]>([]);
  public lessons$ = this.lessons.asObservable();
  constructor(private http: HttpClient) { }

  getLessons(courseId: number) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<Lesson[]>(`${this.baseUrl}/${courseId}/lessons`, { headers }).subscribe(data => {
      this.lessons.next(data);
    })
  }
  getLessonById(courseId: number, lessonId: number) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get<Lesson>(`${this.baseUrl}/${courseId}/lessons/${lessonId}`, { headers });
  }
  

  addLesson(title: string, content: string, courseId: number) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post<any>(`${this.baseUrl}/${courseId}/lessons`, { title, content }, { headers }).subscribe(
      data => {
        this.getLessons(courseId);
        alert('Lesson added successfully');
      },
      error => {
        alert('Lesson add failed');
      })
  }

  editLesson(lesson: Lesson) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.put<any>(`${this.baseUrl}/${lesson.courseId}/lessons/${lesson.id}`, lesson,{ headers }).subscribe(
      data => {
        this.getLessons(lesson.courseId);
        alert('Lesson updated successfully');
      },
      error => {
        alert('Lesson update failed');
      });
  }

  deleteLesson(courseId: number, lessonId: number) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.delete<any>(`${this.baseUrl}/${courseId}/lessons/${lessonId}`, { headers }).subscribe(
      data => {
        this.getLessons(courseId);
        alert('Lesson deleted successfully');
      },
      error => {
        alert('Lesson delete failed');
      });
  }
}
