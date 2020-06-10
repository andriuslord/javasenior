import {Component, OnInit, Input} from '@angular/core';
import {CourseService} from '../service/course.service';
import {AppService} from '../service/app.services';
import {Course} from '../models/course';
import {ToastrService} from 'ngx-toastr';
import {AppCtrl} from "../controller/app.vacante.ctrl";
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NewStudent} from "../models/new-student";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css'],
  providers: [AppService]
})
export class NewCourseComponent implements OnInit {

  @Input() students: NewStudent[];
  name = '';
  code = '';
  rut = '';

  constructor(
    private studentService: AuthService,
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private appService: AppService,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.listar();
  }

  listar(): void {
    this.studentService.list().subscribe(
      data => {
        this.students = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  crearCurso(): void {

    let studs = this.students;
    const course = new Course(this.name, this.code);

    let req = {
      course: course,
      students: studs
    }


    this.courseService.save(req).subscribe(
      data => {
        this.toastr.success('Created Course', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/list']);
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
