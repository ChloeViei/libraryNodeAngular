import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import 'rxjs/Rx';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs/Observable';

import { UserModel } from "../models/user.model";

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http:HttpClient) { }

  registerUser(user): Observable<UserModel> {
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.post<UserModel>('http://localhost:3000/users/register', user, {headers: headers});
  }

  authenticateUser(user): Observable<UserModel> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<UserModel>('http://localhost:3000/users/authenticate', user, {headers: headers});
  }

  getProfile() {
    let headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers: headers});
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

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
