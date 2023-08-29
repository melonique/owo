import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useUi } from '@/contexts/UiContext'

function Lightbox({ title, children, name }) {
  const [show, setShow] = useState(false);
  const { changeUi } = useUi();

  const handleClose = () => {
    setShow(false);
    changeUi(name, true);
  };
  const setShowFalse = () => setShow(false);

  useEffect(() => {
    setShow(true);
  }, [])

  return (
    <Modal show={show} onHide={setShowFalse}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Ne plus voir ce message
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Lightbox;
