import React from 'react';
import { Note } from '../';

function NotesGrid ({notes, handleEdit, handleDeleteConfirmation}) {
    
    return (
        <main className="d-flex justify-content-center align-items-center w-100">
                
                {notes.length > 0 ? (
                    
                    <div id="notes-grid" className='gap-2 p-0 mt-sm-3 me-sm-1 mb-4 w-100'>
                        {notes.map((note) => (
                            <Note
                                key={note.note_id}
                                title={note.title}
                                content={note.content}
                                tags={note.tags}
                                color={note.color}
                                updated={note.updated}
                                onEdit={() => handleEdit(note.note_id)}
                                onDelete={() => handleDeleteConfirmation(note)}
                            />
                        ))}
                    </div>

                    ) : (
                        <div id='noNotes-grid'>
                            <p id='noNotes-p' className="d-flex justify-content-center align-items-center">
                                No notes available!
                            </p>
                        </div>
                )}

        </main>
    );
    
}

export default NotesGrid;