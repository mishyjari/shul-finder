import React from 'react';

interface Synagogue {
  name: string;
  city: string;
  state: string;
  movement: string;
}

export default function MobileListItem({
  name,
  city,
  state,
  movement,
}: Synagogue): JSX.Element {
  return (
    <div className='mobile-list-item'>
      <h5>{name}</h5>
      <h6>
        {city}, {state}
      </h6>
      <em>{movement}</em>
    </div>
  );
}
