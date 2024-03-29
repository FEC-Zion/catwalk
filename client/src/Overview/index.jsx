import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Gallery from './Gallery.jsx';
import ProductDescription from './ProductDescription.jsx';
import ProductInfo from './ProductInfo.jsx';
import CartManagement from './CartManagement.jsx';
import StyleSelector from './StyleSelector.jsx';
import * as Styles from './styledComponents.js';
import ShareButtons from './ShareButtons.jsx';
import { Theme } from '../App.jsx';

const Overview = ({ product, styles, defaultStyle, totalReviews, averageRating }) => {

  const theme = useContext(Theme);

  const [currentStyle, setCurrentStyle] = useState(defaultStyle);
  const [extendedView, setExtendedView] = useState(false);

  useEffect(() => {
    setCurrentStyle(defaultStyle);
  }, [product.name]);

  useEffect(() => {
    if (styles[currentStyle] === undefined) {
      setCurrentStyle(styles.length - 1);
    }
  }, [currentStyle]);

  const getClickedElement = (event) => {
    const module = 'Overview';
    axios.post('/interactions', {element: event.target.localName, widget: module, time: new Date() })
      .then((response) => {
        console.log('interaction logged');
      });
  };

  return (
    <Styles.Overview onClick={getClickedElement} id="overview" className="module">
      <Gallery styleImages={styles[currentStyle].photos} productID={product.id} extendedView={extendedView} setExtendedView={setExtendedView}/>
      {!extendedView && <Styles.Sidebar>
        <ProductInfo product={product} style={styles[currentStyle]} rating={averageRating} reviewCount={totalReviews}/>
        <Styles.Border></Styles.Border>
        <StyleSelector styles={styles} setCurrentStyle={setCurrentStyle} currentStyle={currentStyle}/>
        <Styles.Border></Styles.Border>
        <CartManagement styleInventory={styles[currentStyle].skus}/>
        <Styles.Border></Styles.Border>
        <ProductDescription slogan={product.slogan} description={product.description} features={product.features}/>
        <Styles.Border></Styles.Border>
        <ShareButtons />
      </Styles.Sidebar>}
      <Styles.Border></Styles.Border>
    </Styles.Overview>
  );

};

export default Overview;
