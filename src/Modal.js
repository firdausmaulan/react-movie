import React from 'react';
import './Modal.css'; // Ensure this imports your CSS
import { baseImageUrl } from './Api';

const Modal = ({ isOpen, onClose, movie }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4>{movie.title}</h4>
          <button onClick={onClose} className="close-button">×</button>
        </div>
        <div className="modal-body">
          <div className="modal-left">
            <img src={`${baseImageUrl}/${movie.poster_path}`} alt={movie.title} />
          </div>
          <div className="modal-right">
            <p><strong>Overview:</strong></p>
            <p>{movie.overview}</p>
            <p><strong>Rating:</strong> {movie.vote_average.toFixed(2)} / 10</p>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
