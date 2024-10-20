import React, { useState } from 'react';
import api from '../api/axios';

const SignUpModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [step, setStep] = useState(1); // 1 for sign-up, 2 for OTP verification
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Handles form submission to generate OTP and send it to the user's email
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Reset error

    try {
      // Generate a 4-digit OTP
      const otpCode = Math.floor(1000 + Math.random() * 9000);
      setGeneratedOtp(otpCode);

      const res = await api.post('/api/otp/sendOtp', { name, email });
      
      if (res.status === 200) {
        console.log(`Sending OTP: ${otpCode} to ${email}`);
        setStep(2); // Move to OTP verification step
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles OTP verification and user creation
   */
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Reset error

    if (otp !== generatedOtp.toString()) {
      setError('Invalid OTP. Please try again.');
      setLoading(false);
      return;
    }

    try {
      const res = await api.post('/api/auth/register', { name, email, password });
      
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token); // Store token
        alert('User created successfully');
        onClose();
      } else {
        setError('Failed to create user. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Helper method to validate inputs
   */
  const isValidInput = () => {
    if (!name || !email || !password) {
      setError('All fields are required');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">{step === 1 ? 'Sign Up' : 'Verify OTP'}</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>} {/* Error message display */}
        
        {step === 1 ? (
          <form onSubmit={(e) => {
            if (isValidInput()) handleSubmit(e);
          }}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded mb-3"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded mb-3"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded mb-3"
              required
            />
            <button
              type="submit"
              className={`w-full py-2 rounded ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white`}
              disabled={loading}
            >
              {loading ? 'Sending OTP...' : 'Sign Up'}
            </button>
            <button type="button" onClick={onClose} className="mt-2 w-full text-center text-blue-500">
              Cancel
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full p-2 border border-gray-300 rounded mb-3"
              required
            />
            <button
              type="submit"
              className={`w-full py-2 rounded ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white`}
              disabled={loading}
            >
              {loading ? 'Verifying OTP...' : 'Verify OTP'}
            </button>
            <button type="button" onClick={onClose} className="mt-2 w-full text-center text-blue-500">
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUpModal;
