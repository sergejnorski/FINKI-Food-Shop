package com.finki.repository;

import com.finki.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart,Long>  {

    Cart findByCustomerId(Long userId);
}
