// In BoxComponent.js
import React from 'react';
import box_style from './box.module.css';

const BoxComponent = ({ content, color, handleClick }) => {
  return (
    <div
      className={box_style['box']}
      style={{ backgroundColor: color }}
      onClick={handleClick}
    >
      {content}
    </div>
  );
};

export default BoxComponent;
