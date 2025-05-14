import React, { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    CircularProgress,
    Typography,
} from '@mui/material';
import axios from 'axios';
import {API_URL} from "../config/api";
import {useNavigate} from "react-router-dom";

export const VerifyEmailModal = ({ open, handleClose, email, role }) => {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    const handleSubmit = async () => {
        if (!code) {
            setError('Мора да внесете код!');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await axios.post(`${API_URL}/auth/verify`, {
                email,
                verificationCode: code,
            });

            setSuccess(true);
            setTimeout(() => {
                navigate("/")
            }, 2000);

        } catch (err) {
            setError('Грешка при потврда на е-поштата. Обидете се повторно.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Потврда на е-пошта</DialogTitle>
            <DialogContent>
                {!success ? (
                    <>
                        <Typography variant="body1" gutterBottom>
                            Добивте е-пошта со код за потврда. Ве молиме внесете го кодот во полето подолу.
                        </Typography>
                        <TextField
                            label="Код од е-пошта"
                            value={code}
                            onChange={handleCodeChange}
                            fullWidth
                            margin="normal"
                            error={Boolean(error)}
                            helperText={error}
                        />
                    </>
                ) : (
                    <Typography variant="body1" color="success.main">
                        Е-поштата е успешно потврдена! Благодариме.
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary" disabled={loading}>
                    Затвори
                </Button>
                {!success && (
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Потврди'}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};