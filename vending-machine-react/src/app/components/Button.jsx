import React from 'react';

export default function button(eventHandler,btnName) {
  return (
    <button onClick={eventHandler}>{btnName}</button>
  );
}
