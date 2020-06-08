import { Component, OnInit } from '@angular/core';
import { NewStudent } from '../models/new-student';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-new-student-list',
  templateUrl: './student-list.component.html'
})
export class StudentListComponent implements OnInit {

  students: NewStudent[] = [];

  constructor(
    private studentService: AuthService,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.list().subscribe(
      data => {
        this.students = data;
      },
      err => {
        console.log(err);
      }
    );
  }


}
