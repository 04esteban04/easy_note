import React from 'react';
import './main.css';
import { Footer, Navbar } from '../';

function Main() {
  return (
    <div className="main-container">
        
        <Navbar register={true} login={true} logout={false}/>

        <div className="welcome-section">
            <h1>Welcome to the Main Page!</h1>
            <p>This is the main content that the users sees when entering the app.</p>
        </div>

        <Footer />

    </div>
  );
}

export default Main;
