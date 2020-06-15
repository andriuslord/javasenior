import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Course } from '../models/course';
import {TokenService} from '../service/token.service';
import {NewStudent} from '../models/new-student';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  course: Course[];
  student: NewStudent[];
  isLogged = false;
  nameUser = '';
  pageActual = 1;


  constructor(
    private tokenService: TokenService,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.nameUser = this.tokenService.getUserName();
    } else {
      this.isLogged = false;
      this.nameUser = '';

    }
    this.courseService.list().subscribe(
      data => {
        this.course = data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.return();
      }
    );
  }

  return(): void {
    this.router.navigate(['/list']);
  }

}
