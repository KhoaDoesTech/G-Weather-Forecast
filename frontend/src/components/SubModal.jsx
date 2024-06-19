import PropTypes from 'prop-types';
import { useState } from 'react';
import { postSubscribe } from '../apis/User';

export const SubcribeModal = ({ OpenModal, CloseModal, city }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postSubscribe(email, city);
    setEmail('');
    CloseModal();
  };

  if (!OpenModal) return null;

  return (
    <div className="subcribe-modal-overlay">
      <div className="subcribe-modal">
        <div className="modal-header">
          <h3>Subscribe</h3>
          <i className="close-icon" onClick={CloseModal}>
            X
          </i>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="modal-input"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="modal-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

SubcribeModal.propTypes = {
  OpenModal: PropTypes.bool.isRequired,
  CloseModal: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
};

export default SubcribeModal;
