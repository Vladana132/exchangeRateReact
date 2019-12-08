import React from "react";

const response = (props) => {
const rates = Object.keys(props.data).map(key => 
  <option value={key}>{props.data[key]} on {key}</option>
)
  return (
    <div >
        <p>A max exchange rate is {rates[1]}.</p>
        <p>A min exchange rate is {rates[0]}. </p>
        <p>An exchange rate is {rates[2]}</p>
  </div>
 );
};

export default response;