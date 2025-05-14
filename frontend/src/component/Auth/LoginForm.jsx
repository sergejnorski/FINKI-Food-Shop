import {Box, Button, Modal, TextField, Typography} from '@mui/material'
import {Field, Form, Formik} from 'formik'
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from "react-redux";
import {loginUser} from "../../State/Authentication/Action";
import axios from "axios";
import {API_URL} from "../config/api";

const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=!]).*$/;

const initialValues = {
  email: "", password: ""
}
export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetOpen, setResetOpen] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (values) => {
    dispatch(loginUser({userData: values, navigate, setErrorMessage}));
  }

  const handleForgotPassword = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/forgot-password`, { email: forgotEmail });
      console.log("Success:", data);
      alert("Инструкциите за ресетирање се испратени на вашата е-пошта.");
      setOpen(false);
      setResetOpen(true);
      setForgotEmail("");
    } catch (error) {
      console.error("Error:", error);
      alert("Се случи грешка. Обидете се повторно.");
    }
  };

  const handleResetPassword = async () => {
    if (!passwordRegex.test(newPassword)) {
      setPasswordError('Лозинка мора да содржи барем еден број, едно писмо и еден специјален карактер (@#$%^&+=!)');
      return;
    } else {
      setPasswordError('');
    }

    try {
      const payload = {
        token: resetToken,
        password: newPassword,
      };
      const { data } = await axios.post(`${API_URL}/auth/reset-password`, payload);
      console.log('Password reset successful:', data);
      alert('Вашата лозинка е успешно променета. Сега можете да се најавите.');
      setResetOpen(false);
      setResetToken('');
      setNewPassword('');
    } catch (error) {
      console.error('Reset error:', error);
      alert('Неуспешен обид за промена на лозинка. Проверете го токенот и обидете се повторно.');
    }
  };

  return (<div>
    <Typography variant='h5' className='text-center'>
      Најава
    </Typography>
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      <Form>

        <Field as={TextField}
               name="email"
               label="е-пошта"
               fullWidth
               variant="outlined"
               margin="normal"
        />
        <Field as={TextField}
               name="password"
               label="лозинка"
               fullWidth
               variant="outlined"
               margin="normal"
               type="password"
        />
        <Box textAlign="right" mt={1}>
          <Button size="small" onClick={() => setOpen(true)}>
            Заборавена лозинка?
          </Button>
        </Box>
        <Button sx={{mt: 2, padding: "1rem"}} fullWidth type="submit" variant='contained'>Најава</Button>

        {errorMessage && (
          <Typography variant="body2" color="error" align="center" sx={{mt: 2}}>
            {errorMessage}
          </Typography>
        )}

      </Form>
    </Formik>
    <Typography variant='body2' align='center' sx={{mt: 3}}>
      Сеуште немате корисничка сметка?
      <Button size='small' onClick={() => navigate("/account/register")}>
        Регистрација
      </Button>
    </Typography>

    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2
      }}>
        <Typography variant="h6" mb={2}>Заборавена лозинка</Typography>
        <Typography variant="body2" mb={2}>
          Внесете ја вашата е-пошта за да добиете инструкции за ресетирање на лозинката.
        </Typography>
        <TextField
          label="е-пошта"
          variant="outlined"
          fullWidth
          value={forgotEmail}
          onChange={(e) => setForgotEmail(e.target.value)}
        />
        <Button sx={{ mt: 2 }} fullWidth variant="contained" onClick={handleForgotPassword}>
          Испрати инструкции
        </Button>
      </Box>
    </Modal>

    <Modal open={resetOpen} onClose={() => setResetOpen(false)}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2
      }}>
        <Typography variant="h6" mb={2}>Промена на лозинка</Typography>
        <Typography variant="body2" mb={2}>
          Внесете го токенот што го добивте на е-пошта и новата лозинка.
        </Typography>
        <TextField
          label="Токен"
          variant="outlined"
          fullWidth
          value={resetToken}
          onChange={(e) => setResetToken(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Нова лозинка"
          type="password"
          variant="outlined"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        {passwordError && (
          <Typography variant="body2" color="error" mb={2}>
            {passwordError}
          </Typography>
        )}
        <Button sx={{ mt: 2 }} fullWidth variant="contained" onClick={handleResetPassword}>
          Промени лозинка
        </Button>
      </Box>
    </Modal>

    </div>)
}