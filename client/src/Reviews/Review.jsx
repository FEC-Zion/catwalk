import React, { useState, useEffect } from 'react';
import Helpful from '../Shared/Helpful.jsx';

const Review = ({ review }) => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  // display first 250 characters of review body
  // refactor have only one div tag
  const checkReviewLength = () => {
    if (review.body.length <= 250) {
      return (
        <div className="review-body">{review.body}</div>
      );
    } else if (!showMore) {
      return (
        <div className="review-body">
          {review.body.slice(0, 250)}...
          <br></br>
          <a onClick={handleShowMore}>Show more</a>
        </div>
      );
    } else {
      return (
        <div className="review-body">
          {review.body}
          <br></br>
          <a onClick={handleShowMore}>Show less</a>
        </div>
      );
    }
  };

  // checks for review images
  // need to set conditional to check for bad urls
  const checkForImages = () => {
    // for (let photos in reviews) {
    //   if (photos.length) {

    //   }
    // }

    return (
      review.photos.length
        ? <div className="review-images">
          {review.photos.map((photo, index) => {
            return <img key={index} src={photo.url} alt={`${review.reviewer_name} photo ${index}`} style={thumbnail}></img>;
          })}
        </div>
        : null
    );
  };

  // just to help visualize for now
  const style = {
    border: '1px solid black'
  };
  const thumbnail = {
    border: '1px solid black',
    padding: '5px',
    width: '100px'
  };

  return (
    <div style={style} className="review-tile">

      <div>
        <span className="stars">stars go here</span>
        {/* don't think it's possible to reference sales with the API */}
        <span>verified purchase goes here</span>
        <span>{review.reviewer_name}, {review.date}</span>
        <div className="review-summary">{review.summary}</div>
        <div>
          {checkReviewLength()}
          {checkForImages()}
        </div>
        <div>
          {review.recommend ? 'I recommend this product' : null}
        </div>
        <Helpful origin='reviews' id={review.review_id} helpCount={review.helpfulness} />
      </div>
      <div className="review-response">

        {review.response ? <span>Response: {review.response}</span> : null}
      </div>

      <div>
        Helpful?
      </div>

    </div>
  );
};

export default Review;
