import React, { memo } from "react";

function _TotalValue({ sum }) {
  return <div className="center-text total-value">Total Value: {sum}$</div>;
}

export const TotalValue = memo(_TotalValue);
