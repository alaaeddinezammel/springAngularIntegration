package com.bookstore.repository;

import org.springframework.data.repository.CrudRepository;

import com.bookstore.domain.PaymentU;

public interface PaymentRepository extends CrudRepository<PaymentU, Long>{

}
