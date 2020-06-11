import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) {
  }
  create(req): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      const url = 'http://localhost:9090/auth/create';
      this.http.post(url, req, {headers}).toPromise()
        .then(
          res => {
            console.log(res);
            resolve(res);
          },
          msg => {
            reject(msg);
          }
        );
    });
    return promise;
  }




}
