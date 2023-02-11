import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import styles from '../styles/tree.module.css';
import SVGContainer, { Circle, Line } from '@/components/Lines/Line';

/* -------------------------------- App Tree -------------------------------- */

export default function Tree() {
  const [direction, setDirection] = useState(false);
  const [space, setSpace] = useState('0');
  const circle1Ref = useRef<HTMLDivElement | null>(null);
  const circle2Ref = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [lineCoordinates, setLineCoordinates] = useState({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  });
  useEffect(() => {
    const circle1 = circle1Ref.current;
    const circle2 = circle2Ref.current;
    const container = containerRef.current;

    if (circle1 && circle2 && container) {
      const rect1 = circle1.getBoundingClientRect();
      const rect2 = circle2.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const x1 = direction
        ? rect1.left + rect1.width / 2 - containerRect.left
        : rect1.right - containerRect.left + parseInt(space);
      const y1 = direction
        ? rect1.bottom - containerRect.top + parseInt(space)
        : rect1.top + rect1.height / 2 - containerRect.top;
      const x2 = direction
        ? rect2.left + rect2.width / 2 - containerRect.left
        : rect2.left - containerRect.left - parseInt(space);
      const y2 = direction
        ? rect2.top - containerRect.top - parseInt(space)
        : rect2.top + rect2.height / 2 - containerRect.top;

      setLineCoordinates({ x1, y1, x2, y2 });
    }
  }, [circle1Ref, circle2Ref, containerRef, space, direction]);

  const column = direction ? 'column' : 'row';
  const row = direction ? 'row' : 'column';
  return (
    <div
      style={{
        width: '100vw',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '100px',
        gap: '20px',
        flexDirection: 'column',
        backgroundColor: '#444',
        color: '#eee',
      }}
    >
      <h1>Line Connect</h1>
      <div className={styles.div}>
        <h3 style={{ alignSelf: 'flex-start', color: '#666' }}>Actions</h3>
        <div>
          <label
            style={{
              color: '#666',
              alignSelf: 'flex-start',
              fontSize: '16px',
              padding: '20px',
            }}
          >
            Direction &nbsp;
            <button
              style={{
                padding: '6px',
                backgroundColor: '#666',
                borderRadius: '4px',
              }}
              onClick={() => setDirection(!direction)}
            >
              {direction ? 'Vertical' : 'Horizontal'}
            </button>
          </label>
          <label
            style={{
              color: '#666',
              alignSelf: 'flex-start',
              fontSize: '16px',
              padding: '20px',
            }}
          >
            Space &nbsp;
            <input
              type="number"
              style={{
                padding: '6px',
                backgroundColor: '#666',
                width: '80px',
                borderRadius: '4px',
              }}
              value={space}
              onChange={(event) => setSpace(event.target.value)}
            ></input>
          </label>
        </div>
      </div>
      <div className={styles.div}>
        <h3 style={{ alignSelf: 'flex-start', color: '#666' }}>
          0° Line Component
        </h3>
        <div
          ref={containerRef}
          style={{
            display: 'flex',
            flexDirection: `${column}`,
            // outline: 'auto',
            position: 'relative',
            gap: '100px',
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Circle color="blue" ref={circle1Ref} />
          </div>
          {/* <SVGContainer> */}
          <Line
            {...lineCoordinates}
            width={'100%'}
            height={'100%'}
            color="#888"
            strokeWidth={4}
          />
          {/* </SVGContainer> */}
          <div
            style={{
              display: 'flex',
              flexDirection: `${row}`,
              gap: '20px',
              // position: 'relative',
              // zIndex: 100,
              // outline: 'auto',
            }}
          >
            <Circle color="green" ref={circle2Ref} />
            <Circle color="yellow" />
            <Circle color="red" />
          </div>
        </div>
      </div>
    </div>
  );
}
