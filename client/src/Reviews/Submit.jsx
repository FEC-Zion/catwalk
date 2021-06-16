import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Styles from './Styles.js';

const Submit = ({ reviewInfo, ratings, closeReview }) => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);

  const submitReview = () => {
    axios.post('/reviews', reviewInfo)
      .then(res => {
        console.log('submitted', res);
      })
      .catch(err => {
        console.log('error: ', err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrorMessage = ['You must enter the following:'];

    const checkErrors = () => {
      let hasError = false;

      if (!reviewInfo.rating) {
        newErrorMessage.push('Overall rating');
        hasError = true;
      }

      for (let char in reviewInfo.characteristics) {
        if (!reviewInfo.characteristics[char]) {
          hasError = true;
          for (let key in ratings) {
            if (ratings[key].id === Number(char)) {
              newErrorMessage.push(`${key} rating`);
            }
          }
        }
      }

      if (reviewInfo.body.length < 50) {
        newErrorMessage.push('Review must be at least 50 characters');
        hasError = true;
      }

      if (!reviewInfo.name) {
        newErrorMessage.push('Nickname');
        hasError = true;
      }

      if (!reviewInfo.email) {
        newErrorMessage.push('Email');
        hasError = true;
      }

      return hasError;

    };

    if (checkErrors()) {
      setHasError(true);
      setErrorMessage(newErrorMessage);
      return;
    } else {
      submitReview();
      closeReview();
    }

  };

  const closeError = () => {
    setHasError(false);
    setErrorMessage([]);
  };

  return (
    <>
      <Styles.button onClick={handleSubmit}>Submit review</Styles.button>

      {hasError ? (
        <>
          <Styles.errOverlay></Styles.errOverlay>
          <Styles.errorModal>
            {errorMessage.map((error, i) => {
              return i === 0 ? (
                <Styles.textMain>{error}</Styles.textMain>
              ) : (
                <Styles.textSmall>{error}</Styles.textSmall>
              );
            })}
            <Styles.button onClick={closeError}>Will do!</Styles.button>
          </Styles.errorModal>

        </>
      ) : null
      }
    </>
  );
};

export default Submit;
