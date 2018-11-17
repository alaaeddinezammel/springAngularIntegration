import { Component, OnInit } from '@angular/core';
import {LoginService} from '.././services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public credential = {'username':'', 'password' : ''};
  public loggedIn = false;

  constructor(public loginService: LoginService) { }

  onSubmit() {
  	this.loginService.sendCredential(this.credential.username, this.credential.password).subscribe(
  		res => {
  			console.log(res);
  			localStorage.setItem("xAuthToken", res.json().token);
  			this.loggedIn = true;
  			location.reload();
  		},
  		error => {
  			console.log(error);
  		}
  	);
  }

  ngOnInit() {
  	this.loginService.checkSession().subscribe(
  		res => {
  			this.loggedIn=true;
  		},
  		error => {
  			this.loggedIn=false;
  		}
  	);
  }

}
