import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/Navbar.css";

function Navbar() {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle(
            "responsive_nav"
        );
    };

    return (
        <header>

            <nav ref={navRef} style={{zIndex:'1'}}>
                <a href="/#">Overview</a>
                <a href="/#">Integration</a>
                <a href="/#">Documentation</a>
                
                <button
                    className="nav-btn nav-close-btn"
                    onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>

            

            <button
                className="nav-btn"
                onClick={showNavbar}>
                <FaBars />
            </button>

            <h3>LOGO</h3>
        </header>
    );
}

export default Navbar;