import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course';
import { CourseService } from '../service/course.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../service/token.service';
import {NewStudent} from '../models/new-student';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-course-student',
  templateUrl: './course-student.component.html',
  styleUrls: ['./course-student.component.css']
})
export class CourseStudentComponent implements OnInit {

  student: NewStudent[];
  courses: Course[];
  isAdmin = false;
  isLogged = false;
  nameUser = '';
  estudianteCurso;
  pageActual = 1;


  constructor(
    private courseService: CourseService,
    private studentService: AuthService,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) {
  }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.nameUser = this.tokenService.getUserName();
    } else {
      this.isLogged = false;
      this.nameUser = '';

    }
    this.isAdmin = true;
    this.listar();
  }

  listar(): void {

    this.studentService.list().subscribe(
      data => {
        this.student = data;
        if (!this.student) {
          return;
        }
        for (let i = 0; i < this.student.length; i++) {

          // tslint:disable-next-line:triple-equals
          if (this.student[i].nameUser == this.nameUser) {
            this.estudianteCurso = this.student[i];
          }
        }
        this.courseService.list().subscribe(
          // tslint:disable-next-line:no-shadowed-variable
          data => {

            if (this.estudianteCurso.courses.length > 0) {
              this.courses = this.estudianteCurso.courses;
              this.estudianteCurso.courses = this.courses;
            }
          },
          err => {
            console.log(err);
          }
        );
      },

      err => {
        console.log(err);
      }
    );
  }

  delete(id: number) {
    this.courseService.delete(id).subscribe(
      data => {
        this.toastr.success('Delete Course', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.listar();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

}
