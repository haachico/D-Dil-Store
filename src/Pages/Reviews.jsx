import { useEffect, useState } from "react";

import { ReviewsData } from "../ReviewsData";

const Reviews = () => {
  const [reviewsData, setReviewsData] = useState([]);

  useEffect(() => {
    const results = ReviewsData;
    setReviewsData(results);
  }, []);

  return (
    <div className="review--page">
      <h2>Some Reviews from our esteemed customers!</h2>
      {reviewsData.map((e) => (
        <div className="review--card">
          <q>{e.review}</q>
          <p style={{ fontSize: "12px" }}>
            <strong>---{e.user}</strong>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
