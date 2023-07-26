import PropTypes from 'prop-types';
import React, { useState  } from 'react';

import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';




const ButtonWithConfirm = ({ onClick, children, confirmMessage = "Voulez-vous vraiment supprimer votre annonce ?" }) => {
  const closePopup = () => {
    document.body.click();
  }
  const confirm = () => {
    closePopup();
    onClick();
  };

  return (
    <OverlayTrigger trigger="click" rootClose overlay={
      <Popover>
        <Popover.Header as="h3">Supprimer</Popover.Header>
        <Popover.Body>
          {confirmMessage}
          <div className="d-flex justify-content-between align-items-start">
            <Button variant="danger" onClick={closePopup}>Non</Button>
            <Button variant="success" onClick={confirm}>Oui</Button>
          </div>
        </Popover.Body>
      </Popover>
    }>
      <Button variant="secondary">{children}</Button>
    </OverlayTrigger>
  );
}

ButtonWithConfirm.propTypes = {};

export default ButtonWithConfirm;
