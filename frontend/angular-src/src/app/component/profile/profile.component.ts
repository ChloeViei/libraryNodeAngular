import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  localUser: Object;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authService.getProfile().subscribe(
      profile => {
        this.localUser = profile.user;
      },
      err => {
        console.log(err);
        return false;
      });
  }

}
