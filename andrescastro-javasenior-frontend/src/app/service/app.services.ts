import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) {
  }

  consultar(rut): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      let req;
      req = {}
      // const url = environment.bffUrl + '/api/wpay/pagar';
      const url = 'http://localhost:9090/client/' + rut;
      this.http.get(url, req).toPromise()
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

  editar(req): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      // const url = environment.bffUrl + '/api/wpay/pagar';
      const url = 'http://localhost:9090/client/editar';
      this.http.put(url, req, {headers}).toPromise()
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

  agregar(req): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      // const url = environment.bffUrl + '/api/wpay/pagar';
      const url = 'http://localhost:9090/client/';
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
