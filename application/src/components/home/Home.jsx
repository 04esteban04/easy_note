import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import { Footer, Navbar, Popup } from '../';
import NotesGrid from './NotesGrid';
import Menu from './Menu';

function Home () {

    const navigate = useNavigate();
    const [sessionError, setSessionError] = useState(true);
    const [popupMessage, setPopupMessage] = useState(null);
    const [popupSuccessMessage, setPopupSuccessMessage] = useState(false);
    
    const [notes, setNotes] = useState([]);
    const [viewOption, setViewOption] = useState('view-all');

    const [isNewNotePopupOpen, setIsNewNotePopupOpen] = useState(false);
    const [newNoteData, setNewNoteData] = useState({ title: '', content: '', tags: '', color: '#FFFFFF' });

    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [editNoteData, setEditNoteData] = useState(null);

    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null);

    useEffect(() => {

        async function checkSession() {
        
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/checkUser`, {
                    method: 'GET',
                    credentials: 'include',
                });
    
                const data = await response.json();
    
                if (!data.success) {
                    setPopupMessage(data.message);
                    setPopupSuccessMessage(false);
                } 
                
                else {
                    setSessionError(false); 
                }
            } 
            
            catch (error) {
                console.error('Error during session check (home):', error);
                setPopupMessage('An error occurred while checking the session in home page.');
            }
        }

        checkSession();
    });

    useEffect(() => {

        async function fetchNotes() {

            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/getNotes`, {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await response.json();
                
                if (data.success) {
                    setNotes(data.userNotes);
                } else {
                    setPopupMessage(data.message || 'Failed to fetch notes.');
                }
            } 
            
            catch (error) {
                console.error('Error fetching notes:', error);
                setPopupMessage('An error occurred while fetching the notes.');
            }
        }

        if (!sessionError) {
            fetchNotes(); 
        }

    }, [sessionError]);

    const handlePopupClose = () => {
        
        setPopupMessage(null);
        setPopupSuccessMessage(false);
        
        navigate('/login');

    };

    const handleNewNoteChange = (e) => {

        const { name, value } = e.target;
        
        setNewNoteData((prev) => ({
          ...prev,
          [name]: value,
        }));

    };

    const handleNewNoteSubmit = async () => {   
        
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/createNote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newNoteData),
            });
        
            const data = await response.json();
        
            if (data.success) {
                setNotes((prevNotes) => [...prevNotes, data.noteCreated]);
                setPopupMessage(data.message || 'Note created successfully!');
                setPopupSuccessMessage(true);
            } 
            
            else {
                setPopupMessage(data.message || 'Failed to create note.');
                setPopupSuccessMessage(false);
            }
        
            setIsNewNotePopupOpen(false);
            setNewNoteData({ title: '', content: '', tags: '', color: '#FFFFFF' });
        
        } 
        
        catch (error) {
          console.error('Error creating note:', error);
          setPopupMessage('An error occurred while creating the note.');
        }
    
    };
     
    const handleNewNotePopupClose = () => {

        setIsNewNotePopupOpen(false);
        setNewNoteData({ title: '', content: '' });

    };

    const handleEdit = (noteId) => {

        const noteToEdit = notes.find((note) => note.id === noteId);
        
        setEditNoteData({
            ...noteToEdit,
            tags: noteToEdit.tags || '',
            color: noteToEdit.color || '#FFFFFF'
        });

        setIsEditPopupOpen(true);

    };

    const handleEditChange = (e) => {

        const { name, value } = e.target;
        
        setEditNoteData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleEditSubmit = async () => {
        
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/updateNote`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(editNoteData),
            });

            const data = await response.json();

            if (data.success) {
                
                setNotes((prevNotes) =>
                    prevNotes.map((note) =>
                        note.id === editNoteData.id ? { ...note, ...data.note } : note
                    )
                );

                setPopupMessage(data.message);
                setPopupSuccessMessage(true);

            } else {
                setPopupMessage(data.message || 'Failed to update note.');
                setPopupSuccessMessage(false);
            }
            
            setIsEditPopupOpen(false);

        } 
        
        catch (error) {
            console.error('Error updating note:', error);
            setPopupMessage('An error occurred while updating the note.');
        }

    };

    const handleEditPopupClose = () => {
        setIsEditPopupOpen(false);
    };

    const handleDeleteConfirmation = (note) => {

        setNoteToDelete(note);
        setIsDeletePopupOpen(true);

    };

    const handleDelete = async () => {

        if (!noteToDelete) return;

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/deleteNote`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ id: noteToDelete.id }),
            });

            const data = await response.json();

            if (data.success) {
                
                setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteToDelete.id));
                setPopupMessage(data.message || 'Note deleted successfully!');
                setPopupSuccessMessage(true);

            } 
            
            else {
                setPopupMessage(data.message || 'Failed to delete note.');
            }

        } 
        
        catch (error) {
            console.error('Error deleting note:', error);
            setPopupMessage('An error occurred while deleting the note.');
        } 
        
        finally {
            setIsDeletePopupOpen(false);
            setNoteToDelete(null);
        }

    };

    const handleDeletePopupClose = () => {

        setIsDeletePopupOpen(false);
        setNoteToDelete(null);

    };

    const handleColorChange = (color) => {

        if (isEditPopupOpen) {
            setEditNoteData((prev) => ({
                ...prev,
                color: color,
            }));
        } 
        
        else {
            setNewNoteData((prev) => ({
                ...prev,
                color: color,
            }));
        }

    };
    
    const getFilteredNotes = () => {

        switch (viewOption) {
            
            case 'view-9':
                return notes.slice(0, 9);
            case 'view-18':
                return notes.slice(0, 18);
            case 'view-27':
                return notes.slice(0, 27);
            case 'view-all':
            default:
                return notes;

        }
    };
    
    const handleOptionClick = (optionSelected) => {
        
        try {

            switch (optionSelected) {

                case 'tag': {
                    const sortedByTag = [...notes].sort((a, b) => {
                        if (a.tags < b.tags) return -1;
                        if (a.tags > b.tags) return 1;
                        return 0;
                    });

                    setNotes(sortedByTag);
                    break;
                }

                case 'color': {
                    const sortedByColor = [...notes].sort((a, b) => {
                        if (a.color < b.color) return -1;
                        if (a.color > b.color) return 1;
                        return 0;
                    });

                    setNotes(sortedByColor);
                    break;
                }
                
                default: {              
                    setViewOption(optionSelected);
                    break;
                }

            }

        } 
        
        catch (error) {
            console.error('Error while applying filter (home):', error);
            setPopupMessage(`An error occurred while selecting the option ${optionSelected}. Please try again.`);
        }

    }; 
    
    if (sessionError) {
        
        return (
            <>  
                {popupMessage && (<Popup message={popupMessage} onClose={handlePopupClose} />)}
            </>
        );

    } 
    
    else {    

        return (
            <div className='d-flex justify-content-center align-items-center'>
                <div className="home-container">
                    
                    <Navbar theme={true} register={false} login={false} logout={true} />

                    <div className="container home-container">
                    
                        <Menu newNotePopupOpen={setIsNewNotePopupOpen} handleOptionClick={handleOptionClick}/>

                        <NotesGrid 
                            notes={getFilteredNotes()} 
                            handleEdit={handleEdit} 
                            handleDeleteConfirmation={handleDeleteConfirmation}
                        />    

                    </div>
                    
                    <Footer />

                    {popupMessage && (
                        <Popup 
                            successMessage={popupSuccessMessage} 
                            message={popupMessage} 
                            onClose={handlePopupClose} 
                        />
                    )}
                    
                    {isNewNotePopupOpen && (
                        <Popup 
                            newNotePopup={isNewNotePopupOpen}
                            newNoteData={newNoteData}
                            handleNewNoteChange={handleNewNoteChange}
                            handleColorChange={handleColorChange}
                            handleNewNoteSubmit={handleNewNoteSubmit}
                            handleNewNotePopupClose={handleNewNotePopupClose}
                        />
                    )}

                    {isEditPopupOpen && (
                        <Popup 
                            editPopup={isEditPopupOpen} 
                            editNoteData={editNoteData}
                            handleEditChange={handleEditChange}
                            handleColorChange={handleColorChange}
                            handleEditSubmit={handleEditSubmit}
                            handleEditPopupClose={handleEditPopupClose}
                        />
                    )}

                    {isDeletePopupOpen && (
                        <Popup 
                            deletePopup={isDeletePopupOpen}
                            noteToDelete={noteToDelete}
                            handleDeleteConfirmation={handleDelete}
                            handleDeletePopupClose={handleDeletePopupClose}
                        />
                    )}
                    
                </div>
            </div>
        );

    }
}

export default Home;