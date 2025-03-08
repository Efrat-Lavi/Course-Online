
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
import { IconsPipe } from '../../pipes/icons.pipe';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule,IconsPipe],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  constructor(private authService: AuthService, private courseService: CourseService
    ,private router: Router, private route: ActivatedRoute
  ) { }

  courses$!: Observable<Course[]>;
  ngOnInit() {
    this.courses$ = this.courseService.courses;
    this.courseService.setCourses();
  }

  isTeacher() { return this.authService.isTeacher() }
  addCourse() {
    this.route.url.subscribe(urlSegments => {
      const currentUrl = this.router.url;
      const newUrl = `${currentUrl}-add`;
      this.router.navigateByUrl(newUrl);
    });
  }

  openCourseDetails(id: number) {
    this.route.url.subscribe(urlSegments => {
      const currentUrl = this.router.url;
      const newUrl = `${currentUrl}/${id}`;
      this.router.navigateByUrl(newUrl);
    });
  }
}

