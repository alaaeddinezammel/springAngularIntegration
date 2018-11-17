import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { AdminBookService } from '../../services/admin-book.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'bl-list',
  styleUrls: ['./list.component.scss'],
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  booksList: Book[] = [];
  selectedBook: Book;
  spinnerVisibility = 'block';
  serverPath='http://127.0.0.1:8181';

  constructor(public adminbookservice: AdminBookService, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.adminbookservice
      .getBookList()
      .subscribe(response => {
        this.booksList = response;
        this.spinnerVisibility = 'none';
      });
  }

  deleteBook(id: number) {
    this.booksList = this.booksList.filter(book => book.id !== id);
    this.adminbookservice.sendBookR(id)
      .subscribe(result => {
        if (result.ok) {
          this.openSnackBar();
        }
        this.getBooks();
      });
  }

  openSnackBar() {
    this.snackBar.open('Book Deleted', 'CLOSE', {
      duration: 1000
    });
  }
}
