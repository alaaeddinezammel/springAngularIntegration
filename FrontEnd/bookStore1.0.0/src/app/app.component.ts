import { Component,OnInit } from '@angular/core';
import {MatDialog, MatSnackBar } from '@angular/material';
import { AddBookDialogComponent, BookStoreService } from './books';
import 'rxjs/add/operator/switchMap';
import {LoginService} from './services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
  
  mat-sidenav {
    width: 300px;
  }
  `]
})
export class AppComponent implements OnInit{
  links = [
  { name: 'Books', path: 'books' },
  { name: 'My Profile', path: 'myProfile' }

  ];
  public loggedIn = false;


  constructor(public router:Router, public loginService: LoginService, public dialog: MatDialog, public snackBar: MatSnackBar, public bookStoreService: BookStoreService) {
  }

  logout() {
    this.loginService.logout().subscribe(
      res => {
        location.reload();
      },
      error => {
        console.log(error);
      }
      );

    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.loginService.checkSession().subscribe(
      res => {
        this.loggedIn=true;
      },
      error => {
        this.loggedIn=false;

   this.snackBar.open('You Should login to purchase Books', 'CLOSE', {
     
    });
      }
      );
  }

  openAddBookDialog() {
    this.dialog.open(AddBookDialogComponent)
    .afterClosed()
  //  .filter(book => !!book)
    .switchMap(book => this.bookStoreService.addBook(book))
    .subscribe(result => {
      if (result.ok) {
        this.openSnackBar();
      }
    });
  }

  openSnackBar() {
    this.snackBar.open('Book Added', 'CLOSE', {
      duration: 1000
    });
  }




}
