package com.bookstore.resource;


import java.security.Principal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.domain.BillingAddress;
import com.bookstore.domain.CartItem;
import com.bookstore.domain.Order;
import com.bookstore.domain.PaymentU;
import com.bookstore.domain.ShippingAddress;
import com.bookstore.domain.ShoppingCart;
import com.bookstore.domain.User;
import com.bookstore.paypal.config.PaypalPaymentIntent;
import com.bookstore.paypal.config.PaypalPaymentMethod;
import com.bookstore.paypal.config.URLUtils;
import com.bookstore.repository.OrderRepository;
import com.bookstore.service.CartItemService;
import com.bookstore.service.OrderService;
import com.bookstore.service.ShoppingCartService;
import com.bookstore.service.UserService;
import com.bookstore.utility.MailConstructor;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import com.bookstore.service.impl.PaypalService;


@RestController
@RequestMapping("/")
public class CheckoutResource {
	private Order order = new Order();
	
	@Autowired
	private JavaMailSender mailSender;
	
	@Autowired
	private UserService userService;
	

	
	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private CartItemService cartItemService;
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private ShoppingCartService shoppingCartService;
	
	@Autowired
	private MailConstructor mailConstructor;
	
	public static final String PAYPAL_SUCCESS_URL = "http://localhost:4200/myProfile";
	public static final String PAYPAL_CANCEL_URL = "http://localhost:4200/books";


	
	private Logger log = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private PaypalService paypalService;
	
	@RequestMapping(value = "/pay", method=RequestMethod.POST)
	public String checkoutPost(
				@RequestBody HashMap<String, Object> mapper,
				Principal principal,
				HttpServletRequest request
			){
		
		ObjectMapper om = new ObjectMapper();
		
		ShippingAddress shippingAddress = om.convertValue(mapper.get("shippingAddress"), ShippingAddress.class);
		BillingAddress billingAddress = om.convertValue(mapper.get("billingAddress"), BillingAddress.class);
		PaymentU payment = om.convertValue(mapper.get("payment"), PaymentU.class);
		String shippingMethod = (String) mapper.get("shippingMethod");
		
		ShoppingCart shoppingCart = userService.findByUsername(principal.getName()).getShoppingCart();
		List<CartItem> cartItemList = cartItemService.findByShoppingCart(shoppingCart);
		User user = userService.findByUsername(principal.getName());
		Order order = orderService.createOrder(shoppingCart, shippingAddress, billingAddress, payment, shippingMethod, user);
		
		mailSender.send(mailConstructor.constructOrderConfirmationEmail(user, order, Locale.ENGLISH));
		
	
		
		shoppingCartService.clearShoppingCart(shoppingCart);
		
		LocalDate today = LocalDate.now();
		LocalDate estimatedDeliveryDate;
		if (shippingMethod.equals("groundShipping")) {
			estimatedDeliveryDate=today.plusDays(5);
		} else {
			estimatedDeliveryDate=today.plusDays(3);
		}
		
		this.order = order;
		System.out.println("--------------------------------------------------------------------------------");
//paypal
		String cancelUrl = "http://localhost:4200/books";
		String successUrl = "http://localhost:4200/orderSummary";
		try {
			Payment payment2 = paypalService.createPayment(
					order.getOrderTotal().doubleValue(), 
					"USD", 
					PaypalPaymentMethod.paypal, 
					PaypalPaymentIntent.sale,
					"Safe Payment with Paypal", 
					cancelUrl, 
					successUrl);
	//		Payment.list(apiContext, containerMap);
			order.setPaypalPaymentId(payment2.getId());
			for(Links links : payment2.getLinks()){
				if(links.getRel().equals("approval_url")){
					return links.getHref();
				}
			}
		} catch (PayPalRESTException e) {
			log.error(e.getMessage());
		}
		return "redirect:/";
	}

	
	@RequestMapping(method = RequestMethod.GET, value = PAYPAL_CANCEL_URL)
	public String cancelPay(){
		return "http://localhost:4200/books";
	}

	@RequestMapping(method = RequestMethod.GET, value = PAYPAL_SUCCESS_URL)
	public String successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId){
		try {
			Payment payment = paypalService.executePayment(paymentId, payerId);
			System.out.println();
			if(payment.getState().equals("approved")){
				return "http://localhost:4200/myProfile";
			}
		} catch (PayPalRESTException e) {
			log.error(e.getMessage());
		}
		return "redirect:/";
	}

}
