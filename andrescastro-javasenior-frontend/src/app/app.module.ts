import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CourseListComponent} from './course-list/course-list.component';
import {StudentListComponent} from './authStudent/student-list.component';
import {CourseDetailComponent} from './course-detail/course-detail.component';
import {NewCourseComponent} from './course-new/new-course.component';
import {EditCourseComponent} from './edit-course/edit-course.component';
import {interceptorProvider} from './interceptors/prod-interceptor.service';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

// external
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {LoginComponent} from './authStudent/login.component';
import {RegisterComponent} from './authStudent/register.component';
import {MenuComponent} from './menu/menu.component';
import {IndexComponent} from './index/index.component';
import {Ng2Rut} from 'ng2-rut';


@NgModule({
  declarations: [
    AppComponent,
    CourseListComponent,
    CourseDetailComponent,
    NewCourseComponent,
    EditCourseComponent,
    StudentListComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    Ng2Rut,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
}
