import React from 'react';
import '../css/Information.css';

const information = (props) => {
  const dates = Object.keys(props.dates).map(key =>
    <option key={key} >{props.dates[key]}</option>
  )
  return (
    <p>
      {dates}
    </p>
  );
};

export default information;