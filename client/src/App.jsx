import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Overview from './Overview';
import Related from './Related';
import QandAs from './Q&As';
import Reviews from './Reviews';
import * as Styles from './Shared/styledComponents.js';
import {Toggle} from './Shared/ThemeToggle.jsx';


export const themes = {
  dark: {
    header1: '#eeeee4',
    thumbnailBorder: '#CEF1D5',
    color: '#CEF1D5',
    font: '#eeeee4',
    background: '#6B636B',
    shadow: 'rgb(211 217 217 / 22%) 2px 2px 4px',
    hoverColor: 'white',
    buttonBorder: 'none'
  },
  light: {
    header1: 'black',
    thumbnailBorder: 'black',
    color: '#3A5A40',
    font: 'gray',
    background: 'white',
    shadow: 'rgb(0 0 0 / 22%) 2px 2px 4px',
    hoverColor: '#6B636B',
    buttonBorder: '1px solid #D3D9D9'
  }
};

export const Theme = React.createContext(themes.light);

const App = () => {

  const [product, setProduct] = useState({});
  const [reviewMetaData, setReviewMetaData] = useState({});
  const [averageRating, setAverageRating] = useState(5);
  const [styles, setStyles] = useState([]);
  const [totalReviewCount, setTotalReviewCount] = useState(0);
  const [defaultStyle, setDefaultStyle] = useState(0);
  const [currentTheme, setCurrentTheme] = useState(themes.light);

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
    second === 0 ? (
      setAverageRating(0)
    ) : (
      setAverageRating(average.toFixed(1))
    );
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

  useEffect(() => {
    let body = document.body;
    body.style.backgroundColor = currentTheme.background;
    body.style.color = currentTheme.color;
  }, [currentTheme]);

  return !product.id || !styles.length || !reviewMetaData.product_id ? <div>Loading Epic Shopping Xperience...</div> : (
    <div>
      <Theme.Provider value={currentTheme}>
        <Styles.Title>Not Gucci</Styles.Title>
        <Toggle setCurrentTheme={setCurrentTheme}/>
        <Overview product={product} styles={styles} defaultStyle={defaultStyle} totalReviews={totalReviewCount} averageRating={averageRating}/>
        <Related product={product} setProduct={setProduct} defaultStyle={styles[defaultStyle]} currentChar={product.features} rating={averageRating}/>
        <QandAs product={product} setDateFormat={setDateFormat}/>
        <Reviews product={product} meta={reviewMetaData} averageRating={averageRating} totalReviews={totalReviewCount} setDateFormat={setDateFormat}/>
      </Theme.Provider>
    </div>
  );
};

export default App;
