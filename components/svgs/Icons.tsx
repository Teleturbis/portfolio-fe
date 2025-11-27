import React, { useState } from 'react';

type Props = {
  icon: 'gulp' | 'malt';
  size?: number;
  color?: string | { hover: string; color: string };
};

export default function Icons({
  size = 24,
  color = '#fff',
  icon = 'gulp',
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const getColor = () => {
    if (typeof color === 'string') {
      return color;
    }
    return isHovered ? color.hover : color.color;
  };

  switch (icon) {
    case 'gulp':
      return (
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Gulp size={size} color={getColor()} />
        </div>
      );
    case 'malt':
      return (
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Malt size={size} color={getColor()} />
        </div>
      );
    default:
      return null;
  }
}

type SvgProps = {
  size?: number;
  color?: string;
};

function Gulp({ size, color }: SvgProps) {
  return (
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
  );
}

function Malt({ size, color }: SvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 512 512'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M408.4 103.8C375.9 71.4 341.3 92.4 319.6 114L114.8 318.8C93.1 340.5 70.3999 373.5 104.6 407.6C138.7 441.7 171.6 419 193.3 397.3L398.1 192.5C419.8 170.9 440.8 136.2 408.4 103.8ZM212.7 95.4L256.1 138.8L300.2 94.6C303.2 91.6 306.2 88.8 309.3 86.2C304.7 62.9 291.4 41.8 256 41.8C220.6 41.8 207.3 63 202.8 86.3C206.1 89.2 209.4 92.1 212.7 95.4ZM300.2 417.5L256.1 373.4L212.7 416.7C209.4 420 206.2 423.1 202.9 425.9C207.9 449.7 221.9 471.4 256 471.4C290.2 471.4 304.3 449.5 309.2 425.7C306.2 423.1 303.2 420.5 300.2 417.5ZM194.3 200.5H110.7C80 200.5 40.7 210.2 40.7 256C40.7 290.3 62.6 304.3 86.5 309.2C89.3 306 194.3 200.5 194.3 200.5ZM425.8 202.8C423.2 205.8 317.9 311.6 317.9 311.6H400.3C431 311.6 470.3 304.3 470.3 256C470.3 220.7 449.2 207.4 425.8 202.8ZM221.7 173.1L236.6 158.2L193.3 114.8C171.6 93.1 138.7 70.4 104.5 104.6C79.5 129.6 85.1 154 98.3 173.7C102.4 173.4 221.7 173.1 221.7 173.1ZM290.4 339L275.4 354L319.6 398.1C341.3 419.8 375.9 440.8 408.3 408.4C432.5 384.2 427 358.7 413.6 338.4C409.3 338.7 290.4 339 290.4 339Z'
        fill={color}
      />
    </svg>
  );
}
