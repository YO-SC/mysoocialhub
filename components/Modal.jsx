import React from 'react';

export default function Modal(props) {
  const { isOpen = false, className, children } = props;

  return (
    <div
      className={`${
        !isOpen && 'hidden'
      } absolute top-0 bottom-0 left-0 right-0 z-50 overflow-auto drop-shadow-2xl flex items-center justify-center ${className}`}
    >
      {/* dialog */}
      <div className="p-8 bg-white rounded-xl w-full max-w-md flex-col flex gap-5">
        {children}
      </div>
    </div>
  );
}
