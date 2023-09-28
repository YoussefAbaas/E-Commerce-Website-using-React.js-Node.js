import React from "react";

const ProductCard = ({
  category,
  name,
  company,
  price,
  _id,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="product-card">
      <h2>{name}</h2>
      <p>
        <strong>Category:</strong> {category}
      </p>
      <p>
        <strong>Company:</strong> {company}
      </p>
      <p>
        <strong>Price:</strong> ${price}
      </p>
      <div className="buttons">
        <button onClick={() => onUpdate(_id)}>Update</button>
        <button onClick={() => onDelete(_id)}>Delete</button>
      </div>
    </div>
  );
};

export default ProductCard;
