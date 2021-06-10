import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Gallery from './Gallery.jsx';
import ProductDescription from './Description.jsx';
import ProductInfo from './ProductInfo.jsx';
import CartManagement from './CartManagement.jsx';
import StyleSelector from './StyleSelector.jsx';
import * as Styles from './styledComponents.js';

const Overview = ({ product, styles, defaultStyle, totalReviews, averageRating }) => {

  const [currentStyle, setCurrentStyle] = useState(defaultStyle);

  return (
    <Styles.Overview>
      <Gallery images={styles[currentStyle]}/>
      <ProductInfo product={product} style={styles[currentStyle]} rating={averageRating} reviewCount={totalReviews}/>
      <StyleSelector styles={styles} setCurrentStyle={setCurrentStyle} currentStyle={styles[currentStyle]}/>
      <CartManagement styleInventory={styles[currentStyle].skus}/>
      <ProductDescription slogan={product.slogan} description={product.description} features={product.features}/>
    </Styles.Overview>
  );

};

export default Overview;
