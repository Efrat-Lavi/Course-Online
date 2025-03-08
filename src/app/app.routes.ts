import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { CoursesComponent } from '../components/courses/courses.component';
import { LoginComponent } from '../components/login/login.component';
import { CourseDetailsComponent } from '../components/course-detailes/course-detailes.component';
import { AddCourseComponent } from '../components/add-course/add-course.component';
import { UserListComponent } from '../components/users/users.component';
import { LessonDetailsComponent } from '../components/lesson-details/lesson-details.component';
import { AddLessonComponent } from '../components/add-lesson/add-lesson.component';
import { LessonsComponent } from '../components/lessons/lessons.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent, children: [
            { path: 'courses', component: CoursesComponent },
            { path: 'login', component: LoginComponent }, 
            { path: 'courses/:id', component:CourseDetailsComponent},
            { path: 'courses/:id/lessons/:id', component:LessonDetailsComponent },
            { path: 'courses/:id/lessons', component:LessonsComponent },
            { path: 'courses/:id/lesson-add', component:AddLessonComponent },
            { path: 'courses-add', component:AddCourseComponent },
            { path: 'users', component:UserListComponent },

        ]
    },

];
