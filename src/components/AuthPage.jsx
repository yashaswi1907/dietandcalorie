import { useState } from 'react';
import styles from './AuthPage.module.css';

function AuthPage({ onLogin }) {
    const [activeTab, setActiveTab] = useState('signin');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
        setSuccess('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Basic validation
        if (activeTab === 'signup') {
            if (!formData.name || !formData.email || !formData.password) {
                setError('Please fill in all fields');
                return;
            }
            if (formData.password.length < 6) {
                setError('Password must be at least 6 characters');
                return;
            }

            // Store user in localStorage (simple implementation)
            const users = JSON.parse(localStorage.getItem('stayfit_users') || '[]');

            // Check if email already exists
            if (users.find(u => u.email === formData.email)) {
                setError('Email already registered. Please sign in.');
                return;
            }

            // Add new user
            users.push({
                name: formData.name,
                email: formData.email,
                password: formData.password // In production, this should be hashed!
            });
            localStorage.setItem('stayfit_users', JSON.stringify(users));

            setSuccess('Account created successfully! Please sign in.');
            setActiveTab('signin');
            setFormData({ name: '', email: '', password: '' });
        } else {
            // Sign in
            if (!formData.email || !formData.password) {
                setError('Please enter email and password');
                return;
            }

            const users = JSON.parse(localStorage.getItem('stayfit_users') || '[]');
            const user = users.find(u => u.email === formData.email && u.password === formData.password);

            if (!user) {
                setError('Invalid email or password');
                return;
            }

            // Store current user session
            localStorage.setItem('stayfit_current_user', JSON.stringify(user));
            onLogin(user);
        }
    };

    return (
        <div className={styles['auth-page']}>
            <div className={styles['auth-container']}>
                <div className={styles['auth-header']}>
                    <div className={styles['auth-logo']}>✨</div>
                    <h1>Stay Fit</h1>
                    <p>Your personalized diet planning companion</p>
                </div>

                <div className={styles['auth-card']}>
                    <div className={styles['auth-tabs']}>
                        <button
                            className={`${styles['auth-tab']} ${activeTab === 'signin' ? styles.active : ''}`}
                            onClick={() => {
                                setActiveTab('signin');
                                setError('');
                                setSuccess('');
                            }}
                        >
                            Sign In
                        </button>
                        <button
                            className={`${styles['auth-tab']} ${activeTab === 'signup' ? styles.active : ''}`}
                            onClick={() => {
                                setActiveTab('signup');
                                setError('');
                                setSuccess('');
                            }}
                        >
                            Sign Up
                        </button>
                    </div>

                    {error && <div className={styles['error-message']}>{error}</div>}
                    {success && <div className={styles['success-message']}>{success}</div>}

                    <form className={styles['auth-form']} onSubmit={handleSubmit}>
                        {activeTab === 'signup' && (
                            <div className={styles['form-group']}>
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    required={activeTab === 'signup'}
                                />
                            </div>
                        )}

                        <div className={styles['form-group']}>
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className={styles['form-group']}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder={activeTab === 'signup' ? 'Create a password (min 6 characters)' : 'Enter your password'}
                                required
                            />
                        </div>

                        <button type="submit" className={styles['auth-button']}>
                            {activeTab === 'signin' ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;
