import React, { useState } from 'react';
import { auth } from '../lib/auth/AuthProvider';
import styles from './AuthModal.module.css'; // We'll create this next

export default function AuthModal({ onClose, onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('signin'); // 'signin' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError('');

    try {
      let result;
      if (activeTab === 'signin') {
        result = await auth.signIn(email, password);
      } else {
        result = await auth.signUp(email, password);
      }

      if (result.error) {
        setError(result.error);
      } else {
        onLoginSuccess();
      }
    } catch (e) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close">
            &times;
        </button>
        
        <div className={styles.header}>
          <h2>{activeTab === 'signin' ? 'Welcome Back' : 'Create Account'}</h2>
          <p>Sign in to continue chatting with the AI.</p>
        </div>

        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'signin' ? styles.activeTab : ''}`}
            onClick={() => { setActiveTab('signin'); setError(''); }}
          >
            Sign In
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'signup' ? styles.activeTab : ''}`}
            onClick={() => { setActiveTab('signup'); setError(''); }}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Processing...' : (activeTab === 'signin' ? 'Sign In' : 'Create Account')}
          </button>
        </form>
        
        <div className={styles.footer}>
            <p className={styles.note}>
                {activeTab === 'signin' ? 
                    "First time? Switch to Sign Up tab." : 
                    "Already have an account? Switch to Sign In tab."}
            </p>
        </div>
      </div>
    </div>
  );
}
