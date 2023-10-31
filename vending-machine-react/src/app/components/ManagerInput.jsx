import React from 'react';

export default function ManagerInput() {
  return (
    <>
      <label htmlFor="stock-change">재고</label>
      <input
        disabled
        type="number"
        name="stock-change"
        id="stock-change"
        className="manager-input"
        min="0"
        max="20"
      />
    </>
  );
}
