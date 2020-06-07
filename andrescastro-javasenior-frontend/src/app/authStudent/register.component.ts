import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { NewStudent } from '../models/new-student';
import { ToastrService } from 'ngx-toastr';
import {RutValidator} from 'ng2-rut';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: NewStudent;
  rut: string;
  name: string;
  lastName: string;
  nameUser: string;
  age: number;
  password: string;
  errMsj: string;
  isLogged = false;
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private rutValidator: RutValidator,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  onRegister(): void {
    this.newUser = new NewStudent(this.rut, this.name, this.lastName , this.age, this.nameUser, this.password);
    this.authService.new(this.newUser).subscribe(
      data => {
        this.toastr.success('account created', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });

        this.router.navigate(['/login']);
      },
      err => {
        this.errMsj = err.error.mensaje;
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        // console.log(err.error.message);
      }
    );
  }

}
