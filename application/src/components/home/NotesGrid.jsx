import React from 'react';
import { Note } from '../';

function NotesGrid ({notes, handleEdit, handleDeleteConfirmation}) {
    
    return (
        <main className="d-flex justify-content-center align-items-center w-100">
            <div id="notes-grid" className='gap-2 p-0 mt-sm-3 me-sm-1 mb-sm-2 w-100'>
                
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <Note
                            key={note.id}
                            title={note.title}
                            content={note.content}
                            updated={note.updated}
                            onEdit={() => handleEdit(note.id)}
                            onDelete={() => handleDeleteConfirmation(note)}
                        />
                    ))
                ) : (
                    <p className="text-light d-flex justify-content-center align-items-center">No notes available</p>
                )}

            </div>
        </main>
    );
    
}

export default NotesGrid;