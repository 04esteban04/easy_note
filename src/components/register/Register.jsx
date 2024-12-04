import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer, Navbar } from '../';
import './register.css';

function Register() {

    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();

        const username = e.target.email.value;
        const password = e.target.password.value;

        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        
        if (data.success) {
            alert(data.message);
            navigate('/login'); 
        } else {
            alert(data.message);
        }
    }

    return (
        <div>
            <Navbar login={true}/>

            <div className="container mt-5">
                <h1 className="text-center mb-4">Register</h1>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form className="p-4 border rounded" onSubmit={handleRegister}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Create a password"
                                />
                            </div>
                            <button type="submit" className="btn btn-success w-100">Register</button>
                        </form>
                        <p className="text-center mt-3">
                            Already have an account? <a href="/login">Login here</a>
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Register;
