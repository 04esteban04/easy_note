import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './main.css';
import { Footer, Navbar, Popup } from '../';

function Main() {

    const navigate = useNavigate();

    const [isSessionActive, setIsSessionActive] = useState(false);
    const [popupMessage, setPopupMessage] = useState(null);
    const [theme, setTheme] = useState('dark');

    useEffect(() => {

        async function checkSession() {

            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/checkUser`, {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await response.json();

                if (data.success) {
                    setIsSessionActive(true);
                } 

                else {
                    setIsSessionActive(false);
                }
            } 

            catch (error) {
                console.error('Error during session check (main):', error);
                setPopupMessage('An error occurred while checking the session in main page.');
            }

        }

        checkSession();

    });

    useEffect(() => {

        const savedTheme = localStorage.getItem("theme") || "dark";
        setTheme(savedTheme);

    }, []);

    const handlePopupClose = () => {
        setPopupMessage(null);
    };

    return (

        <div className='d-flex justify-content-center align-items-center'>

            <div className="main-container d-flex flex-column align-items-center">
                
                {popupMessage && <Popup message={popupMessage} onClose={handlePopupClose} />}
                
                <Navbar sessionActive={isSessionActive} themeCondition={true} setTheme={setTheme} register={true} login={true} />

                <main className='w-100'>
                
                    <div className="image-overlay-container mb-sm-5">
                        
                        <img className='notes-image' src="/assets/notes-image.jpg" alt="sticky notes"/>
                        <div className="welcome-section d-flex flex-column justify-content-center align-items-center">
                            <h1>Welcome to EasyNote!</h1>
                            <p>Keep your life organized with notes, reminders, and more.</p>
                        </div>

                    </div>

                    <div className="features-section d-flex flex-column justify-content-center align-items-center">
                        
                        <h2 className='my-3'>What it offers you</h2>

                        <div className="features-grid d-flex justify-content-center align-items-center gap-4 my-sm-5">
                            
                            <div className={`feature-item 
                                ${theme === "light" ? "main-light-mode" : "main-dark-mode"}`}>
                                
                                <div className='d-flex flex-row flex-wrap'>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-sort-down mx-1" viewBox="0 0 16 16">
                                        <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/>
                                    </svg>

                                    <h4 className='ms-2'>Organize your notes</h4>

                                </div>

                                <p>Create and manage your notes efficiently with tags and colors.</p>

                            </div>

                            <div className={`feature-item 
                                ${theme === "light" ? "main-light-mode" : "main-dark-mode"}`}>

                                <div className='d-flex flex-row flex-wrap'>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-rocket-takeoff mx-1" viewBox="0 0 16 16">
                                        <path d="M9.752 6.193c.599.6 1.73.437 2.528-.362s.96-1.932.362-2.531c-.599-.6-1.73-.438-2.528.361-.798.8-.96 1.933-.362 2.532"/>
                                        <path d="M15.811 3.312c-.363 1.534-1.334 3.626-3.64 6.218l-.24 2.408a2.56 2.56 0 0 1-.732 1.526L8.817 15.85a.51.51 0 0 1-.867-.434l.27-1.899c.04-.28-.013-.593-.131-.956a9 9 0 0 0-.249-.657l-.082-.202c-.815-.197-1.578-.662-2.191-1.277-.614-.615-1.079-1.379-1.275-2.195l-.203-.083a10 10 0 0 0-.655-.248c-.363-.119-.675-.172-.955-.132l-1.896.27A.51.51 0 0 1 .15 7.17l2.382-2.386c.41-.41.947-.67 1.524-.734h.006l2.4-.238C9.005 1.55 11.087.582 12.623.208c.89-.217 1.59-.232 2.08-.188.244.023.435.06.57.093q.1.026.16.045c.184.06.279.13.351.295l.029.073a3.5 3.5 0 0 1 .157.721c.055.485.051 1.178-.159 2.065m-4.828 7.475.04-.04-.107 1.081a1.54 1.54 0 0 1-.44.913l-1.298 1.3.054-.38c.072-.506-.034-.993-.172-1.418a9 9 0 0 0-.164-.45c.738-.065 1.462-.38 2.087-1.006M5.205 5c-.625.626-.94 1.351-1.004 2.09a9 9 0 0 0-.45-.164c-.424-.138-.91-.244-1.416-.172l-.38.054 1.3-1.3c.245-.246.566-.401.91-.44l1.08-.107zm9.406-3.961c-.38-.034-.967-.027-1.746.163-1.558.38-3.917 1.496-6.937 4.521-.62.62-.799 1.34-.687 2.051.107.676.483 1.362 1.048 1.928.564.565 1.25.941 1.924 1.049.71.112 1.429-.067 2.048-.688 3.079-3.083 4.192-5.444 4.556-6.987.183-.771.18-1.345.138-1.713a3 3 0 0 0-.045-.283 3 3 0 0 0-.3-.041Z"/>
                                        <path d="M7.009 12.139a7.6 7.6 0 0 1-1.804-1.352A7.6 7.6 0 0 1 3.794 8.86c-1.102.992-1.965 5.054-1.839 5.18.125.126 3.936-.896 5.054-1.902Z"/>
                                    </svg>

                                    <h4 className='ms-2'>Boost your productivity</h4>
                                    
                                </div>

                                <p>Set reminders and stay on top of your tasks.</p>

                            </div>

                            <div className={`feature-item 
                                ${theme === "light" ? "main-light-mode" : "main-dark-mode"}`}>
                                
                                <div className='d-flex flex-row flex-wrap'>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-phone mx-1" viewBox="0 0 16 16">
                                        <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                        <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                                    </svg>

                                    <h4 className='ms-2'>Access anywhere</h4>
                                
                                </div>

                                <p>Your notes are always synced and available on any device.</p>

                            </div>

                        </div>
                        
                    </div>

                    <div className="login-section mb-5 d-flex flex-column justify-content-center align-items-center">


                        <h2>Start taking notes with EasyNote!</h2>
                        
                        <p className='mt-3'>Sign up for free and take control of your ideas today.</p>
                        
                        <div className='d-flex '>

                            <button type='button' onClick={() => navigate('/login')}
                                className="btn btn-success px-3 me-3 mt-2 mt-sm-3" 
                                >
                                Sign Up
                            </button>

                            <button type='button' onClick={() => navigate('/')}
                                className="btn btn-secondary px-3 ms-3 mt-2 mt-sm-3" 
                                >
                                Learn more
                            </button>
                        
                        </div>


                    </div>

                </main>

                <Footer />

            </div>

        </div>
    );
}

export default Main;
