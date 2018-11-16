package com.bookstore.service;

import java.util.List;

import com.bookstore.domain.Book;
import com.bookstore.domain.CartItem;
import com.bookstore.domain.ShoppingCart;
import com.bookstore.domain.User;

public interface CartItemService {
	
	CartItem addBookToCartItem(Book book, User user, int qty);
	
	List<CartItem> findByShoppingCart(ShoppingCart shoppingCart);
	
//	List<CartItem> findByOrder(Order order);
	
	CartItem updateCartItem(CartItem cartItem);
	
	void removeCartItem(CartItem cartItem);
	
	CartItem findById(Long id);
	
	CartItem save(CartItem cartItem);

}
