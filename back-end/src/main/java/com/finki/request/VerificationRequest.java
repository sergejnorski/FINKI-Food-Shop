package com.finki.request;

import lombok.Data;

@Data
public class VerificationRequest {

    private String email;

    private String verificationCode;
}