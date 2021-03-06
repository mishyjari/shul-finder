import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Search from './Search';

export default function ModalIntercept(props: any) {
  const [show, setShow] = useState(true);
  const toggleShow = () => {
    setShow(!show);
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
        <Search
          handleClose={toggleShow}
          toggleAnnotations={props.toggleAnnotations}
        />
        <Button variant='secondary w-50' onClick={() => setShow(false)}>
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
}
