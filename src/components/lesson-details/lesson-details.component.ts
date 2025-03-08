import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../../services/lesson.service';
import { Lesson } from '../../models/lesson';

@Component({
  selector: 'app-lesson-details',
  standalone: true,
  templateUrl: './lesson-details.component.html',
  styleUrl: './lesson-details.component.css'
})
export class LessonDetailsComponent implements OnInit {

  lesson: Lesson | null = null;

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService
  ) {}

  ngOnInit(): void {
    this.loadLesson();
  }

  loadLesson(): void {
    const courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    const lessonId = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(courseId) && !isNaN(lessonId)) {
      this.lessonService.getLessonById(courseId, lessonId).subscribe(
        lesson => this.lesson = lesson,
        error => alert('Failed to load lesson')
      );
    }
  }
}
