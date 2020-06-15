import {Component, OnInit} from '@angular/core';
import {CourseService} from '../service/course.service';
import {AppService} from '../service/app.services';
import {Course} from '../models/course';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NewStudent} from "../models/new-student";
import {AuthService} from "../service/auth.service";
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css'],
  providers: [AppService]
})
export class NewCourseComponent implements OnInit {

  student: NewStudent[];
  name = '';
  code = '';
  isLogged = false;
  nameUser = '';
  estudianteCurso;

  constructor(
    private tokenService: TokenService,
    private studentService: AuthService,
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private toastr: ToastrService,
    private router: Router
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
    this.listar();
  }

  listar(): void {

    this.studentService.list().subscribe(

      data => {
        this.student = data;
        if(this.student)
        {

          for (let i = 0; i <this.student.length; i++) {

            if (this.student[i].nameUser == this.nameUser)
            {
              this.estudianteCurso = this.student[i];
            }
          }

        }
      },

      err => {
        console.log(err);
      }
    );
  }

  crearCurso(): void {

    let student = this.estudianteCurso;
    const course = new Course(this.name, this.code);

    let req = {
      course: course,
      student:student

    }


    this.courseService.save(req).subscribe(
      data => {
        this.toastr.success('Created Course', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/courseStudent']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        // this.router.navigate(['/']);
      }
    );

  }


}
