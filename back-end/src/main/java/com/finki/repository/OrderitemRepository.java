package com.finki.repository;

import com.finki.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderitemRepository extends JpaRepository<OrderItem,Long> {
}
