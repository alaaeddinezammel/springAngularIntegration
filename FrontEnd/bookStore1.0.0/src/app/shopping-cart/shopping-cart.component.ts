import { Component, OnInit } from '@angular/core';
import { AppConst } from '.././constants/app-const';
import { Router } from '@angular/router';
import { Book } from '.././models/book';
import { CartService } from '.././services/cart.service';
import { ShoppingCart } from '.././models/shopping-cart';
import { CartItem } from '.././models/cart-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
	public serverPath = AppConst.serverPath;
	public selectedBook: Book;
	public cartItemList: CartItem[] = [];
	public cartItemNumber: number;
	public shoppingCart: ShoppingCart = new ShoppingCart();
	public cartItemUpdated: boolean;
	public emptyCart: boolean;
	public notEnoughStock: boolean;

  constructor(
  		public router:Router,
  		public cartService: CartService
  	) { }

  onSelect(book:Book) {
  	this.selectedBook = book;
  	this.router.navigate(['/bookDetail', this.selectedBook.id]);
  }

  onRemoveCartItem(cartItem: CartItem) {
  	this.cartService.removeCartItem(cartItem.id).subscribe(
  		res => {
  			console.log(res.text());
  			this.getCartItemList();
  			this.getShoppingCart();
  		},
  		error => {
  			console.log(error.text());
  		}
  	);
  }

  onUpdateCartItem(cartItem: CartItem) {
  	this.cartService.updateCartItem(cartItem.id, cartItem.qty).subscribe(
  		res => {
  			console.log(res.text());
  			this.cartItemUpdated=true;
  			this.getShoppingCart();
  		},
  		error => {
  			console.log(error.text());
  		}
  	)
  }

  getCartItemList()  {
  	this.cartService.getCartItemList().subscribe(
  		res => {
        console.log(res);
  			this.cartItemList=res.json();
  			this.cartItemNumber = this.cartItemList.length;
  		},
  		error => {
  			console.log(error.text());
  		}
  	)
  }

  getShoppingCart() {
  	this.cartService.getShoppingCart().subscribe(
  		res => {
  			console.log(res.json());
  			this.shoppingCart=res.json();
  		},
  		error => {
  			console.log(error.text());
  		}
  	)
  }

  onCheckout() {
  	if(this.cartItemNumber==0) {
  		this.emptyCart=true;
  	} else {
  		for (let item of this.cartItemList) {
  			if (item.qty > item.book.inStockNumber) {
  				console.log("not enough stock on some item");
  				this.notEnoughStock=true;
  				return;
  			}
  		}

			// this.router.navigate('[/order]');
  	}
  }

  ngOnInit() {
  	this.getCartItemList();
  	this.getShoppingCart();
  }

}
