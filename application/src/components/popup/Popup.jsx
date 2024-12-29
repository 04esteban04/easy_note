import React from 'react';
import './popup.css';

function Popup({ message, onClose }) {
    return (
        <div className="modal fade show popup-overlay">
            <div className="popup-content"> 
                <h5 className="modal-title mb-3">
                    <img width="35" height="35" src="https://img.icons8.com/color/96/error--v1.png" alt="error--v1"/>
                    Warning 
                </h5>
                <p className='mb-4'>{message}</p>
                <button type="button" className="btn btn-primary mt-1 mb-3 w-50 mx-auto" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default Popup;
