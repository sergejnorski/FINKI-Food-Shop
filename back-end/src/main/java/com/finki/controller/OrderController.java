package com.finki.controller;

import com.finki.model.Order;
import com.finki.model.User;
import com.finki.request.OrderRequest;
import com.finki.response.PaymentResponse;
import com.finki.service.OrderService;
import com.finki.service.PaymentService;
import com.finki.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;
    private final PaymentService paymentService;

    public OrderController(OrderService orderService, UserService userService, PaymentService paymentService) {
        this.orderService = orderService;
        this.userService = userService;
        this.paymentService = paymentService;
    }

    @PostMapping("/order/payment")
    public ResponseEntity<PaymentResponse> createPaymentLink(
            @RequestBody OrderRequest orderRequest,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        PaymentResponse paymentResponse=paymentService.createPaymentLink(orderRequest);

        return new ResponseEntity<>(paymentResponse, HttpStatus.CREATED);
    }

    @PostMapping("/order/create")
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest req, @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        Order order = orderService.createOrder(req,user);

        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    @GetMapping("/order/user")
    private ResponseEntity<List<Order>> getOrderHistory(@RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        List<Order> orders = orderService.getUsersOrder(user.getId());

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

}
