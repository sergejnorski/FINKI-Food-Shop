package com.finki.service.impl;

import com.finki.config.JwtProvider;
import com.finki.model.Cart;
import com.finki.model.PasswordResetToken;
import com.finki.model.USER_ROLE;
import com.finki.model.User;
import com.finki.repository.CartRepository;
import com.finki.repository.PasswordResetTokenRepository;
import com.finki.repository.UserRepository;
import com.finki.request.LoginRequest;
import com.finki.request.ResendVerificationRequest;
import com.finki.request.VerificationRequest;
import com.finki.request.ForgotPasswordRequest;
import com.finki.request.ResetPasswordRequest;
import com.finki.response.AuthResponse;
import com.finki.service.AuthService;
import com.finki.service.EmailService;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Random;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final CustomUserDetailsService customUserDetailsService;
    private final CartRepository cartRepository;
    private final EmailService emailService;
    private final PasswordResetTokenRepository passwordResetTokenRepository;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtProvider jwtProvider,
            CustomUserDetailsService customUserDetailsService, CartRepository cartRepository,
            EmailService emailService, PasswordResetTokenRepository passwordResetTokenRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
        this.customUserDetailsService = customUserDetailsService;
        this.cartRepository = cartRepository;
        this.emailService = emailService;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
    }

    @Override
    public AuthResponse signUp(User user) throws Exception {
        User isEmailExist = userRepository.findByEmail(user.getEmail());

        if (isEmailExist != null) {
            throw new Exception("Оваа Е-адреса веќе постои во нашиот систем.");
        }

        User createdUser = new User();
        createdUser.setEmail(user.getEmail());
        createdUser.setFullName(user.getFullName());
        createdUser.setRole(user.getRole());
        createdUser.setPassword(passwordEncoder.encode(user.getPassword()));

        // Generate 6-digit verification code
        String verificationCode = generateVerificationCode();
        createdUser.setVerificationCode(verificationCode);
        createdUser.setEmailVerified(false);

        User savedUser = userRepository.save(createdUser);

        Cart cart = new Cart();
        cart.setCustomer(savedUser);
        cartRepository.save(cart);

        // Send verification email
        try {
            emailService.sendVerificationEmail(savedUser.getEmail(), verificationCode);
        } catch (Exception e) {
            System.err.println("Error sending verification email: " + e.getMessage());
        }

        AuthResponse authResponse = new AuthResponse();
        authResponse.setMessage("Registration successful! Please check your email for verification code.");
        authResponse.setRole(savedUser.getRole());

        return authResponse;
    }

    @Override
    public AuthResponse signIn(LoginRequest request) throws Exception {
        String username = request.getEmail();
        String password = request.getPassword();

        try {
            Authentication authentication = authenticate(username, password);

            // Check if the email is verified
            User user = userRepository.findByEmail(username);
            if (user != null && !user.isEmailVerified()) {
                throw new BadCredentialsException("Email not verified. Please verify your email first.");
            }

            Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
            String role = authorities.isEmpty() ? null : authorities.iterator().next().getAuthority();

            String jwt = jwtProvider.generateToken(authentication);

            AuthResponse authResponse = new AuthResponse();
            authResponse.setJwt(jwt);
            authResponse.setMessage("Login Success!");
            authResponse.setRole(USER_ROLE.valueOf(role));

            return authResponse;
        } catch (BadCredentialsException e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public AuthResponse verifyEmail(VerificationRequest request) throws Exception {
        User user = userRepository.findByEmail(request.getEmail());

        if (user == null) {
            throw new Exception("User not found with email: " + request.getEmail());
        }

        if (user.isEmailVerified()) {
            throw new Exception("Email already verified");
        }

        if (!user.getVerificationCode().equals(request.getVerificationCode())) {
            throw new Exception("Invalid verification code");
        }

        user.setEmailVerified(true);
        user.setVerificationCode(null);
        userRepository.save(user);

        // Generate JWT token for authenticated user
        Authentication authentication = authenticate(user.getEmail(), null);
        String jwt = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Email verified successfully");
        authResponse.setRole(user.getRole());

        return authResponse;
    }

    @Override
    public AuthResponse resendVerificationCode(ResendVerificationRequest request) throws Exception {
        User user = userRepository.findByEmail(request.getEmail());

        if (user == null) {
            throw new Exception("User not found with email: " + request.getEmail());
        }

        if (user.isEmailVerified()) {
            throw new Exception("Email already verified");
        }

        // Generate new verification code
        String verificationCode = generateVerificationCode();
        user.setVerificationCode(verificationCode);
        userRepository.save(user);

        // Send verification email
        emailService.sendVerificationEmail(user.getEmail(), verificationCode);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setMessage("Verification code resent successfully");

        return authResponse;
    }

    @Override
    public AuthResponse forgotPassword(ForgotPasswordRequest request) throws Exception {
        User user = userRepository.findByEmail(request.getEmail());

        if (user == null) {
            throw new Exception("No user found with email: " + request.getEmail());
        }

        // Check if a token already exists for this user and delete it
        PasswordResetToken existingToken = passwordResetTokenRepository.findByUser(user);
        if (existingToken != null) {
            passwordResetTokenRepository.delete(existingToken);
        }

        // Generate a reset token (6 digit code)
        String resetToken = generateVerificationCode();

        // Create and save the password reset token
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setToken(resetToken);
        passwordResetToken.setUser(user);
        // Set expiry to 1 hour from now
        passwordResetToken.setExpiryDate(LocalDateTime.now().plusHours(1));
        passwordResetTokenRepository.save(passwordResetToken);

        // Send password reset email
        try {
            emailService.sendPasswordResetEmail(user.getEmail(), resetToken);
        } catch (Exception e) {
            System.err.println("Error sending password reset email: " + e.getMessage());
        }

        AuthResponse authResponse = new AuthResponse();
        authResponse.setMessage("Password reset instructions sent to your email");

        return authResponse;
    }

    @Override
    public AuthResponse resetPassword(ResetPasswordRequest request) throws Exception {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(request.getToken());

        if (resetToken == null) {
            throw new Exception("Invalid password reset token");
        }

        if (resetToken.isExpired()) {
            passwordResetTokenRepository.delete(resetToken);
            throw new Exception("Password reset token has expired");
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);

        // Delete the used token
        passwordResetTokenRepository.delete(resetToken);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setMessage("Password has been reset successfully");

        return authResponse;
    }

    private Authentication authenticate(String username, String password) {
        try {
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

            if (password != null && !passwordEncoder.matches(password, userDetails.getPassword())) {
                throw new BadCredentialsException("Invalid password. Please try again.");
            }

            return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        } catch (UsernameNotFoundException e) {
            throw new BadCredentialsException("Invalid email address. No account found with this email.");
        }
    }

    private String generateVerificationCode() {
        Random random = new Random();
        int code = 100000 + random.nextInt(900000); // Generates a 6-digit code
        return String.valueOf(code);
    }
}