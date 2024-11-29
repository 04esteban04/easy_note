import "./navbar.css"

function Navbar () {
    return (
        <nav className="navbar">
            <div className='logo-div'>
                <img className="logo" src="/assets/logo.png" alt="Logo" />
            </div>  
            <ul className="navbar-links">
                <li><a href="/about">About</a></li>
                <li><a href="/login">Login</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;