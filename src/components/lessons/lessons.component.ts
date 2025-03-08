
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Course } from '../../models/course';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { CourseService } from '../../services/course.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AddCourseComponent } from '../add-course/add-course.component';
import { Lesson } from '../../models/lesson';
import { LessonService } from '../../services/lesson.service';

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent {
  constructor(private authService: AuthService, private lessonService: LessonService
    , private router: Router, private route: ActivatedRoute
  ) {
    this.lessons$ = this.lessonService.lessons;
    const idParam = this.route.snapshot.paramMap.get('id');
    this.courseId = idParam ? +idParam : 0;
  }
  ngOnInit() {
    if (this.courseId)
      this.lessonService.getLessons(this.courseId);
  }
  courseId: number | null = null;

  isTeacher() { return this.authService.isTeacher() }
  lessons$!: Observable<Lesson[]>;

  deleteLesson(lessonId: number) {
    if (this.courseId)
      this.lessonService.deleteLesson(this.courseId, lessonId);
  }

  editLesson(lesson: Lesson): void {
    const updatedTitle = prompt('Enter new title', lesson.title);
    const updatedContent = prompt('Enter new content', lesson.content);

    if (!updatedTitle || !updatedContent) return;

     const l = new Lesson(lesson.id, updatedTitle, updatedContent, lesson.courseId);
    this.lessonService.editLesson(l);
  }
  openLesson(id: number) {
    this.route.url.subscribe(urlSegments => {
      const currentUrl = this.router.url;
      const newUrl = `${currentUrl}/lessons/${id}`;
      this.router.navigateByUrl(newUrl);
    });
  }
}

