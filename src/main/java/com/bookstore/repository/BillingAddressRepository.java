package com.bookstore.repository;

import org.springframework.data.repository.CrudRepository;

import com.bookstore.domain.BillingAddress;

public interface BillingAddressRepository extends CrudRepository<BillingAddress, Long>{

}
