import React, { forwardRef, PropsWithChildren, PropsWithRef } from 'react';

interface LineProps {
  width: number | string;
  height: number | string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  strokeWidth?: number;
}

export const Line: React.FC<LineProps> = ({
  width,
  height,
  x1,
  y1,
  x2,
  y2,
  color = 'black',
  strokeWidth = 1,
}) => {
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const circleRadius = 5;
  const circleX = x1 + circleRadius * Math.cos(angle);
  const circleY = y1 + circleRadius * Math.sin(angle);
  return (
    <svg
      width={width}
      height={height}
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      <circle cx={circleX} cy={circleY} r={circleRadius} fill={color} />
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

interface SvgContainerProps {
  width?: number | string;
  height?: number | string;
}

const SVGContainer = ({
  width = '100%',
  height = '100%',
  children,
}: PropsWithChildren<SvgContainerProps>) => {
  return (
    <div style={{ width: width, height: height }}>
      <svg style={{ width: '100%', height: '100%' }}>{children}</svg>
    </div>
  );
};

export default SVGContainer;
/**
 * <div class="circle"></div>
<div class="circle"></div>
<svg class="line"></svg>

.circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: blue;
  margin-bottom: 20px;
}

.line {
  position: absolute;
  top: 75px; //  ajusta el valor para colocar la línea en el lugar deseado 
  width: 100%;
  height: 100%;
}

line {
  stroke: red;
  stroke-width: 3px;
}


 * const svg = document.querySelector('.line');
const circle1 = document.querySelector('.circle:first-child');
const circle2 = document.querySelector('.circle:last-child');

const x1 = circle1.offsetLeft + circle1.offsetWidth / 2;
const y1 = circle1.offsetTop + circle1.offsetHeight / 2;

const x2 = circle2.offsetLeft + circle2.offsetWidth / 2;
const y2 = circle2.offsetTop + circle2.offsetHeight / 2;

svg.innerHTML = `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" />`;

 */

interface CircleProps {
  color: string;
}

export const Circle = forwardRef<PropsWithRef<HTMLDivElement>, CircleProps>(
  function CircleRef({ color }: CircleProps, ref) {
    return (
      <div
        ref={ref}
        style={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          backgroundColor: color,
        }}
      />
    );
  }
);
