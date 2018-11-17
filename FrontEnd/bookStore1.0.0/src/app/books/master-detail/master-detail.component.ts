import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { AdminBookService } from '../../services/admin-book.service';
import {Http} from '@angular/http';
import {AppConst} from '../../constants/app-const';
import { CartService } from '../../services/cart.service';
import {Params, ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../services/login.service';


@Component({
  selector: 'bl-master-detail',
  styleUrls: ['./master-detail.component.scss'],
  templateUrl: './master-detail.component.html'
})
export class MasterDetailComponent implements OnInit {
  booksList: Book[] = [];
  selectedBook: Book;
  spinnerVisibility = 'block';
  serverPath='http://127.0.0.1:8181';
  public numberList: number[] = [1,2,3,4,5,6,7,8,9];
  public qty: number;

  public addBookSuccess: boolean = false;
  public notEnoughStock:boolean = false;

public loggedIn:boolean=false;



  constructor(public adminbookservice: AdminBookService,
    public cartService: CartService,
    public router:Router,
    public http:Http,
    public route:ActivatedRoute,
    public loginservice:LoginService
    ) { }


  onAddToCart() {
    this.cartService.addItem(this.selectedBook.id, this.qty).subscribe(
      res => {
        console.log(res.text());
        this.addBookSuccess=true;
      },
      err => {
        console.log(err.text());
        this.notEnoughStock=true;
      }
    );
  }


  ngOnInit() {
  this.loginservice.checkSession().subscribe(
      res => {
        this.loggedIn=true;
      },
      error => {
        this.loggedIn=false;
      }
    );



    this.adminbookservice
      .getBookList()
      .subscribe(response => {
        this.booksList = response;
        this.spinnerVisibility = 'none';
      });
        this.qty = 1;
  }
}
