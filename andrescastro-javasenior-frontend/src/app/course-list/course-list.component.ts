import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course';
import { CourseService } from '../service/course.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../service/token.service';
import {NewStudent} from '../models/new-student';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

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
        if (this.student) {

          for (let i = 0; i < this.student.length; i++) {

            if (this.student[i].nameUser == this.nameUser) {
              this.estudianteCurso = this.student[i];
            }
          }
          this.courseService.list().subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            data => {
              // this.courses = data;

              if(this.estudianteCurso.courses > 0){
                this.courses = data;
                this.estudianteCurso.courses = this.courses;
              }

              // if (this.courses) {
              //   for (let i = 0; i < this.courses.length; i++) {
              //
              //     if (this.courses[i] == this.estudianteCurso.courses[i]) {
              //       if (this.estudianteCurso.courses.length > 1) {
              //         this.courses = [];
              //       } else {
              //         this.estudianteCurso.courses = this.courses[i];
              //
              //       }
              //     }
              //   }
              // }
            },
            err => {
              console.log(err);
            }
          );
        }
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
