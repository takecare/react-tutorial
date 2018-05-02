import React from 'react';

export const History = (props) => {
  return (
    <li className="history">
        move {props.index + 1}<br/>
        {props.squares.filter(item => item != null).length} squares taken<br/>
        {props.current} was playing
      </li>
  );
}
