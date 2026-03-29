import React, { useState } from 'react';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { id, name, image, description, price } = product;

  const toggleWishlist = (e) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <article className="product-card">
      <figure className="product-image-wrapper">
        <img
          src={image || 'https://picsum.photos/seed/placeholder/400/300.jpg'}
          alt={name}
          className="product-image"
          loading="lazy"
        />
        <button 
          className="wishlist-btn"
          onClick={toggleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={isWishlisted}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={isWishlisted ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            className={isWishlisted ? 'wishlist-filled' : 'wishlist-empty'}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </figure>
      
      <div className="product-details">
        <h2 className="product-title">{name}</h2>
        <p className="product-desc">{description}</p>
        <p className="product-price">
          ${price ? price.toFixed(2) : 'Price unavailable'}
        </p>
      </div>
    </article>
  );
};

export default ProductCard;
