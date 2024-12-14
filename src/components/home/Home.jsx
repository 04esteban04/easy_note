import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer, Navbar, Popup } from '../';

function Home () {

    const navigate = useNavigate();
    const [sessionError, setSessionError] = useState(true);
    const [popupMessage, setPopupMessage] = useState(null);

    useEffect(() => {
        async function checkSession() {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/checkUser`, {
                    method: 'GET',
                    credentials: 'include',
                });
    
                const data = await response.json();
    
                if (!data.success) {
                    setPopupMessage(data.message);
                } else {
                    setSessionError(false); 
                }
            } catch (error) {
                console.error('Error during session check (home):', error);
                setPopupMessage('An error occurred while checking the session in home page.');
            }
        }

        checkSession();
    });

    const handlePopupClose = () => {
        setPopupMessage(null);
        navigate('/login');
    };

    if (sessionError) {
        return (
            <>  
                {popupMessage && (<Popup message={popupMessage} onClose={handlePopupClose} />)}
            </>
        );
    } else {    
        return (
            <div>
                <Navbar theme={true} register={false} login={false} logout={true} />

                <h1>
                    You are in the Home page!
                </h1>

                <Footer />
            </div>
        );
    }
}

export default Home;