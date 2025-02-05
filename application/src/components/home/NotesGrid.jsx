import React from 'react';
import { Note } from '../';

function NotesGrid (props) {
    
    return (
        <main className="d-flex justify-content-center align-items-center w-100">
                
                {props.notes.length > 0 ? (
                    
                    <div id="notes-grid" className='gap-2 p-0 mt-sm-3 me-sm-1 mb-4 w-100'>
                        {props.notes.map((note) => (
                            <Note
                                key={note.note_id}
                                title={note.title}
                                content={note.content}
                                tags={note.tags}
                                color={note.color}
                                updated={note.updated}
                                onEdit={() => props.handleEdit(note.note_id)}
                                onDelete={() => props.handleDeleteConfirmation(note)}
                            />
                        ))}
                    </div>

                    ) : (
                        <div id='noNotes-grid'>
                            <p id='noNotes-p' className="d-flex justify-content-center align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-arrow-clockwise rotating" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                                </svg> 
                            </p>
                        </div>
                )}

        </main>
    );
    
}

export default NotesGrid;