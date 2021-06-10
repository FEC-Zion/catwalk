import React from 'react';
import * as Styles from './styledComponents.js';

const StyleSelector = ({ styles, setCurrentStyle, currentStyle }) => {

  return (
    <Styles.StyleSelector>
      <div className="styleTitle">{'Style Name > '}{currentStyle.name}</div>
      {styles.map((style, index) => {
        return <img className="style" src={style.photos[0].thumbnail_url} alt={style.name + 'Style'} key={index} onClick={() => setCurrentStyle(index)}/>;
      })}
    </Styles.StyleSelector>
  );

};

export default StyleSelector;
