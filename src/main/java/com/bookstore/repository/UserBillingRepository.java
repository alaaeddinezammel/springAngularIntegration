package com.bookstore.repository;

import org.springframework.data.repository.CrudRepository;

import com.bookstore.domain.UserBilling;

public interface UserBillingRepository extends CrudRepository<UserBilling, Long> {

}
