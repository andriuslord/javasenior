import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course';
import { CourseService } from '../service/course.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: Course[] = [];
  roles: string[];
  isAdmin = false;

  constructor(
    private courseService: CourseService,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.loadCourses();
    // this.roles = this.tokenService.getAuthorities();
    this.isAdmin = true;
    // this.roles.forEach(rol => {
    //   // if (rol === 'ROLE_ADMIN') {
    //   //   this.isAdmin = true;
    //   // }
    // });
  }

  loadCourses(): void {
    this.courseService.list().subscribe(
      data => {
        this.courses = data;
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
        this.loadCourses();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

}
