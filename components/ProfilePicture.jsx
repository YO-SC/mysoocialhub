import React from 'react';
import Image from 'next/dist/client/image';

export default function ProfilePicture(props) {
  //   TODO setup a default image src if no picture is provided or not loaded. must be local
  const {
    // className = 'rounded-full object-cover',
    className,
    src = '',
    alt = 'user profile picture',
    width = '100%',
    height = '100%',
    layout = 'intrinsic',
  } = props;

  return (
    <Image
      className={`rounded-full object-cover ${className}`}
      src={src}
      alt={alt}
      width={width}
      height={height}
      layout={layout}
    />
  );
}
