package com.bookstore.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.bookstore.domain.Order;
import com.bookstore.domain.User;

public interface OrderRepository extends CrudRepository<Order, Long> {
	List<Order> findByUser(User user);
}
