import React from 'react';

function Menu ({newNotePopupOpen, handleOptionClick}) {

    return (
        <aside id="menu" className='d-flex flex-column align-items-center align-items-sm-start w-100 mt-3 mb-3'>
                                
            <h3>
                Menu
            </h3>
                
            <div id='menu-options' 
                className='d-flex flex-row flex-wrap justify-content-evenly align-items-center 
                            flex-sm-column align-items-sm-start ms-sm-2'>   
                
                <hr className="w-100 my-2" />
                <button type='button' onClick={() => newNotePopupOpen(true)} 
                        className="my-2 text-light text-decoration-none bg-transparent border-0">
                    Create note
                </button>

                <hr id='middle-hr' className="w-100 my-2" />
                <button type='button' onClick={() => handleOptionClick('folder')} 
                        className="my-2 mb-sm-2 text-light text-decoration-none bg-transparent border-0">
                    Group by folder
                </button>
            
                <button type='button' onClick={() => handleOptionClick('color')} 
                        className="my-2 mb-sm-2 text-light text-decoration-none bg-transparent border-0">   
                    Group by color
                </button>

                <div className='mt-sm-2 ms-sm-2 mb-sm-1 d-flex justify-content-center align-items-center flex-wrap'>
                    <label htmlFor="view-dropdown" className="text-light text-decoration-none">View</label>
                    <select id="view-dropdown" 
                            className="form-select-m bg-dark text-light border-0 ms-2" 
                            onChange={(e) => handleOptionClick(e.target.value)}>
                        <option value="view-9">9</option>
                        <option value="view-18">18</option>
                        <option value="view-27">27</option>
                        <option value="view-all">All</option>
                    </select>
                </div>
                <hr className="w-100 my-2" />

            </div>

        </aside>
    );

}

export default Menu;