import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./navbar.css"

/* TODO: Night and light mode (theme) */

function NavbarLink ({ condition, path, svg, text, setPopupMessage }) {

    const navigate = useNavigate();

    const handleLogout = async (event) => {

        event.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();

            if (data.success) {
                navigate('/login');
            } else {
                setPopupMessage(data.message || 'Failed to logout');
            }
        } catch (error) {
            console.error('Logout error:', error);
            setPopupMessage('An error occurred during logout');
        }
    };

    if (!condition) {
        return null;
    }
    
    return (
        <Link 
            className="link" 
            to={path}
            onClick={(e) => {
                if (path === "#logout"){
                    handleLogout(e);
                }
            }}>
            {svg}
            <span className="d-none d-sm-inline">{text}</span>
        </Link>
    )
};

export default NavbarLink;