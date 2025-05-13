package com.finki.service;

import com.finki.model.User;
import com.finki.request.LoginRequest;
import com.finki.request.ResendVerificationRequest;
import com.finki.request.VerificationRequest;
import com.finki.request.ForgotPasswordRequest;
import com.finki.request.ResetPasswordRequest;
import com.finki.response.AuthResponse;

public interface AuthService {

    AuthResponse signUp(User user) throws Exception;

    AuthResponse signIn(LoginRequest request) throws Exception;

    AuthResponse verifyEmail(VerificationRequest request) throws Exception;

    AuthResponse resendVerificationCode(ResendVerificationRequest request) throws Exception;

    AuthResponse forgotPassword(ForgotPasswordRequest request) throws Exception;

    AuthResponse resetPassword(ResetPasswordRequest request) throws Exception;
}