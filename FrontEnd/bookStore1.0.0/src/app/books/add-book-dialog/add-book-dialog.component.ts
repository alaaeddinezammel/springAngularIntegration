import { Component , OnInit , NgZone } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { Book } from '../../models/book';
import {AdminBookService} from '../../services/admin-book.service';
import {UploadImageService} from '../../services/upload-image.service';



@Component({
  selector: 'add-book-dialog',
  styleUrls: ['./add-book-dialog.component.scss'],
  templateUrl: './add-book-dialog.component.html'
})
export class AddBookDialogComponent implements OnInit {

  public newBook: Book = new Book();
  public bookAdded: boolean;	

  constructor(public dialogRef: MatDialogRef<AddBookDialogComponent>,public Adminbookservice:AdminBookService,
   public uploadImageService:UploadImageService,
       public zone: NgZone) {}




onSubmit() {

  	this.Adminbookservice.sendBook(this.newBook).subscribe(

  		res => {

  			this.uploadImageService.upload(JSON.parse(JSON.parse(JSON.stringify(res))._body).id);
        

  			this.bookAdded=true;
  			this.newBook = new Book();
  			this.newBook.active=true;
  			this.newBook.category="Management";
  			this.newBook.language="english";
  			this.newBook.format="paperback";

  			this.dialogRef.close('Pizza!');
  		},
  		error => {
  			console.log(error);
  		}
		  
  	);
  }


  ngOnInit() {
    this.dialogRef.updateSize('60%', '100%');

  	this.bookAdded=false;
  	this.newBook.active=true;
  	this.newBook.category="Management";
  	this.newBook.language="english";
  	this.newBook.format="paperback";
  }








}
