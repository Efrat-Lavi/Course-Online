import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Course } from '../../models/course';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { UserService } from '../../services/user.service';
import { CourseStudentsService } from '../../services/course-students.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import {LessonsComponent} from '../lessons/lessons.component';
@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatMenuModule, LessonsComponent],
  templateUrl: './course-detailes.component.html',
  styleUrls: ['./course-detailes.component.css']
})
export class CourseDetailsComponent {

  course = new Course(0, '', '', 0);
  user: User=new User(0,'','','','');
  isEnroll:boolean = false;
  id: number = 0;
  constructor(private route: ActivatedRoute, private courseService: CourseService,
    private userService: UserService, private course_studentsService: CourseStudentsService,
    private authService: AuthService, private router: Router
  ) {
    this.userService.user$.subscribe(
      user=>{this.user=user;
    console.log('User:', this.user.id);
    
    const courseId = this.route.snapshot.paramMap.get('id');
    this.id = courseId ? +courseId : 0;
    console.log('courseId:', courseId);
    this.loadCourse(this.id);
    this.isEnrollf();});
  }
  loadCourse(courseId:number) {
    if (courseId) {
      this.courseService.setCourseById(+courseId);
      this.courseService.course$.subscribe(course => {
        this.course = course;
      });
    }
  }

  isTeacher() { return this.authService.isTeacher()
    && this.userService.getUserId() === this.course?.teacherId;
   }

  enroll() {
    console.log('Enrolled in course:', this.course?.title);
    this.addStudentToCourse(this.course.id);
    this.isEnroll = true;
  }
  unEnroll(){
    this.RemoveStudentFromCourse(this.course.id);
    this.isEnroll = false;
  }
  isEnrollf(){
    console.log('u:',this.user.id,' c: ',this.id);
    this.course_studentsService.isStudentEnrolled(this.user.id,this.id).subscribe(
      isEnrolled => { 
        console.log('u:',this.user.id,' c: ',this.course.id,'isEnrolled:', isEnrolled);
        
        this.isEnroll = isEnrolled; });
  }
  addLesson() {
    console.log('Adding lesson to', this.course?.title);
    const currentUrl = this.router.url;
    
    if (!currentUrl.endsWith('/lesson-add')) {
      const newUrl = `${currentUrl}/lesson-add`;
      console.log(newUrl);
      this.router.navigateByUrl(newUrl);
    }
  }
  deleteCourse() {
    this.courseService.deleteCourse(this.course.id);
    console.log('Deleting lesson from', this.course?.title);
    this.router.navigateByUrl('/courses');
  }

  updateCourse() {
    if (!this.course) return;
  
    const newTitle = prompt('Edit Course Title:', this.course.title);
    const newDescription = prompt('Edit Course Description:', this.course.description);
  
    if (newTitle !== null && newDescription !== null) {
      const updatedCourse = { ...this.course, title: newTitle, description: newDescription };
      this.courseService.editCourse(this.course.id, updatedCourse);
    }
    this.loadCourse(this.id);
  }
  
  addStudentToCourse(courseId: number) {
    this.course_studentsService.addStudentToCourse(this.user.id, courseId);
  }

  RemoveStudentFromCourse(courseId: number) {
    this.course_studentsService.RemoveStudentFromCourse(this.user.id, courseId);
  }

 
}
