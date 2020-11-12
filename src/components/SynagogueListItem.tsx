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
    <tr>
      <td>{name}</td>
      <td>{city}</td>
      <td>{state}</td>
      <td>{movement}</td>
    </tr>
  );
};

export default SynagogueListItem;
