import React from 'react';

export default function Button(props) {
  const {
    className = '',
    color = 'primary',
    bgColor = `bg-accent-${color}`,
    text = 'Button',
    textColor = 'text-white',
    onClick = () => console.log('onclick btn event'),
    icon = null,
  } = props;

  return (
    <button
      className={`${bgColor} w-fit px-8 py-3 rounded-xl ${textColor} outline-none ${className} ${
        icon && 'flex gap-3 items-center'
      }`}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
}
