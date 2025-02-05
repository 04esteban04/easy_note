import React from 'react';
import './popup.css';

function Popup(props) {

    const noteColorSelection = [
        '#FFFFFF',
        '#94A6B8',
        '#FF5744',
        '#FA8072',
        '#FFA07A',
        '#FACD96',
        '#FFE346',
        '#FFFF8F',
        '#8FBC8F',
        '#5BFF5B',
        '#98FB98',
        '#53C1EC',
        '#BAE1FF',
        '#C58EFC',
        '#E6CCFF',
        '#FFB3BA'
    ];

    const backgroundColor =
        props.newNotePopup
            ? props.newNoteData.color
            : props.editPopup
            ? props.editNoteData.color
            : '#FFFFFF'; 

    return (
        <div className="modal fade show popup-overlay">
            <div className="popup-content" style={{ backgroundColor: backgroundColor }}>
                
                {props.message && (
                    <>
                        <h5 className="modal-title mb-3">
                            {props.successMessage ? ( 
                                <>
                                    <img className='me-2' width="35" height="35" 
                                        src="https://img.icons8.com/color/48/ok--v1.png" 
                                        alt="ok--v1"
                                    />
                                    Success
                                </>
                            ) : (
                                <>
                                    <img width="35" height="35" 
                                        src="https://img.icons8.com/color/96/error--v1.png" 
                                        alt="error--v1" 
                                    />
                                    Warning
                                </>
                            )}   
                        </h5>

                        <p className="mb-4">{props.message}</p>
                        
                        <button type="button" 
                            className="btn btn-primary mt-1 mb-3 w-50 mx-auto" 
                            onClick={props.onClose}>
                            Close
                        </button>
                    </>
                )}

                {props.newNotePopup && (
                    <>
                        <h3 className='mb-4'>Create New Note</h3>
                        
                        <div className="mb-3 d-flex flex-column align-items-start">
                            <label className="form-label fw-bold fs-5"> Title </label>
                            <input 
                                className='form-control' 
                                type="text" 
                                name="title" 
                                placeholder="Enter note title"
                                value={props.newNoteData.title} 
                                onChange={props.handleNewNoteChange} 
                            />
                        </div>

                        <div className="my-4 d-flex flex-column align-items-start">
                            <label className="form-label fw-bold fs-5"> Content </label>
                            <textarea 
                                className='form-control popup-size' 
                                name="content" 
                                placeholder="Enter note content"
                                value={props.newNoteData.content} 
                                onChange={props.handleNewNoteChange} 
                            />
                        </div>

                        <div className="mb-3 d-flex flex-column align-items-start">
                            <label className="form-label fw-bold fs-5">Tags</label>
                            <input
                                className='form-control'
                                type="text"
                                name="tags"
                                placeholder="Enter tags separated by commas"
                                value={props.newNoteData.tags}
                                onChange={props.handleNewNoteChange}
                            />
                        </div>

                        <div className="mb-3 d-flex flex-column align-items-start">
                            
                            <label className="form-label fw-bold fs-5">Color</label>
                            
                            <div className="color-container form-control d-flex flex-wrap">
                                
                                {noteColorSelection.map((color, index) => (
                                    <div
                                        key={index}
                                        className={`color-option ${props.newNoteData.color === color ? 'selected' : ''}`}
                                        style={{ backgroundColor: color}}
                                        onClick={() => props.handleColorChange(color)}
                                    />
                                ))}

                            </div>

                        </div>

                        <div className="popup-actions">
                            <button className='btn btn-primary mt-3 w-sm-25 mx-auto' onClick={props.handleNewNoteSubmit} disabled={props.isSubmitting}>
                                {props.isSubmitting ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise rotating" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                                    </svg> 
                                : 'Create'
                                }
                            </button>
                            <button 
                                className='btn btn-danger mt-3 ms-3 w-sm-25 mx-auto' 
                                onClick={props.handleNewNotePopupClose}>
                                Cancel
                            </button>
                        </div>
                    </>
                )}

                {props.editPopup && (
                    <>
                        <h3 className='mb-4'>Edit Note</h3>
                        
                        <div className="mb-3 d-flex flex-column align-items-start">
                            <label className="form-label fw-bold fs-5"> Title </label>
                            <input className='form-control' type="text" name="title" 
                                value={props.editNoteData.title} 
                                onChange={props.handleEditChange} 
                            />
                        </div>

                        <div className="my-4 d-flex flex-column align-items-start">
                            <label className="form-label fw-bold fs-5"> Content </label>
                            <textarea className='form-control popup-size' 
                                name="content" 
                                value={props.editNoteData.content} 
                                onChange={props.handleEditChange} 
                            />
                        </div>

                        <div className="mb-3 d-flex flex-column align-items-start">
                            <label className="form-label fw-bold fs-5">Tags</label>
                            <input
                                className='form-control'
                                type="text"
                                name="tags"
                                placeholder="Edit tags separated by commas"
                                value={props.editNoteData.tags}
                                onChange={props.handleEditChange}
                            />
                        </div>

                        <div className="mb-3 d-flex flex-column align-items-start">
                            
                            <label className="form-label fw-bold fs-5">Color</label>
                            
                            <div className="color-container form-control d-flex flex-wrap">
                                
                                {noteColorSelection.map((color, index) => (
                                    <div
                                        key={index}
                                        className={`color-option ${props.editNoteData.color === color ? 'selected' : ''}`}
                                        style={{ backgroundColor: color}}
                                        onClick={() => props.handleColorChange(color)}
                                    />
                                ))}

                            </div>

                        </div>

                        <div className="popup-actions">
                            <button className='btn btn-primary mt-3 w-sm-25 mx-auto' onClick={props.handleEditSubmit} disabled={props.isSubmitting}>
                                {props.isSubmitting ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise rotating" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                                    </svg> 
                                : 'Update'
                                }
                            </button>
                            <button className='btn btn-danger mt-3 ms-3 w-sm-25 mx-auto' 
                                onClick={props.handleEditPopupClose}>
                                Cancel
                            </button>
                        </div>
                    </>
                )}

                {props.deletePopup && (
                    <>
                        <h5>Confirm Delete</h5>
                        
                        <p className='mt-3 mb-1'>
                            Are you sure you want to delete the note?
                        </p>
                        <p className='mb-4 fw-bold'>
                            "{props.noteToDelete.title}"
                        </p>

                        <div className="popup-actions">
                            <button className="btn btn-danger" onClick={props.handleDeleteConfirmation} disabled={props.isSubmitting}>
                                {props.isSubmitting ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise rotating" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                                    </svg> 
                                : 'Yes, delete'
                                }
                            </button>
                            <button className="btn btn-secondary ms-3" 
                                onClick={props.handleDeletePopupClose}>
                                Cancel
                            </button>
                        </div>
                    </>                
                )}
                
                {props.logoutPopup && (
                    <>
                        <h5>Confirm Logout</h5>
                        
                        <p className='mt-3 mb-4'>
                            Are you sure you want to logout?
                        </p>

                        <div className="popup-actions">
                            <button className="btn btn-danger" onClick={props.handleLogoutConfirmation} disabled={props.isSubmitting}>
                                {props.isSubmitting ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise rotating" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                                    </svg> 
                                : 'Yes, logout'
                                }
                            </button>
                            <button className="btn btn-secondary ms-3" 
                                onClick={props.handleLogoutPopupClose}>
                                Cancel
                            </button>
                        </div>
                    </>                
                )}

            </div>
        </div>
    );
}

export default Popup;
