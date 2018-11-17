package com.bookstore.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

	@RequestMapping({ "/books", "/registration", "/login", "/myAccount", "/myProfile", "/shoppingCart", "/checkout",
			"/logout", "/orderSummary" })
	public String index() {
		return "forward:/index.html";
	}
}
