import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, ShieldCheck } from 'lucide-react';
import api from '../api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('candidate');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Password Visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation Errors
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [termsError, setTermsError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const nav = useNavigate();

  // Password Strength Evaluation
  const evaluatePasswordStrength = () => {
    if (!password) return { label: '', width: '0%', color: 'transparent' };
    if (password.length < 6) return { label: 'Too short', width: '25%', color: '#ef4444' };
    
    let score = 0;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    if (password.length >= 8 && score >= 2) {
      return { label: 'Strong password', width: '100%', color: '#10b981' };
    }
    if (score >= 1) {
      return { label: 'Medium strength', width: '60%', color: '#f59e0b' };
    }
    return { label: 'Weak password', width: '35%', color: '#ef4444' };
  };

  const strength = evaluatePasswordStrength();

  const validateForm = () => {
    let isValid = true;

    // Validate Name
    if (!name.trim()) {
      setNameError('Full name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    // Validate Email
    if (!email) {
      setEmailError('Email address is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Validate Password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    // Validate Confirm Password
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    // Validate Terms Checkbox
    if (!agreeTerms) {
      setTermsError('You must agree to the Terms of Service');
      isValid = false;
    } else {
      setTermsError('');
    }

    return isValid;
  };

  const handleRegisterSuccess = (user, token) => {
    localStorage.setItem('token', token);
    
    const userProfile = {
      ...user,
      phone: user.role === 'candidate' ? '+91 98765 43210' : '',
      location: user.role === 'candidate' ? 'Mumbai, MH' : '',
      education: user.role === 'candidate' ? 'Bachelor of Technology (B.Tech)' : '',
      skills: user.role === 'candidate' ? 'React, Javascript, CSS, HTML' : '',
      resumeName: user.role === 'candidate' ? `${user.name.replace(/\s+/g, '_')}_Resume.pdf` : ''
    };
    
    localStorage.setItem('user', JSON.stringify(userProfile));
    nav('/dashboard');
  };

  async function submit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setGeneralError('');

    try {
      const data = await api('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, role })
      });
      handleRegisterSuccess(data.user, data.token);
    } catch (err) {
      setGeneralError(err.message || 'Registration failed. Email might already be in use.');
    } finally {
      setIsLoading(false);
    }
  }

  // Social mockup login helper
  const handleSocialLogin = (platform) => {
    setIsLoading(true);
    setGeneralError('');
    
    setTimeout(() => {
      const mockUser = {
        name: `Demo ${platform} User`,
        email: `${platform.toLowerCase()}-demo@jobsphere.com`,
        role: 'candidate'
      };
      const mockToken = 'mock-oauth-jwt-token-xyz';
      handleRegisterSuccess(mockUser, mockToken);
    }, 1000);
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-bg-glow-1"></div>
      <div className="auth-bg-glow-2"></div>
      
      <div className="glass-auth-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join JobSphere and land your dream job</p>
        
        {generalError && (
          <div className="auth-error-message" style={{ marginBottom: 16, textAlign: 'center', background: 'rgba(239, 68, 68, 0.15)', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(239, 68, 68, 0.3)', width: '100%', boxSizing: 'border-box' }}>
            {generalError}
          </div>
        )}

        <form onSubmit={submit} className="auth-form">
          {/* Name Input */}
          <div className="auth-input-group">
            <span className="auth-input-icon"><User size={18} /></span>
            <input 
              className={`auth-input ${nameError ? 'error' : ''}`}
              placeholder="Full Name"
              value={name}
              onChange={e => {
                setName(e.target.value);
                if (nameError) setNameError('');
              }}
            />
            {nameError && <span className="auth-error-message">{nameError}</span>}
          </div>

          {/* Email Input */}
          <div className="auth-input-group">
            <span className="auth-input-icon"><Mail size={18} /></span>
            <input 
              className={`auth-input ${emailError ? 'error' : ''}`}
              placeholder="Email Address"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                if (emailError) setEmailError('');
              }}
            />
            {emailError && <span className="auth-error-message">{emailError}</span>}
          </div>

          {/* Password Input */}
          <div className="auth-input-group">
            <span className="auth-input-icon"><Lock size={18} /></span>
            <input 
              type={showPassword ? 'text' : 'password'}
              className={`auth-input ${passwordError ? 'error' : ''}`}
              placeholder="Password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError('');
              }}
            />
            <button 
              type="button" 
              className="password-toggle-btn" 
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {passwordError && <span className="auth-error-message">{passwordError}</span>}
          </div>

          {/* Password Strength Indicator */}
          {password && (
            <div className="password-strength-container">
              <div className="password-strength-bar-bg">
                <div 
                  className="password-strength-bar" 
                  style={{ width: strength.width, backgroundColor: strength.color }}
                ></div>
              </div>
              <span className="password-strength-label" style={{ color: strength.color }}>
                {strength.label}
              </span>
            </div>
          )}

          {/* Confirm Password Input */}
          <div className="auth-input-group">
            <span className="auth-input-icon"><Lock size={18} /></span>
            <input 
              type={showConfirmPassword ? 'text' : 'password'}
              className={`auth-input ${confirmPasswordError ? 'error' : ''}`}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => {
                setConfirmPassword(e.target.value);
                if (confirmPasswordError) setConfirmPasswordError('');
              }}
            />
            <button 
              type="button" 
              className="password-toggle-btn" 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label="Toggle confirm password visibility"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {confirmPasswordError && <span className="auth-error-message">{confirmPasswordError}</span>}
          </div>

          {/* Role Selection */}
          <div className="auth-input-group">
            <span className="auth-input-icon"><ShieldCheck size={18} /></span>
            <select 
              className="auth-input auth-select"
              value={role} 
              onChange={e => setRole(e.target.value)}
            >
              <option value="candidate">Register as Candidate</option>
              <option value="employer">Register as Employer</option>
            </select>
          </div>

          {/* Terms & Conditions Checkbox */}
          <div className="terms-checkbox-container">
            <input 
              type="checkbox" 
              id="agreeTerms"
              checked={agreeTerms}
              onChange={e => {
                setAgreeTerms(e.target.checked);
                if (termsError) setTermsError('');
              }}
            />
            <label htmlFor="agreeTerms">
              I agree to the <a href="#/terms">Terms of Service</a> and <a href="#/privacy">Privacy Policy</a>
            </label>
          </div>
          {termsError && <span className="auth-error-message" style={{ width: '100%', marginTop: -20, marginBottom: 20 }}>{termsError}</span>}

          {/* Submit Button */}
          <button type="submit" className="auth-submit-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="spinner"></div>
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Sign Up</span>
            )}
          </button>
        </form>

        {/* Social Logins */}
        <div className="social-divider">or sign up with</div>
        
        <div className="social-btn-container">
          <button 
            type="button" 
            className="social-btn google-btn" 
            onClick={() => handleSocialLogin('Google')}
            title="Sign up with Google"
          >
            <svg className="social-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
          </button>
          
          <button 
            type="button" 
            className="social-btn github-btn" 
            onClick={() => handleSocialLogin('GitHub')}
            title="Sign up with GitHub"
          >
            <svg className="social-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </button>
          
          <button 
            type="button" 
            className="social-btn linkedin-btn" 
            onClick={() => handleSocialLogin('LinkedIn')}
            title="Sign up with LinkedIn"
          >
            <svg className="social-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </button>
        </div>

        <p className="auth-footer-text">
          Already have an account? <span onClick={() => nav('/login')}>Sign in here</span>
        </p>
      </div>
    </div>
  );
}
