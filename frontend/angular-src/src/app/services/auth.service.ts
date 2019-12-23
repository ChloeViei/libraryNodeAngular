import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {tokenNotExpired} from 'angular2-jwt';

import { UserModel } from "../models/user.model";

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http:HttpClient) { }

  // Add user in storage
  registerUser(user): Observable<UserModel> {
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.post<UserModel>('http://localhost:3000/users/register', user, {headers: headers});
  }

  // Check if user exist
  authenticateUser(user): Observable<UserModel> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<UserModel>('http://localhost:3000/users/authenticate', user, {headers: headers});
  }

  // Get profil of user
  getProfile(): Observable<UserModel> {
    let headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get<UserModel>('http://localhost:3000/users/profile', {headers: headers});
  }

  storeUserData(token: string, user: object) {
    this.authToken = token;
    this.user = user;
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
