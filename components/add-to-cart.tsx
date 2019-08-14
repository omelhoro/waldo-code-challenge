import React, { memo } from "react";
function _AddToCart({ price, disabled, onClick: handleClick }) {
  return (
    <button
      disabled={disabled}
      className="ui icon fluid primary button"
      onClick={handleClick}
    >
      Add Pizza ({price}$) to Cart
      <i className="plus cart icon"></i>
    </button>
  );
}

export const AddToCart = memo(_AddToCart);
