import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Popup } from '../';
import "./navbar.css"

function NavbarLink (props) {

    const navigate = useNavigate();

    const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);

    const handleLogout = async () => {

        if (props.isSubmitting) {
            return;
        } 
        
        try {
            props.setIsSubmitting(true);

            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();

            if (data.success) {
                localStorage.removeItem("savedView");
                localStorage.removeItem("savedPage");
                navigate('/login');
            } else {
                props.setPopupMessage(data.message || 'Failed to logout');
            }
            
        } 
        
        catch (error) {
            console.error('Logout error:', error);
            props.setPopupMessage('An error occurred during logout');
        }

        finally {
            props.setIsSubmitting(false);
        }
    };

    const handleLogoutConfirmation = () => {

        setIsLogoutPopupOpen(true);

    };

    const handleLogoutPopupClose = () => {

        setIsLogoutPopupOpen(false);

    };

    if (!props.condition) {
        return null;
    }
    
    return (
        <>
            <Link 
                className="link d-flex justify-content-center align-items-center" 
                to={props.path}
                onClick={() => {
                    if (props.path === "#logout"){
                        handleLogoutConfirmation();
                    } else if (props.path === "#theme"){
                        props.toggleTheme();
                    }
                }}>
                {props.svg}
                <span className="d-none d-sm-inline">{props.text}</span>
            </Link>

            
            {isLogoutPopupOpen && (
                <Popup 
                    logoutPopup={isLogoutPopupOpen}
                    isSubmitting={props.isSubmitting}
                    handleLogoutConfirmation={handleLogout}
                    handleLogoutPopupClose={handleLogoutPopupClose}
                />
            )}
        </>
    );
};

export default NavbarLink;