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

  useEffect(() => {
    setShow(true);
  }, [])

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Lightbox;
