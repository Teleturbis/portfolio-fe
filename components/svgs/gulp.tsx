import React from 'react';

type Props = {
  size?: number;
  color?: string;
};

export default function Gulp({ size = 24, color = '#fff' }: Props) {
  return (
    <div>
      <svg
        width={size}
        height={size}
        viewBox='0 0 97 46'
        fill={color}
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M35.8 17.9C35.8 13.7 32.4 10.2 28.1 10.2H0V0H25.7C27.1 0 28.4 0.6 29.3 1.5L44.5 16.6C45.4 17.5 46 18.8 46 20.2V45.9H35.8V17.8V17.9ZM61.2 17.9C61.2 13.7 64.6 10.2 68.9 10.2H97V0H71.3C69.9 0 68.6 0.6 67.7 1.5L52.5 16.6C51.6 17.5 51 18.8 51 20.2V45.9H61.2V17.8V17.9Z'
          fill={color}
        />
      </svg>
    </div>
  );
}
