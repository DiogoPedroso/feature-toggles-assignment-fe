import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Authentication } from '../models/authentication';
import { environment as env } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    const headers: HttpHeaders = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );

    return this.http
      .post<Authentication>(
        `${env.authAPIURL}/authenticate`,
        { username: username, password: password },
        { headers: headers }
      )
      .pipe(
        tap((res) => {
          const helper = new JwtHelperService();
          if (helper.decodeToken(res.token.valueOf()).isAdmin) {
            localStorage.setItem('token', res.token.valueOf());
          } else {
            throw Error('not_admin');
          }
        }),
        catchError((err) => {
          return throwError(err);
        })
      )
      .toPromise();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  isTokenValid(): boolean {
    const helper = new JwtHelperService();
    if (this.getToken() === null) {
      return false;
    }
    return helper.decodeToken(this.getToken()).isAdmin;
  }
}
