import React from 'react';
import Thumbnails from './Thumbnails.jsx';
import * as Styles from './styledComponents.js';

const Gallery = ({ images }) => {

  return (
    <Styles.Gallery>
      <img src={images.photos[0].thumbnail_url} alt="An image of the currently selected style"/>
      <Thumbnails />
    </Styles.Gallery>
  );

};

export default Gallery;
