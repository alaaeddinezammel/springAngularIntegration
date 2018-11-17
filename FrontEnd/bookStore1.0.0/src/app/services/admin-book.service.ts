import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Book} from '../models/book';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';

@Injectable()
export class AdminBookService {

  constructor(private http:Http) { }

  sendBook(book:Book) {
  	let url = "http://localhost:8181/book/add";
    
    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(book), {headers: headers}) .map(response => response);
  }

  sendBookU(book:Book) {
  	let url = "http://localhost:8181/book/update";
    
    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(book), {headers: headers});
  }
getBookList():Observable<Book[]> {
  	let url = "http://localhost:8181/book/bookList";
    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, {headers: headers}).delay(5000)
      .map(response => response.json() as Book[]);;
  }

   getBook(id:number): Observable<Book> {
  	let url = "http://localhost:8181/book/"+id;
    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, {headers: headers}).map(response => response.json() as Book);;
  }

   sendBookR(bookId: number) {
  	let url = "http://localhost:8181/book/remove";
    
    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, bookId, {headers: headers}).map(response => response);
  }


}
