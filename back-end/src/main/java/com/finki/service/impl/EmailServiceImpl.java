package com.finki.service.impl;

import com.finki.service.EmailService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
public class EmailServiceImpl implements EmailService {

    @Value("${spring.mail.host}")
    private String host;

    @Value("${spring.mail.port}")
    private int port;

    @Value("${spring.mail.username}")
    private String username;

    @Value("${spring.mail.password}")
    private String password;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${BASE_URL}")
    private String baseUrl;

    private JavaMailSender mailSender;

    @PostConstruct
    public void init() {
        JavaMailSenderImpl sender = new JavaMailSenderImpl();
        sender.setHost(host);
        sender.setPort(port);
        sender.setUsername(username);
        sender.setPassword(password);

        Properties props = sender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.starttls.required", "true");

        // Gmail configuration
        props.put("mail.smtp.ssl.trust", "*");
        props.put("mail.smtp.ssl.protocols", "TLSv1.2");
        props.put("mail.smtp.connectiontimeout", "5000");
        props.put("mail.smtp.timeout", "5000");
        props.put("mail.smtp.writetimeout", "5000");

        this.mailSender = sender;
    }

    @Override
    public void sendVerificationEmail(String to, String verificationCode) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(to);
        message.setSubject("Email Verification - FINKI Food");

        String content = "<div style='font-family: Arial, sans-serif; padding: 20px; max-width: 600px;'>"
                + "<h2>Account Verification</h2>"
                + "<p>Hi</p>"
                + "<p>Thanks for signing up! Please use the verification code below to activate your account:</p>"
                + "<div style='background-color: #f2f2f2; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;'>"
                + "<h1 style='color: #4CAF50; letter-spacing: 5px; font-size: 28px;'>" + verificationCode
                + "</h1>"
                + "</div>"
                + "<p>This code will expire in 60 minutes.</p>"
                + "<p>If you didn't create an account, please ignore this email.</p>"
                + "<p>Regards,<br/>FINKI Food Team</p>"
                + "</div>";

        message.setText(content);
        mailSender.send(message);
    }

    @Override
    public void sendPasswordResetEmail(String to, String resetToken) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(to);
        message.setSubject("Password Reset - FINKI Food");

        String content = "<div style='font-family: Arial, sans-serif; padding: 20px; max-width: 600px;'>"
                + "<h2>Password Reset</h2>"
                + "<p>Hi</p>"
                + "<p>You requested to reset your password. Please use the code below to reset your password:</p>"
                + "<div style='background-color: #f2f2f2; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;'>"
                + "<h1 style='color: #4CAF50; letter-spacing: 5px; font-size: 28px;'>" + resetToken + "</h1>"
                + "</div>"
                + "<p>This code will expire in 60 minutes.</p>"
                + "<p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>"
                + "<p>Regards,<br/>FINKI Food Team</p>"
                + "</div>";

        message.setText(content);
        mailSender.send(message);
    }
}