import { animate, utils } from 'animejs';
import { useEffect, useRef } from 'react';
import './header.css';

export default function Header() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const squareEl = containerRef.current.querySelector('.square');

    let boundsValue = containerRef.current.getBoundingClientRect();

    const refreshBounds = () => {
      boundsValue = containerRef.current.getBoundingClientRect();
    };

    const onMouseMove = e => {
      const { width, height, left, top } = boundsValue;
      const hw = width / 2;
      const hh = height / 2;
      const x = utils.clamp(e.clientX - left - hw, -hw, hw);
      const y = utils.clamp(e.clientY - top - hh, -hh, hh);
      animate(squareEl, { x: x, y: y, duration: 500, ease: 'out(3)' });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', refreshBounds);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', refreshBounds);
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="large centered row">
        <div className="col">
          <div className="square"></div>
        </div>
      </div>
      <div className="small centered row">
        <span className="label">Move cursor around</span>
      </div>
    </>
  );
}
