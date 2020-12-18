import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Search from './Search';

export default function ModalIntercept(props: any) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    props.callback();
  };

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size='lg'
      centered
      variant='dark'
    >
      <Modal.Header closeButton>
        <Modal.Title>Search By Location</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Search />
        <Button onClick={handleClose}>Use Current Location</Button>
      </Modal.Body>
    </Modal>
  );
}
