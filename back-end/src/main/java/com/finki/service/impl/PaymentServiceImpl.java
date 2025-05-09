package com.finki.service.impl;

import com.finki.repository.OrderRepository;
import com.finki.request.OrderRequest;
import com.finki.response.PaymentResponse;
import com.finki.service.PaymentService;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.stripe.Stripe;
import com.stripe.model.checkout.Session;

import java.net.Proxy;
import java.util.Collections;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final OrderRepository orderRepository;

    @Value("${STRIPE_API_KEY}")
    private String stripeApiKey;

    @Value("${BASE_URL}")
    private String baseUrl;

    public PaymentServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public PaymentResponse createPaymentLink(OrderRequest orderRequest) throws Exception {

        Stripe.apiKey = stripeApiKey;

        Proxy proxy = Proxy.NO_PROXY;

        Proxy.Type proxyType = proxy.type();

        SessionCreateParams params = SessionCreateParams.builder()
                .addAllPaymentMethodType(Collections.singletonList(SessionCreateParams.PaymentMethodType.CARD))
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(baseUrl + "/success-payment")
                .setCancelUrl(baseUrl + "/fail-payment/")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("lkr")
                                .setUnitAmount(orderRequest.getTotal() * 100)
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder().setName("Fast Food").build())
                                .build()
                        ).build()
                ).build();

        Session session = Session.create(params);

        PaymentResponse paymentResponse = new PaymentResponse();
        paymentResponse.setPaymentUrl(session.getUrl());
        paymentResponse.setAddress(orderRequest.getDeliveryAddress());

        return paymentResponse;
    }
}
