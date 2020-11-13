import React from 'react';

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

const SynagogueListItem = ({
  name,
  city,
  state,
  movement,
}: Synagogue): JSX.Element => {
  return (
    <div className='synagogue-list-item'>
      <h5>{name}</h5>
      <h6>
        {city}, {state}
      </h6>
      <em>{movement}</em>
    </div>
  );
};

export default SynagogueListItem;
