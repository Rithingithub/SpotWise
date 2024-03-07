// import React , {useState} from 'react';
// import box_style from './box.module.css';

// const BoxComponent = ({ content, handleClick }) => {
//   // return (
//   //   <div className={box_style['box']} onClick={handleClick}>
//   //     {content || "Default content"}
//   //   </div>
//   const [color, setColor] = useState('Green');

//   const handleClickWrapper = () => {
//     setColor('red');
//     handleClick();
//   };

//   return (
//     <div
//       className={box_style['box']}
//       style={{ backgroundColor: color }}
//       onClick={handleClickWrapper}
//     >
//       {content}
//     </div>
//   );
// };

// export default BoxComponent;







// import React from 'react';
// import box_style from './box.module.css';

// const BoxComponent = ({ content, color, handleClick }) => (
//   <div
//     className={box_style['box']}
//     style={{ backgroundColor: color }}
//     onClick={handleClick}
//   >
//     {content}
//   </div>
// );

// export default BoxComponent;


import React, { useState } from 'react';
import box_style from './box.module.css';

const BoxComponent = ({ content, socket }) => {
  const [color, setColor] = useState('Green');

  const handleClick = () => {
    // Update the color immediately when the box is clicked
    setColor('red');
    // Emit a slotChange event to the server
    socket.emit('slotChange', { slot: content, color: 'red' });
  };

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

