import React from 'react';

type ArrowProps = {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export const PrevArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block', // обязательно
        borderRadius: '50%',
        padding: 10,
        position: 'absolute',
        top: '50%',
        left: 15,
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        zIndex: 1,
      }}
      onClick={onClick}
      aria-label="Previous slide"
    >
    </div>
  );
};