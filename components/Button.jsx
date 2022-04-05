import React from 'react';

export default function Button(props) {
  const {
    bgColor = 'bg-accent-primary',
    textColor = 'text-white',
    onClick = () => console.log('onclick btn event'),
  } = props;

  return (
    <button
      className={`${bgColor} px-8 py-3 rounded-xl ${textColor} outline-none`}
      onClick={onClick}
    >
      Button
    </button>
  );
}
