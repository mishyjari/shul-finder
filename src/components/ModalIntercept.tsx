import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Search from './Search';

export default function ModalIntercept() {
  const [show, setShow] = useState(true);

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
        <Search cb={() => console.log('mew')} />
        <Button onClick={() => setShow(false)}>Use Current Location</Button>
      </Modal.Body>
    </Modal>
  );
}
