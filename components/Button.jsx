import React from 'react';

export default function Button(props) {
  const {
    className = '',
    bgColor = 'bg-accent-primary',
    text = 'Button',
    textColor = 'text-white',
    onClick = () => console.log('onclick btn event'),
  } = props;

  return (
    <button
      className={`${bgColor} w-fit px-8 py-3 rounded-xl ${textColor} outline-none ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
