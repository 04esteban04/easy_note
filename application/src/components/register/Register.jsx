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
    const [theme, setTheme] = useState('dark');

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

    useEffect(() => {

        const savedTheme = localStorage.getItem("theme") || "dark";
        setTheme(savedTheme);

    }, []);

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

        <div className='d-flex justify-content-center align-items-center'>
            
            <div className='main-register-container d-flex flex-column align-items-center'>

                {popupMessage && <Popup successMessage={successRegister} message={popupMessage} onClose={handlePopupClose} />}

                <Navbar themeCondition={true} setTheme={setTheme} login={true}/>

                <div className="register-container d-flex justify-content-center align-items-center">

                    <form className={`register-form-container p-4
                        ${(theme === "light" ? "light-mode-container" : "dark-mode-container")}`}
                        onSubmit={handleRegister}>
                        
                        <h1 className="text-center mb-5">Register</h1>
                        
                        <div className="form-floating my-3">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="name@example.com"
                                required
                            />
                            <label htmlFor="email">Enter your email address</label>
                        </div>

                        <div className="form-floating mb-4">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Password"
                                required
                            />
                            <label htmlFor="password">Enter your password</label>
                        </div>

                        <div className='d-flex justify-content-center mx-auto w-100'>
                            <button type="submit" className="btn btn-success col-12 col-sm-8 mt-2" disabled={isSubmitting}> 
                                {isSubmitting ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise rotating" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                                    </svg> 
                                    : 'Create account'
                                }
                            </button>
                        </div>

                        <p className="text-center mt-4">
                            Already have an account? <Link id='login-account' to="/login">Login here</Link>
                        </p>

                    </form>

                </div>
                
                <Footer />
                
            </div>

        </div>
    );

}

export default Register;
