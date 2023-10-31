import React from 'react';

export default function ManagerSelect() {
  return (
    <>
      <label htmlFor="manage-select">아이템</label>
      <select name="manage-select" className="manager-input" id="manager-input">
        <option name="manage-select">선택</option>
      </select>
    </>
  );
}
