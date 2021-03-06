import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { NewCourseComponent } from './course-new/new-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './authStudent/login.component';
import { RegisterComponent } from './authStudent/register.component';
import {StudentListComponent} from './authStudent/student-list.component';
import {CourseStudentComponent} from './course-student/course-student.component';




const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'list', component: CourseListComponent, },
  { path: 'listStudent', component: StudentListComponent, },
  { path: 'detail/:id', component: CourseDetailComponent, },
  { path: 'new', component: NewCourseComponent,  },
  { path: 'courseStudent', component: CourseStudentComponent,  },
  { path: 'edit/:id', component: EditCourseComponent, },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
