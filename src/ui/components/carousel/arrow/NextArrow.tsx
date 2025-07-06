// arrow/NextArrow.tsx
import React from 'react';

type ArrowProps = {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export const NextArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block', // обязательно
        background: 'rgba(0,0,0,0.5)',
        borderRadius: '50%',
        padding: 10,
        position: 'absolute',
        top: '50%',
        right: 15,
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        zIndex: 1,
      }}
      onClick={onClick}
      aria-label="Next slide"
    >

    </div>
  );
};
