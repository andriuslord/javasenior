import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewStudent } from '../models/new-student';
import { Observable } from 'rxjs';
import { LoginStudent } from '../models/login-student';
import { JwtDTO } from '../models/jwt-dto';
import {Course} from "../models/course";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'http://localhost:9090/auth/';

  constructor(private httpClient: HttpClient) { }

  public new(newUser: NewStudent): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'new', newUser);
  }

  public login(loginStudent: LoginStudent): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + 'login', loginStudent);
  }

    public list(): Observable<NewStudent[]> {
      return this.httpClient.get<NewStudent[]>(this.authURL + 'list');

  }
}
