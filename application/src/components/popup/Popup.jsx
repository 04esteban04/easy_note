import React from 'react';
import './popup.css';

function Popup(props) {
    
    const noteColorSelection = [
        '#FFFFFF',
        '#FFB3BA',
        '#FFDFBA',
        '#FACD96',
        '#FFFFBA',
        '#BAFFC9',
        '#CFFFB3',
        '#BAE1FF',
        '#E6CCFF',
        '#D5AAFF' 
    ];

    return (
        <div className="modal fade show popup-overlay">
            <div className="popup-content">
                
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
                                value={props.newNoteData.title} 
                                onChange={props.handleNewNoteChange} 
                            />
                        </div>

                        <div className="my-4 d-flex flex-column align-items-start">
                            <label className="form-label fw-bold fs-5"> Content </label>
                            <textarea 
                                className='form-control popup-size' 
                                name="content" 
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
                            <div className="d-flex flex-wrap">
                                {noteColorSelection.map((color, index) => (
                                    <div
                                        key={index}
                                        className="color-option"
                                        style={{
                                            backgroundColor: color,
                                            width: '30px',
                                            height: '30px',
                                            borderRadius: '50%',
                                            margin: '5px',
                                            border: props.newNoteData.color === color ? '2px solid black' : '1px solid gray',
                                            boxShadow: props.newNoteData.color === color ? '0 0 10px rgba(0, 0, 0, 0.5)' : 'none',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => props.handleColorChange(color)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="popup-actions">
                            <button 
                                className='btn btn-primary mt-3 w-25 mx-auto' 
                                onClick={props.handleNewNoteSubmit}>
                                Create
                            </button>
                            <button 
                                className='btn btn-danger mt-3 ms-3 w-25 mx-auto' 
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
                            <div className="d-flex flex-wrap">
                                {noteColorSelection.map((color, index) => (
                                    <div
                                        key={index}
                                        className="color-option"
                                        style={{
                                            backgroundColor: color,
                                            width: '30px',
                                            height: '30px',
                                            borderRadius: '50%',
                                            margin: '5px',
                                            border: props.editNoteData.color === color ? '2px solid black' : '1px solid gray',
                                            boxShadow: props.editNoteData.color === color ? '0 0 10px rgba(0, 0, 0, 0.5)' : 'none',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => props.handleColorChange(color)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="popup-actions">
                            <button className='btn btn-primary mt-3 w-25 mx-auto' 
                                onClick={props.handleEditSubmit}>
                                Update
                            </button>
                            <button className='btn btn-danger mt-3 ms-3 w-25 mx-auto' 
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
                            <button className="btn btn-danger" 
                                onClick={props.handleDeleteConfirmation}>
                                Yes, delete
                            </button>
                            <button className="btn btn-secondary ms-3" 
                                onClick={props.handleDeletePopupClose}>
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
