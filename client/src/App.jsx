import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Overview from './Overview';
import Related from './Related';
import QandAs from './Q&As';
import Reviews from './Reviews';


const App = () => {

  const [product, setProduct] = useState({});
  const [reviewMetaData, setReviewMetaData] = useState({});
  const [averageRating, setAverageRating] = useState(5);
  const [styles, setStyles] = useState([]);
  const [totalReviewCount, setTotalReviewCount] = useState(0);
  const [defaultStyle, setDefaultStyle] = useState(0);

  const getProductStyles = () => {
    axios.get(`/products/${product.id}/styles`)
      .then((response) => {
        let productStyles = response.data.results;
        setStyles(productStyles);
        for (let i = 0; i < productStyles; i++) {
          if (productStyles[i]['default?'] === true) {
            setDefaultStyle(i);
            break;
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProductRatings = () => {
    axios.get(`/reviews/meta?product_id=${product.id}`)
      .then((response) => {
        let ratings = response.data.ratings;
        calculateReviewAverage(ratings);
        setReviewMetaData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const calculateReviewAverage = (ratings) => {
    let first = 0;
    let second = 0;
    for (let reviews in ratings) {
      first += (Number(reviews) * Number(ratings[reviews]));
      second += Number(ratings[reviews]);
    }
    setTotalReviewCount(second);
    let average = first / second;
    setAverageRating(average.toFixed(1));
  };

  const setDateFormat = (array) => {
    array.forEach((item) => {
      item.formattedDate = new Date(item.date).toLocaleDateString({}, {month: 'long', day: '2-digit', year: 'numeric'});
    });
  };

  useEffect(() => {
    axios.get('/products/19089')
      .then((response) => {
        setProduct(response.data);
      });
  }, []);

  useEffect(() => {
    if (product.id) {
      getProductRatings();
      getProductStyles();
    }
  }, [product.id]);

  return !product.id || !styles.length || !reviewMetaData.product_id ? <div>Loading Epic Shopping Xperience...</div> : (
    <div>
      Super Fun Shopping Experience
      <Overview product={product} styles={styles} defaultStyle={defaultStyle} totalReviews={totalReviewCount} averageRating={averageRating}/>
      <Related product={product} setProduct={setProduct} defaultStyle={styles[defaultStyle]} currentChar={reviewMetaData.characteristics}/>
      <QandAs product={product}/>
      {/* <Reviews product={product} meta={reviewMetaData} averageRating={averageRating} totalReviews={totalReviewCount}/> */}
    </div>
  );
};

export default App;
