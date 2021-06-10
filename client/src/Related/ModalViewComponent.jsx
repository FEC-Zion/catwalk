import React from 'react';

const ModalViewComponent = (props) => {

  // declare new comparison object
  let comparison = {};
  let comparisonArray = [];

  // iterate over current product, setting the characteristic as the key and the value as the first index in an array at the new key
  for (let key in props.currentChar) {
    comparison[key] = [props.currentChar[key].value];
  }
  // iterate over related product
  for (let relKey in props.relatedChar) {
    // if they key exists, push this new value to the value array for that key
    if (comparison[relKey]) {
      comparison[relKey].push(props.relatedChar[relKey].value);
    } else {
    // if not, set the value to [null, value]
      comparison[relKey] = [undefined, props.relatedChar[relKey].value];
    }
  }

  const ifNumberOrNull = (data) => {
    if (data === null) {
      return 'Nothing yet';
    } else if (!data) {
      return '';
    } else if (Number(data) !== NaN) {
      data = Number(data);
      return data.toFixed(1);
    } else {
      return data;
    }
  };


  for (let row in comparison) {
    let currentProductValue = ifNumberOrNull(comparison[row][0]);
    let relatedProductValue = ifNumberOrNull(comparison[row][1]);
    comparisonArray.push([row, currentProductValue, relatedProductValue]);
  }


  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>{props.currentName}</td>
            <td></td>
            <td>{props.relatedName}</td>
          </tr>
        </thead>
        <tbody>
          {comparisonArray.map((row, i) => { return <ComparisonRow row={row} key={i}/>; })}
        </tbody>
      </table>
    </div>
  );
};


const ComparisonRow = (props) => {
  return (
    <tr>
      <td>{props.row[1]}</td>
      <td>{props.row[0]}</td>
      <td>{props.row[2]}</td>
    </tr>
  );
};


export default ModalViewComponent;
