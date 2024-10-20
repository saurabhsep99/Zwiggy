import React, { useState } from 'react';
import api from '../api/axios';

const SignInModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);  // Added loading state
  const [error, setError] = useState(null);       // Added error state

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent page reload on form submission
    setError(null);      // Clear any previous errors
    setLoading(true);    // Set loading to true when login starts

    if (!email || !password) {
      setError('Please fill in all fields');      // Basic validation
      setLoading(false);
      return;
    }

    try {
      const res = await api.post('api/auth/login', { email, password });
      
        console.log('res',res)

      if (res.status === 200) {  
        localStorage.setItem('token', res.token); 
        setToken(res.token);                      
        alert('User logged in successfully');
        onClose();                                    
      } else {
        setError('Invalid login credentials');         
      }
    } catch (error) {
      setError('Error logging in. Please try again.'); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Sign In</h2>
        
        {error && <p className="text-red-500 mb-3">{error}</p>}  {/* Show error message if any */}
        
        <form onSubmit={handleSubmit}>
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
            disabled={loading}  // Disable button while loading
          >
            {loading ? 'Logging in...' : 'Login'}  {/* Show loading indicator */}
          </button>
          
          <button
            type="button"
            onClick={onClose}
            className="mt-2 w-full text-center text-blue-500"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInModal;
