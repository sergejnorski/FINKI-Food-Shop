package com.finki.response;

import com.finki.model.Address;
import lombok.Data;

@Data
public class PaymentResponse {

    private String paymentUrl;

    private boolean paymentSuccess;

    private Address address;
}