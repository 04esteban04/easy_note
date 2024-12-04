import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer, Navbar } from '../';
import './login.css';

function Login() {

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        const username = e.target.email.value;
        const password = e.target.password.value;

        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        
        if (data.success) {
            navigate('/home'); 
        } else {
            alert(data.message);
        }
    }

    return (
        <div>
            <Navbar register={true}/>

            <div className="container mt-5">
                <h1 className="text-center mb-4">Login</h1>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form className="p-4 border rounded" onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name='email'
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name='password'
                                    placeholder="Enter your password"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </form>
                        <p className="text-center mt-3">
                            Don't have an account? <a href="/register">Register here</a>
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Login;
