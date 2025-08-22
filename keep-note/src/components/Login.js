
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 
import { TextField, Button, Box, Typography } from '@mui/material';

export const LoginUser = () => {
  const { login } = useAuth(); 
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false); 

  
  const validateUser = (email, password) => { 
  
    const validUser = { email: 'test@example.com', password: 'password123' };
    return email === validUser.email && password === validUser.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

   
    if (!validateUser(email, password)) {
      setError('Invalid email or password!');
      return;
    }

    try {
     
      setLoading(true);

     
      const user = { email, name: 'John Doe' }; 
      login(user); 

     
      navigate('/notes');
    } catch (err) {
      setError('Failed to login. Please try again.');
      console.error(err);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 5,
        backgroundColor: '#ffffff',  
        padding: 3,
        borderRadius: 2,          
        boxShadow: 3,             
      }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        gutterBottom
        sx={{
          color: '#333',  
        }}
      >
        Login
      </Typography>
      {error && (
        <Typography variant="body2" color="error" textAlign="center" gutterBottom>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            '& .MuiInputBase-root': {
              backgroundColor: '#f5f5f5', 
            },
          }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            '& .MuiInputBase-root': {
              backgroundColor: '#f5f5f5'
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading} 
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </Box>
  );
};
