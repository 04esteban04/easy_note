import React from 'react';
import './note.css';

function Note (props) {  
    
    return (
        <>  

            <div className="col card m-2 shadow-sm text-center" 
                style={{'--note-color': props.color || 'white'}}>
                
                    <div className="card-body p-0"> 
                                
                            <div className='d-flex justify-content-between justify-content-sm-end gap-2 me-2 mt-2'>
                                <button className="btn btn-link p-0" onClick={props.onEdit} aria-label="Edit">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill={`${props.color !== '#FFFFFF' ? 'black' : 'currentColor'}`} className="bi bi-pencil-square svg-size" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                    </svg>
                                </button>

                                <button className="btn btn-link p-0" onClick={props.onDelete} aria-label="Delete">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill={`${props.color !== '#FFFFFF' ? 'black' : 'currentColor'}`} className="bi bi-trash svg-size m-0" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                    </svg>
                                </button>
                            </div>

                            <h5 className='my-2'>
                                {props.title}
                            </h5>

                            {props.tags !== '' &&
                                <div className=" p-1 my-1">
                                    {props.tags && props.tags.split(',').map((tag, index) => (
                                        <span key={index} className="badge bg-dark m-1">{tag.trim()}</span>
                                    ))}
                                </div>
                            }

                            <div className="d-flex justify-content-center align-items-center">
                                <p className='card-content p-3 mt-2 mb-3'>
                                    {props.content}
                                </p>
                            </div>

                            <div className='card-footer text-body-secondary'>
                                <small>Last updated: {props.updated}</small>
                            </div>
        
                    </div>

            </div>

        </>
    );

}

export default Note;