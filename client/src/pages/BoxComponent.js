import React from 'react';
import box_style from './box.module.css';

const BoxComponent = ({ content, handleClick }) => {
  return (
    <div className={box_style['box']} onClick={handleClick}>
      {content || "Default content"}
    </div>
  );
};

export default BoxComponent;
