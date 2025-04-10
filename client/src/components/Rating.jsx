import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ rating, reviews }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-yellow-500 w-4 h-4" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-500 w-4 h-4" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-gray-400 w-4 h-4" />);
    }
  }

  return (
    <div className="flex items-center space-x-1 text-sm mt-2 ml-2.5">
      <div className="flex">{stars}</div>
      <span className="text-gray-600">({reviews})</span>
    </div>
  );
};

export default Rating;
