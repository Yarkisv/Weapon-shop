import React from "react";

export default function AboutProductContainer({ product }) {
  return (
    <div className="product-info-container">
      <img src={`data:image/jpg;base64,${product.image}`} alt="" />
    </div>
  );
}
