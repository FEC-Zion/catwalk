import React from 'react';
import * as Styles from './styledComponents.js';

const ProductInfo = ({ product, style, rating, reviewCount }) => {

  let priceDisplay, ratingDisplay;

  if (style.sale_price) {
    priceDisplay = <div id="priceDisplay"><div>{style.sale_price}</div><div>
      <del>{product.default_price}</del></div></div>;
  } else {
    priceDisplay = <div>{product.default_price}</div>;
  }

  if (reviewCount) {
    ratingDisplay = <div>{rating} <a href="#container">{`Read all ${reviewCount} reviews`}</a></div>;
  }

  return (
    <Styles.ProductInfo>
      {ratingDisplay}
      <div>{product.category}</div>
      <div>{product.name}</div>
      {priceDisplay}
    </Styles.ProductInfo>
  );

};

export default ProductInfo;
