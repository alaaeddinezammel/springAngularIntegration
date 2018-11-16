package com.bookstore.service;

import com.bookstore.domain.BillingAddress;
import com.bookstore.domain.Order;
import com.bookstore.domain.PaymentU;
import com.bookstore.domain.ShippingAddress;
import com.bookstore.domain.ShoppingCart;
import com.bookstore.domain.User;

public interface OrderService {
	
	Order createOrder(
			ShoppingCart shoppingCart,
			ShippingAddress shippingAddress,
			BillingAddress billingAddress,
			PaymentU paymentU,
			String shippingMethod,
			User user
	);

}
