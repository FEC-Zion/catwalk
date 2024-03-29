import React, {useContext} from 'react';
import {ModalView, TertiaryText, ModalTable, ModalHeader, ModalRows, ModalCellLeft, ModalCellRight, ModalCellCenter, ModalOverlay} from './styled.js';
import {Theme} from '../App.jsx';

const ModalViewComponent = (props) => {
  let theme = useContext(Theme);

  let comparison = {};
  let comparisonArray = [];

  props.currentChar.forEach(feature => {
    comparison[feature.feature] = [feature.value];
  });


  props.relatedChar.forEach(feature => {
    if (comparison[feature.feature]) {
      comparison[feature.feature].push(feature.value);
    } else {
      comparison[feature.feature] = [undefined, feature.value];
    }
  });

  const ifTrueOrNull = (data) => {
    if (data === 'true') {
      return 'v'; //styled checkmark
    } else if (!data) {
      return '';
    } else {
      return data;
    }
  };


  for (let row in comparison) {
    let currentProductValue = ifTrueOrNull(comparison[row][0]);
    let relatedProductValue = ifTrueOrNull(comparison[row][1]);
    comparisonArray.push([row, currentProductValue, relatedProductValue]);
  }


  return (
    <ModalOverlay>
      <ModalView onClick={props.handleClick} background={theme.background} >
        <TertiaryText>Comparing</TertiaryText>
        <ModalTable>
          <ModalHeader>
            <tr>
              <ModalCellLeft>{props.currentName}</ModalCellLeft>
              <td></td>
              <ModalCellRight>{props.relatedName}</ModalCellRight>
            </tr>
          </ModalHeader>
          <tbody>
            {comparisonArray.map((row, i) => { return <ComparisonRow row={row} key={i}/>; })}
          </tbody>
        </ModalTable>
      </ModalView>
    </ModalOverlay>
  );
};


const ComparisonRow = (props) => {
  return (
    <ModalRows>
      <ModalCellLeft>{props.row[1]}</ModalCellLeft>
      <ModalCellCenter>{props.row[0]}</ModalCellCenter>
      <ModalCellRight>{props.row[2]}</ModalCellRight>
    </ModalRows>
  );
};


export default ModalViewComponent;
