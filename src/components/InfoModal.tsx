import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface Synagogue {
  name: string;
  city: string;
  state: string;
  movement: string;
  url: string;
  phone: string;
  zip: string;
  address: string;
}

export default function InfoModal(synagogue: Synagogue): JSX.Element {
  const [show, setShow] = useState(true);
  const { city, state, movement, url, phone, zip, address } = synagogue;
  console.log(synagogue);

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size='lg'
      centered
      variant='dark'
      backdrop='static'
    >
      <Modal.Header closeButton>
        <Modal.Title>{synagogue.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {address}
          <br />
          {city}, {state}, {zip}
        </p>
        <p>{movement}</p>
        <p>
          <strong>Tel: </strong>
          {phone}
        </p>
        <p>
          <a href={url} target='_blank' rel='noreferrer'>
            {url}
          </a>
        </p>

        <Button variant='secondary w-50' onClick={() => setShow(false)}>
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
}
