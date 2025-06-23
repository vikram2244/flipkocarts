import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../components/Context/CartContext';

const SignIn = ({ handleLogin }) => {
  const { setUserId, setUserEmail } = useCart();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = 'Enter a valid email';
    }

    if (!data.password) {
      newErrors.password = 'Password is required';
    } else if (data.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('https://flipko-springboot-1.onrender.com/api/login', data);

      if (res.status === 200 || res.status === 201) {
        const userId = res.data.userId; 
        const email = res.data.userId; 
        if (!userId) {
          throw new Error('No userId returned from login response');
        }
        setUserId(userId);
        setUserEmail(email);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userEmail', email);
        handleLogin();
        navigate(`/${encodeURIComponent(email)}`);
      } else {
        alert('Invalid email or password');
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert('Invalid email or password');
      } else {
        console.error('Login error:', err.message, err.response?.data);
        alert('Server error. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={data.password}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="form-group">
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </div>
        <div><Link to='/signup'>Register</Link></div>
      </form>
    </div>
  );
};

export default SignIn;