import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import 'rxjs/add/operator/map';

import {UserModel} from "../models/user.model";


@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }

  registerUser(user) {
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.post<UserModel>('http://localhost:3000/users/register', user, {headers: headers});
  }

  authenticateUser(user) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers});
  }

  getProfile() {
    let headers = new HttpHeaders({
      'Authorization': this.authToken,
      'Content-Type': 'application/json'
    });
    return this.http.get('http://localhost:3000/users/profile', {headers: headers});
  }

  storeUserData(token, user) {
    this.authToken = token;
    this.user = user;
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
