import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/course.service';
import { AppService } from '../service/app.services';
import { Course } from '../models/course';
import { ToastrService } from 'ngx-toastr';
import {AppCtrl} from "../controller/app.vacante.ctrl";
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/core";

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course1.component.html',
  styleUrls: ['./new-course.component.css'],
  providers: [AppService]
})
export class NewCourseComponent implements OnInit {

  name = '';
  code = '';

  public createForm: FormGroup;
  public errorCreateCourse: any;
  private studentLocalStorage: string;
  private showFormStudent: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private appService: AppService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  get f() {
    return this.createForm.controls;
  }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      name: ['',],
      code: ['',],
      rut: ['',
        [Validators.required]],
      nameUeer: ['',
        [Validators.required]],
      lastName: ['',
        [Validators.required]]
    });
    this.studentLocalStorage = localStorage.getItem("studentName");
    if (this.studentLocalStorage === null) {
      this.showFormStudent = true;
    } else {
      this.createForm.controls.rut.setValue(localStorage.getItem("studentRut"))
      this.createForm.controls.nameStudent.setValue(localStorage.getItem("studentName"))
      this.createForm.controls.nameUserStudent.setValue(localStorage.getItem("studentNameUser"))
    }
  }
  async onSubmit() {
    let reqStudent;
    if (this.studentLocalStorage) {
      reqStudent = {
        "name": localStorage.getItem("studentName"),
        "nameUser": localStorage.getItem("StudentNameUser"),
        "rut": localStorage.getItem("studentRut"),
      }
    } else {
      reqStudent = {
        "rut": this.f.rutStudent.value,
        "name": this.f.nameStudent.value,
        "userName": this.f.userNameStudent.value
      }
    }

    const createReq = {
      "course": {
        "name": this.f.name.value,
        "code": this.f.code.value
      },
      "student": reqStudent
    };

    const jsonToTrace = JSON.stringify(createReq);
    console.log('jsonToTrace -> ', jsonToTrace);

    let service;
    let response;
    service = new AppCtrl(this.appService);
    response = await service.create(createReq);
    console.log("response -> ", response);
    // FIXME ???
    if (response.errorCode == -99) {
      this.errorCreateCourse = {
        code: '0003',
        desc: 'Producto no existe !!!',
      }
    }
  }

  onCreate(): void {
    const course = new Course(this.name, this.code);
    this.courseService.save(course).subscribe(
      data => {
        this.toastr.success('Created Course', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/list']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        // this.router.navigate(['/']);
      }
    );
  }


}
