import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  standalone: true,
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatCardModule]
})
export class AddCourseComponent {
  courseForm: FormGroup;

  constructor(private fb: FormBuilder,private courseService:CourseService,private router: Router) {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.courseForm.valid) {
      console.log('Course added:', this.courseForm.value);
      this.courseService.addCourse(this.courseForm.value.title,this.courseForm.value.description);
      const newUrl = `/courses`;
      this.router.navigateByUrl(newUrl);
    }
  }
}
