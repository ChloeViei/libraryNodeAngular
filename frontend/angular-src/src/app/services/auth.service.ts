import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired } from 'angular2-jwt';

import { UserModel } from "../models/user.model";
import { LocalUserModel } from "../models/local-user.model";

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

  // Get profile of user
  getProfile(): Observable<LocalUserModel> {
    this.onLoadUserData();
    let headers = new HttpHeaders({
      'Authorization': this.authToken,
      'Content-type': 'application/json'
    });
    return this.http.get<LocalUserModel>('http://localhost:3000/users/profile', {headers: headers});
  }

  storeUserData(token: string, user: object) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  onLoadUserData() {
    this.authToken = localStorage.getItem('id_token');
    this.user = localStorage.getItem('user');
  }

  loggedIn() {
    return true;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
