import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from '../../services/lesson.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-lesson',
  standalone: true,
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.css'],
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatCardModule]
})
export class AddLessonComponent {
  courseForm: FormGroup;
  courseId: number = 0;

  constructor(private fb: FormBuilder, private lessonService: LessonService, private router: Router,
    private route: ActivatedRoute,private location: Location
  ) {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });
    const idParam = this.route.snapshot.paramMap.get('id');
    this.courseId = idParam ? +idParam : 0;

  }

  onSubmit() {
    if (this.courseForm.valid) {
      console.log('Course added:', this.courseForm.value);
      if (this.courseId)
        this.lessonService.addLesson(this.courseForm.value.title, this.courseForm.value.content, this.courseId);
    }
    this.location.back()
  }
}
