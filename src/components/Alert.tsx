import React, { useState } from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';

export default function Alert(props: any) {
  const [show, setShow] = useState(true);

  const { heading, text, variant } = props;

  return show ? (
    <BootstrapAlert
      variant={variant}
      onClose={() => setShow(false)}
      dismissible
    >
      <BootstrapAlert.Heading>{heading}</BootstrapAlert.Heading>
      <p>{text}</p>
    </BootstrapAlert>
  ) : (
    <></>
  );
}
