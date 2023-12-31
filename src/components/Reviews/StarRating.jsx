import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";

const StarRating = ({ count, rating, color, onRating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const getColor = (index) => {
    if (hoverRating >= index) {
      return color.filled;
    } else if (!hoverRating && rating >= index) {
      return color.filled;
    }

    return color.unfilled;
  };

  const starRating = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <span
          key={idx}
          className="star"
          onClick={() => onRating(idx)}
          style={{ color: getColor(idx) }}
          onMouseEnter={() => setHoverRating(idx)}
          onMouseLeave={() => setHoverRating(0)}
        >
          &#9733;
        </span>
      ));
  }, [count, rating, hoverRating]);

  return <div>{starRating}</div>;
};

StarRating.propTypes = {
  count: PropTypes.number,
  rating: PropTypes.number,
  onChange: PropTypes.func,
  color: {
    filled: PropTypes.string,
    unfilled: PropTypes.string,
  },
};

StarRating.defaultProps = {
  count: 5,
  rating: 0,
  color: {
    filled: "#ffcc00",
    unfilled: "#ccc",
  },
};

export default StarRating;
