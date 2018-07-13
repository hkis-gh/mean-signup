import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {config as app_config} from '../app.config';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  loginerror;
  constructor(private http: HttpClient, public route: Router) { }

  ngOnInit() {
  }

  register() {
    this.http.post(`${app_config.API_BASE_URL}/users/userRegister`, this.model, httpOptions).subscribe(res => {
      this.route.navigate(['/login']);
    }, error => {
      this.loginerror = 'Failed to register!';
    });
  }
}
