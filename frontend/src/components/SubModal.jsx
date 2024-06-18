import PropTypes from 'prop-types';

export const SubcribeModal = ({ OpenModal, CloseModal }) => {
  if (!OpenModal) return null;
  return (
    <div className="subcribe-modal">
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <h3
          style={{
            width: '80%',
            display: 'flex',
            justifyContent: 'center',
            marginLeft: '5%',
          }}
        >
          Subscribe
        </h3>
        <i
          className="close-icon"
          style={{ cursor: 'pointer' }}
          onClick={CloseModal}
        >
          X
        </i>
      </div>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '90%',
          margin: 'auto',
        }}
      >
        <input
          type="email"
          style={{
            padding: '3%',
            marginTop: '10px',
            border: 'none',
            borderRadius: '5px',
          }}
          placeholder="Enter your email address"
        />
        <button
          type="submit"
          style={{
            padding: '3%',
            borderRadius: '5px',
            border: 'none',
            marginTop: '10px',
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

SubcribeModal.propTypes = {
  OpenModal: PropTypes.bool.isRequired,
  CloseModal: PropTypes.func.isRequired,
};
