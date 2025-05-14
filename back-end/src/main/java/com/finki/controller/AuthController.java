package com.finki.controller;

import com.finki.model.User;
import com.finki.request.*;
import com.finki.response.AuthResponse;
import com.finki.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@Valid @RequestBody User user) throws Exception {
        AuthResponse authResponse = authService.signUp(user);
        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest req) throws Exception {
        AuthResponse authResponse = authService.signIn(req);
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @PostMapping("/verify")
    public ResponseEntity<AuthResponse> verifyEmail(@RequestBody VerificationRequest req) throws Exception {
        AuthResponse authResponse = authService.verifyEmail(req);
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @PostMapping("/resend-verification")
    public ResponseEntity<AuthResponse> resendVerification(@RequestBody ResendVerificationRequest req)
            throws Exception {
        AuthResponse authResponse = authService.resendVerificationCode(req);
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<AuthResponse> forgotPassword(@RequestBody ForgotPasswordRequest req) throws Exception {
        AuthResponse authResponse = authService.forgotPassword(req);
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<AuthResponse> resetPassword(@RequestBody ResetPasswordRequest req) throws Exception {
        AuthResponse authResponse = authService.resetPassword(req);
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
