package com.bookstore.repository;

import org.springframework.data.repository.CrudRepository;

import com.bookstore.domain.ShippingAddress;

public interface ShippingAddressRepository extends CrudRepository<ShippingAddress, Long> {
	
}
