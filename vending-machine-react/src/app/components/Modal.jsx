import React from 'react';
import PropTypes from 'prop-types';

export default function Modal({ name,isOpen,children,onClickMadal }) {
  return (
    <div className={name} style={{ display:isOpen ? "block" : "none" }}>
      <div>{children}</div>
      <button onClick={onClickMadal}>Close</button>
    </div>

  );
}
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node,
  onClickMadal: PropTypes.func.isRequired,
  name: PropTypes.string
};
