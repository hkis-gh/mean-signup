import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {config as app_config} from '../app.config';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  loginerror;
  constructor(private http: HttpClient, public route: Router) { }

  ngOnInit() {
  }

  login() {
    this.http.post(`${app_config.API_BASE_URL}/users/userLogin`, this.model, httpOptions).subscribe((res: any) => {
      if (res) {
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('token', res.token);
        this.route.navigate(['']);
      }
    }, error => {
        this.loginerror = 'Login Failed!';
    });
  }
}
