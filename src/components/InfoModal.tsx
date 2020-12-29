import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface Synagogue {
  name: string;
  city: string;
  state: string;
  movement: string;
}

export default function InfoModal(synagogue: Synagogue): JSX.Element {
  const [show, setShow] = useState(true);
  const { name, city, state, movement } = synagogue;

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size='lg'
      centered
      variant='dark'
    >
      <Modal.Header closeButton>
        <Modal.Title>{synagogue.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {city}, {state}
        </p>
        <p>{movement}</p>
        <Button variant='secondary w-50' onClick={() => setShow(false)}>
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
}
