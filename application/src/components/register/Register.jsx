import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Footer, Navbar, Popup } from '../';
import './register.css';

function Register() {

    const navigate = useNavigate();
    const [popupMessage, setPopupMessage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [successRegister, setSuccessRegister] = useState(false);

    useEffect(() => {

        async function checkSession () {

            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/checkUser`, {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await response.json();

                if (data.success) {
                    navigate('/home');
                } else {
                    setLoading(false);
                }
            } 
            
            catch (error) {
                console.error('Error while checking session:', error);
                setPopupMessage('An error occurred while verifying your session.');
            }

        };

        checkSession();
    }, [navigate]);

    const handleRegister = async (event) => {

        event.preventDefault();
        
        if (isSubmitting) {
            return;
        } 

        try {
            setIsSubmitting(true);
            
            const username = event.target.email.value.trim();
            const password = event.target.password.value.trim();
            
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            
            if (data.success) {
                setSuccessRegister(true);
            }

            setPopupMessage(data.message);

        } 
        
        catch (error) {
            console.error('Register error:', error);
            setPopupMessage('An error occurred while creating an account. Please try again.');
        }
        
        finally {
            setIsSubmitting(false);
        }
    }

    const handlePopupClose = () => {
        setPopupMessage(null);
        setSuccessRegister(false);
        navigate('/login'); 
    };

    if (loading) {
        return null;
    }
    
    return (
        <>
            {popupMessage && <Popup successMessage={successRegister} message={popupMessage} onClose={handlePopupClose} />}

            <Navbar theme={true} register={false} login={true} logout={false} />

            <div className="container my-5 register-container d-flex flex-column justify-content-center align-items-center">
                
                <h1 className="text-center mb-4">Register</h1>
                
                <div className="row justify-content-center w-100">
                    
                    <div className="col-10 col-lg-12">
                        <form className="p-4 border rounded form-size" onSubmit={handleRegister}>
                            <div className="form-floating mb-3">
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="email"
                                    name='email'
                                    placeholder="name@example.com"
                                    required
                                />
                                <label htmlFor="floatingInput">Enter your email address</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="password"
                                    name='password' 
                                    placeholder="Password"
                                    required
                                />
                                <label htmlFor="floatingPassword">Enter your password</label>
                            </div>

                            <div className='d-grid gap-2 col-sm-8 col-lg-6 mx-auto'>
                                <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                                    {isSubmitting ? 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise rotating" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                                        </svg> 
                                        : 'Create account'
                                    }
                                </button>
                            </div>
                        </form>

                        <p className="text-center mt-4">
                            Already have an account? <Link to="/login">Login here</Link>
                        </p>
                    </div>

                </div>

            </div>

            <Footer />
        </>
    );

}

export default Register;
