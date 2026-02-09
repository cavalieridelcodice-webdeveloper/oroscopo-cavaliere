import React, { useState } from 'react';
import './SignPersonalityNav.css';
import { zodiacSigns } from '../../data/zodiacSigns';

const SignPersonalityNav = ({ onSignSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleSignClick = (sign) => {
        onSignSelect(sign);
        setIsOpen(false);
    };

    return (
        <nav className="sign-personality-nav">
            <div
                className={`nav-trigger ${isOpen ? 'active' : ''}`}
                onClick={toggleOpen}
                onMouseEnter={() => setIsOpen(true)}
            >
                <span className="nav-label">Personalità del Segno</span>
                <span className="nav-arrow">▼</span>
            </div>

            <div
                className={`nav-dropdown ${isOpen ? 'open' : ''}`}
                onMouseLeave={() => setIsOpen(false)}
            >
                <ul className="nav-list">
                    {zodiacSigns.map((sign) => (
                        <li key={sign.id} className="nav-item">
                            <button
                                className="nav-btn"
                                onClick={() => handleSignClick(sign)}
                            >
                                {sign.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default SignPersonalityNav;
