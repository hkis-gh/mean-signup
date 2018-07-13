import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username = '';
  users: any = [];
  constructor(private http: HttpClient, public route: Router) {
    if (localStorage.getItem("token")) {
      this.username = localStorage.getItem("username");
      this.getAllUsers();
    }
  }

  ngOnInit() {
  }

  getAllUsers() {
    this.http.get('http://localhost:3000/users/getUsers').subscribe(res => {
      this.users = res;
    });
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }

}
