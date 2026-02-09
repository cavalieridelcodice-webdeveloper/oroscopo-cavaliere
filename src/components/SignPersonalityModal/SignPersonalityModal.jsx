import React, { useEffect } from 'react';
import './SignPersonalityModal.css';

// Import images for the modal (Cavaliere versions)
import cavaliereAriete from '../../assets/images/cavaliere-ariete.png';
import cavaliereToro from '../../assets/images/cavaliere-toro.png';
import cavaliereGemelli from '../../assets/images/cavaliere-gemelli.png';
import cavaliereCancro from '../../assets/images/cavaliere-cancro.png';
import cavaliereLeone from '../../assets/images/cavaliere-leone.png';
import cavaliereVergine from '../../assets/images/cavaliere-vergine.png';
import cavaliereBilancia from '../../assets/images/cavaliere-bilancia.png';
import cavaliereScorpione from '../../assets/images/cavaliere-scorpione.png';
import cavaliereSagittario from '../../assets/images/cavaliere-sagittario.png';
import cavaliereCapricorno from '../../assets/images/cavaliere-capricorno.png';
import cavaliereAcquario from '../../assets/images/cavaliere-acquario.png';
import cavalierePesci from '../../assets/images/cavaliere-pesci.png';

const cavaliereImages = {
    ariete: cavaliereAriete,
    toro: cavaliereToro,
    gemelli: cavaliereGemelli,
    cancro: cavaliereCancro,
    leone: cavaliereLeone,
    vergine: cavaliereVergine,
    bilancia: cavaliereBilancia,
    scorpione: cavaliereScorpione,
    sagittario: cavaliereSagittario,
    capricorno: cavaliereCapricorno,
    acquario: cavaliereAcquario,
    pesci: cavalierePesci,
};

const SignPersonalityModal = ({ sign, onClose }) => {
    if (!sign) return null;

    // Prevent background scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    // Use the ID to get the correct image. 
    // IMPORTANT: The IDs in zodiacSigns.js are 'aries', 'taurus' etc (English), 
    // but the user's file names seem to be in Italian ('cavaliere-ariete.png').
    // I need to map the English IDs to the Italian image keys.
    const signIdMap = {
        aries: 'ariete',
        taurus: 'toro',
        gemini: 'gemelli',
        cancer: 'cancro',
        leo: 'leone',
        virgo: 'vergine',
        libra: 'bilancia',
        scorpio: 'scorpione',
        sagittarius: 'sagittario',
        capricorn: 'capricorno',
        aquarius: 'acquario',
        pisces: 'pesci'
    };

    const imageKey = signIdMap[sign.id];
    const imageSrc = cavaliereImages[imageKey];

    return (
        <div className="personality-modal-overlay">
            <div className="personality-modal-content">
                <button className="personality-modal-close" onClick={onClose}>
                    &times;
                </button>

                <div className="personality-modal-body">
                    <div className="personality-image-container">
                        <img src={imageSrc} alt={`Cavaliere ${sign.name}`} className="personality-image" />
                    </div>

                    <div className="personality-text-container">
                        <h2 className="personality-title">La Personalità del {sign.name}</h2>
                        <div className="personality-divider"></div>
                        <p className="personality-description">
                            {sign.personality || "Descrizione della personalità non disponibile."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignPersonalityModal;
