import React from 'react';

export default function Input(props) {
  const {
    className = '',
    color = 'primary',
    bgColor = `bg-${color}`,
    textColor = 'text-black',
    outline = `outline-accent-${color}`,
    border = `border-accent-${color} border-2`,
    type = 'text',
    placeholder = 'input',
    name = type,
    id = type,
    onChange = () => console.log('changing input'),
    value = undefined,
  } = props;

  return (
    <input
      className={`${bgColor} px-4 py-3 rounded-xl ${textColor} font-semibold ${outline} ${border} ${className}`}
      type={type}
      placeholder={placeholder}
      name={name}
      id={id}
      onChange={onChange}
      value={value && value}
    />
  );
}
