import React from 'react';
import ZodiacIcon from '../ZodiacIcon/ZodiacIcon';
import './HoroscopeCard.css';

const HoroscopeCard = ({ sign, data, onClose }) => {
  if (!data) return null;

  const renderStars = (rating) => {
    return "⭐".repeat(rating || 0);
  };

  return (
    <article className="horoscope-card-overlay">
      <div className="card-header">
        <div className="title-group">
          <div style={{ width: '40px', height: '40px', color: 'var(--color-primary)', marginBottom: '0.5rem', }}>
            <ZodiacIcon signId={sign.id} />
          </div>
          <h2 className="sign-title">{sign.name}</h2>
          <div className="rating-stars">{renderStars(data.rating)}</div>
          <p className="current-date">{data.date}</p>
        </div>
        <button className="close-btn" onClick={onClose} aria-label="Chiudi">
          &times;
        </button>
      </div>

      <div className="horoscope-content scrollable">
        {data.love && (
          <section className="horoscope-section">
            <h3>💖 Amore</h3>
            <p>{data.love}</p>
          </section>
        )}

        {data.work && (
          <section className="horoscope-section">
            <h3>💼 Lavoro</h3>
            <p>{data.work}</p>
          </section>
        )}

        {data.luck && (
          <section className="horoscope-section">
            <h3>🍀 Fortuna</h3>
            <p>{data.luck}</p>
          </section>
        )}

        {!data.love && <p>{data.text}</p>}
      </div>

      <div className="horoscope-footer">
        {data.tip && (
          <div className="tip-box">
            {data.tip}
          </div>
        )}
        {data.luckyNumber && (
          <div className="lucky-number">
            Numero fortunato: {data.luckyNumber}
          </div>
        )}
      </div>
    </article>
  );
};

export default HoroscopeCard;