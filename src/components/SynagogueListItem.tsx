import React, { useState } from 'react';
import InfoModal from './InfoModal';

interface Synagogue {
  name: string;
  city: string;
  state: string;
  movement: string;
}

// const SynagogueListItem = (props: any) => {
//   console.log(props);
//   return <div></div>;
// };

const SynagogueListItem = (synagogue: Synagogue): JSX.Element => {
  const [showInfo, setShowInfo] = useState(false);
  const { name, city, state, movement } = synagogue;

  return (
    <div className='synagogue-list-item' onClick={() => setShowInfo(true)}>
      <h5>{name}</h5>
      <h6>
        {city}, {state}
      </h6>
      <em>{movement}</em>
      {showInfo ? <InfoModal {...synagogue} /> : null}
    </div>
  );
};

export default SynagogueListItem;
