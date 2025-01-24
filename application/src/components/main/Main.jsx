import React, { useState, useEffect } from 'react';
import './main.css';
import { Footer, Navbar, Popup } from '../';

function Main() {

    const [isSessionActive, setIsSessionActive] = useState(false);
    const [popupMessage, setPopupMessage] = useState(null);

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
                console.error('Error during session check (home):', error);
                setPopupMessage('An error occurred while checking the session in main page.');
            }

        }

    checkSession();

    });

    return (

        <div className='d-flex justify-content-center align-items-center'>

            <div className="main-container d-flex flex-column align-items-center">
                
                <Navbar sessionActive={isSessionActive} themeCondition={true} register={true} login={true} logout={false}/>

                <div className="welcome-section">
                    <h1>Welcome to the Main Page!</h1>
                    <p>This is the main content that the users sees when entering the app.</p>
                </div>

                <Footer />

            </div>

        </div>
    );
}

export default Main;
