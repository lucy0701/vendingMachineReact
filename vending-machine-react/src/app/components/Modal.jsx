import React from 'react';
import PropTypes from 'prop-types';

export default function Modal({ name, isOpen, children, onClickModal }) {
  return (
    <div className={name} style={{ display:isOpen ? 'block' : 'none' }}>
      <div>{children}</div>
      <button onClick={onClickModal}>Close</button>
    </div>
  );
}
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node,
  onClickModal: PropTypes.func.isRequired,
  name: PropTypes.string,
};
