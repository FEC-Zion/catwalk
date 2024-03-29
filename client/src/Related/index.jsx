import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import RelatedList from './RelatedList.jsx';
import OutfitList from './OutfitList.jsx';
import {Toggle} from '../Shared/ThemeToggle.jsx';
import {Theme} from '../App.jsx';




const Related = (props) => {

  const theme = useContext(Theme);

  const getClickedElement = (event) => {
    const module = 'Related Items and Comparison';
    axios.post('/interactions', {element: event.target.localName, widget: module, time: new Date() })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div id="related" className="module">
      <RelatedList product={props.product} setCurrentProduct={props.setProduct} currentStyle={props.defaultStyle} currentChar={props.currentChar}/>
      <OutfitList product={props.product} style={props.defaultStyle} rating={props.rating} setCurrentProduct={props.setProduct}/>
    </div>
  );
};

export default Related;
