import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const CarouselWrap = styled.div`
  width: 100vw;
  max-width: 100vw;
  overflow: hidden;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;
const CarouselInner = styled.div`
  display: flex;
  will-change: transform;
`;

/**
 * @param {React.ReactNode[]} children - массив карточек
 * @param {number} speed - px/sec
 * @param {number} gap - px между карточками
 */
const InfiniteCarousel = ({ children, speed = 40, gap = 20, style }) => {
  const wrapRef = useRef();
  const innerRef = useRef();
  const [contentWidth, setContentWidth] = useState(0);
  const [offset, setOffset] = useState(0);

  // Дублируем карточки для seamless loop
  const items = React.Children.toArray(children);
  const doubled = [...items, ...items];

  useEffect(() => {
    if (!innerRef.current) return;
    // Ширина только оригинального массива
    const firstHalf = Array.from(innerRef.current.children).slice(0, items.length);
    const width = firstHalf.reduce((acc, el) => acc + el.offsetWidth + gap, 0);
    setContentWidth(width);
  }, [children, gap]);

  useEffect(() => {
    let raf;
    let last = performance.now();
    let isVisible = true;
    
    // Проверяем видимость элемента для оптимизации
    const checkVisibility = () => {
      if (wrapRef.current) {
        const rect = wrapRef.current.getBoundingClientRect();
        isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      }
    };
    
    function animate(now) {
      checkVisibility();
      
      if (isVisible) {
        const dt = (now - last) / 1000;
        last = now;
        setOffset(prev => {
          let next = prev + speed * dt;
          if (contentWidth && next >= contentWidth) next -= contentWidth;
          return next;
        });
      } else {
        last = now; // Синхронизируем время даже когда не анимируем
      }
      
      raf = requestAnimationFrame(animate);
    }
    
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [contentWidth, speed]);

  return (
    <CarouselWrap ref={wrapRef} style={style}>
      <CarouselInner
        ref={innerRef}
        style={{
          gap,
          transform: `translateX(-${offset}px)`
        }}
      >
        {doubled.map((child, i) => (
          <div key={i} style={{ flexShrink: 0 }}>{child}</div>
        ))}
      </CarouselInner>
    </CarouselWrap>
  );
};

export default InfiniteCarousel; 