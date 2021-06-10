import React from 'react';
import * as Styles from './styledComponents.js';

const FeaturesList = ({ features }) => (

  <Styles.Features>
    <Styles.FeaturesHeader>Product Features</Styles.FeaturesHeader>
    {features.map((feature, index) => {
      return <Styles.FeaturesItem key={index}>{feature.feature}: {feature.value}</Styles.FeaturesItem>;
    })}
  </Styles.Features>

);

export default FeaturesList;
