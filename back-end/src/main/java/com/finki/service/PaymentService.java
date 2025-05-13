package com.finki.service;

import com.finki.request.OrderRequest;
import com.finki.response.PaymentResponse;

public interface PaymentService {

    PaymentResponse createPaymentLink(OrderRequest orderRequest) throws Exception;
}
