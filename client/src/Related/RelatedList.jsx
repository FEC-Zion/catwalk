import React, {useEffect, useState} from 'react';
import Card from './CardComponent.jsx';

import axios from 'axios';
import styled from 'styled-components';



const RelatedList = (props) => {
  const [isLoading, setIsLoading] = useState([true]);
  const [productIds, setUpdateIds] = useState([]);
  const [relatedObjects, setUpdateObjects] = useState([]);
  const [relatedStyles, setRelatedStyles] = useState([]);
  const [relatedMetaData, setRelatedMetaData] = useState([]);

  useEffect(() => {
    if (props.product.id) {
      axios.get(`/products/${props.product.id}/related`)
        .then((relatedIds) => {
          let uniqueIds = [...new Set(relatedIds.data)];
          return setUpdateIds(uniqueIds);
        });

    }
  }, [props.product.id]);

  useEffect(() => {
    if (productIds) {


      Promise.all(
        productIds.map((id) => {
          return axios.get(`/products/${id}`)
            .then((response) => {
              return response.data;
            });
        })
      )
        .then((objects) => {
          setUpdateObjects(objects);
        });



      Promise.all(
        productIds.map((id) => {
          return axios.get(`/products/${id}/styles`)
            .then((response) => {
              return response.data;
            });
        })
      )
        .then((objectsStyles) => {
          let defaultStyles = [];
          objectsStyles.forEach((object) => {
            let productId = object.product_id;
            let thereIsNoDefault = true;
            object.results.forEach(style => {
              if (style['default?']) {
                defaultStyles.push(style);
                thereIsNoDefault = false;
              }
            });
            if (thereIsNoDefault) {
              defaultStyles.push(object.results[0]);
            }
          });

          setRelatedStyles(defaultStyles);
        });



      Promise.all(
        productIds.map((id) => {
          return axios.get('/reviews/meta', {params: { product_id: id }})
            .then((response) => {
              return response.data;
            });
        })
      )
        .then((objects) => {
          setRelatedMetaData(objects);
        });


    }
  }, [productIds]);




  return (
    <div>
      {relatedObjects.map((object, i) => { return <Card product={object} style={relatedStyles[i]} metaData={relatedMetaData[i]} key={object.id} setCurrentProduct={props.setCurrentProduct} currentName={props.product.name} currentChar={props.currentChar}/>; })}
    </div>
  );

};




export default RelatedList;
