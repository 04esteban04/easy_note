import React, { useState } from 'react';

function Menu ({newNotePopupOpen, handleOptionClick, totalNotes, page, setPage}) {

    const [selectedView, setSelectedView] = useState('view-all');

    const handleViewChange = (e) => {

        const selectedValue = e.target.value;

        setSelectedView(selectedValue); 
        setPage(1);
        handleOptionClick(selectedValue);

    };

    const calculateTotalPages = () => {

        if (selectedView === 'view-all') {
            return 1; 
        }

        const notesPerPage = parseInt(selectedView.split('-')[1], 10);

        return Math.ceil(totalNotes / notesPerPage);
    };

    const handlePageChange = (page) => {
        
        let getTotalPages = calculateTotalPages();
        
        if (page >= 1 && page <= getTotalPages) {
            setPage(page);
        }

    };

    return (
        <aside id="menu" className='d-flex flex-column justify-content-center align-items-center align-items-sm-start w-100 mt-3 mb-3'>

        
            <h3 className='d-flex justify-content-center justify-content-sm-start w-100'>
                Menu
            </h3>
                
            <div id='menu-options' 
                className='d-flex flex-wrap justify-content-evenly align-items-center flex-sm-column align-items-sm-start'>   
                
                <hr className="w-100 my-2" />
                
                <button type='button' onClick={() => newNotePopupOpen(true)} 
                        className={`option-button text-decoration-none bg-transparent border-0 my-sm-2 ms-sm-2
                            ${(localStorage.getItem("theme") === "light" ? "menu-light-mode" : "menu-dark-mode")}`}>
                    Create note
                </button>

                <hr id='middle-hr' className="w-100 my-2" />

                <button type='button' onClick={() => handleOptionClick('tag')} 
                        className={`option-button text-decoration-none bg-transparent border-0 my-sm-2 mb-sm-2 ms-sm-2 
                            ${(localStorage.getItem("theme") === "light" ? "menu-light-mode" : "menu-dark-mode")}`}>
                    Order by tag
                </button>
            
                <button type='button' onClick={() => handleOptionClick('color')} 
                        className={`option-button text-decoration-none bg-transparent border-0 my-sm-2 mb-sm-2 ms-sm-2 
                            ${(localStorage.getItem("theme") === "light" ? "menu-light-mode" : "menu-dark-mode")}`}>   
                    Order by color
                </button>

                <button type='button' onClick={() => handleOptionClick('reset')} 
                        className={`option-button text-decoration-none bg-transparent border-0 my-sm-2 mb-sm-2 ms-sm-2 
                            ${(localStorage.getItem("theme") === "light" ? "menu-light-mode" : "menu-dark-mode")}`}>   
                    Reset order
                </button>

                <hr className="w-100 my-2" />

                <div className='d-flex flex-wrap align-items-center flex-sm-column'>

                    <div className="my-2">

                        <button 
                            className={`page-selector text-decoration-none bg-transparent border-0 cursor-pointer m-0
                                ${(localStorage.getItem("theme") === "light" ? "menu-light-mode" : "menu-dark-mode")}`} 
                            type='button'
                            onClick={() => handlePageChange(page - 1)} 
                            disabled={page === 1}
                            >   
                            {page === 1 ? 
                            
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16">
                                    <path d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753"/>
                                </svg> 
                                
                                :
                                
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                                    <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                                </svg>
                            
                        }

                        </button>
                        
                        <span id="page-number" 
                            className={`${(localStorage.getItem("theme") === "light" ? "menu-light-mode" : "menu-dark-mode")}`}
                        >
                            {`Page ${page} of ${calculateTotalPages()}`}
                        </span>

                        <button 
                            className={`page-selector text-decoration-none bg-transparent border-0
                                ${(localStorage.getItem("theme") === "ligh" ? "menu-light-mode" : "menu-dark-mode")}`} 
                            type='button'
                            onClick={() => handlePageChange(page + 1)} 
                            disabled={page === calculateTotalPages()}
                            >
                            {page === calculateTotalPages() ? 

                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                                    <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753"/>
                                </svg>

                                :

                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                </svg>

                                }

                        </button>

                    </div>

                    <div id='view-dropdown-container' className='d-flex justify-content-center mt-sm-2 mb-sm-1'>
                        
                        <label htmlFor="view-dropdown" 
                            className={`text-decoration-none 
                                ${(localStorage.getItem("theme") === "light" ? "menu-light-mode" : "menu-dark-mode")}`}
                        >
                            View
                        </label>
                        
                        <select id="view-dropdown" 
                                className={`form-select-m border-1 ms-2 rounded 
                                    ${(localStorage.getItem("theme") === "light" ? 
                                    "menu-light-mode bg-tranparent" : 
                                    "menu-dark-mode bg-dark")}`}
                                value={selectedView} 
                                onChange={handleViewChange}
                        >

                            <option value="view-9">9</option>
                            <option value="view-18">18</option>
                            <option value="view-27">27</option>
                            <option value="view-all">All</option>
                        
                        </select>

                    </div>

                </div>

                <hr className="w-100 my-2" />

            </div>

        </aside>
    );

}

export default Menu;