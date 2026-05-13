import { useEffect, useRef, useState } from 'react';

import { GalleryType } from '@/types';

import Pagination from './Pagination';

const Carousel = () => {
  const parsedImages: GalleryType[] = Array.from({ length: 19 }).map((_, index) => ({
    id: index + 1,

    src: `/images/react_wedding_invitation_${index}.jpg`,

    alt: String(index + 1),
  }));

  const extendedImages: GalleryType[] = parsedImages.length
    ? [parsedImages[parsedImages.length - 1], ...parsedImages, parsedImages[0]]
    : [];

  const [currentIndex, setCurrentIndex] = useState(1);

  const [dragStartX, setDragStartX] = useState<number | null>(null);

  const [dragStartY, setDragStartY] = useState<number | null>(null);

  const [dragging, setDragging] = useState(false);

  const [isVerticalScroll, setIsVerticalScroll] = useState(false);

  const [translateX, setTranslateX] = useState(0);

  // 화면에 캐러셀이 보이는지 여부를 추적하는 상태

  const [isVisible, setIsVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // 전체 캐러셀 영역을 관찰하기 위한 ref

  const carouselWrapperRef = useRef<HTMLDivElement>(null);

  // 🌟 새롭게 추가된 부분: 화면에 캐러셀이 보이는지 감지

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        // 화면에 요소가 교차되면(보이면) true, 안 보이면 false

        setIsVisible(entry.isIntersecting);
      },

      {
        threshold: 0.3, // 캐러셀이 화면에 30% 이상 보일 때 작동 시작
      }
    );

    if (carouselWrapperRef.current) {
      observer.observe(carouselWrapperRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // 기존 자동 넘김 로직

  useEffect(() => {
    if (!parsedImages.length) return;

    if (dragging) return;

    // 🌟 추가된 부분: 화면에 보이지 않으면 interval을 설정하지 않고 종료

    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);

    // 의존성 배열에 isVisible 추가
  }, [dragging, parsedImages.length, isVisible]);

  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setCurrentIndex(parsedImages.length);

      if (containerRef.current) {
        containerRef.current.style.transition = 'none';

        containerRef.current.style.transform = `translateX(-${parsedImages.length * 100}%)`;

        containerRef.current.getBoundingClientRect();

        containerRef.current.style.transition = 'transform 300ms ease-out';
      }
    }

    if (currentIndex === parsedImages.length + 1) {
      setCurrentIndex(1);

      if (containerRef.current) {
        containerRef.current.style.transition = 'none';

        containerRef.current.style.transform = 'translateX(-100%)';

        containerRef.current.getBoundingClientRect();

        containerRef.current.style.transition = 'transform 300ms ease-out';
      }
    }
  };

  const handleDragStart = (clientX: number, clientY: number) => {
    setDragStartX(clientX);

    setDragStartY(clientY);

    setDragging(true);

    setIsVerticalScroll(false);
  };

  const handleDragMove = (
    clientX: number,

    clientY: number,

    e?: React.MouseEvent | React.TouchEvent
  ) => {
    if (!dragging || dragStartX === null || dragStartY === null) return;

    const deltaX = clientX - dragStartX;

    const deltaY = clientY - dragStartY;

    if (!isVerticalScroll) {
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        setIsVerticalScroll(true);

        return;
      }

      setIsVerticalScroll(false);

      if (e && e.cancelable) {
        e.preventDefault();
      }
    }

    setTranslateX(deltaX);
  };

  const handleDragEnd = () => {
    if (!dragging) return;

    if (!isVerticalScroll) {
      if (translateX < -50) {
        setCurrentIndex((prev) => prev + 1);
      } else if (translateX > 50) {
        setCurrentIndex((prev) => prev - 1);
      }
    }

    setTranslateX(0);

    setDragging(false);

    setDragStartX(null);

    setDragStartY(null);
  };

  return (
    <div
      ref={carouselWrapperRef} // 🌟 여기에 ref 추가 (감지 대상)
      className='relative w-full overflow-hidden bg-background'
    >
      <div
        ref={containerRef}
        className='flex transition-transform duration-300 ease-out touch-pan-y'
        style={{
          transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
        }}
        onTransitionEnd={handleTransitionEnd}
        onMouseDown={(e) => {
          e.preventDefault();

          handleDragStart(e.clientX, e.clientY);
        }}
        onMouseMove={(e) => {
          if (dragging) {
            handleDragMove(e.clientX, e.clientY, e);
          }
        }}
        onMouseUp={(e) => {
          e.preventDefault();

          handleDragEnd();
        }}
        onMouseLeave={(e) => {
          if (dragging) {
            e.preventDefault();

            handleDragEnd();
          }
        }}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY, e)}
        onTouchEnd={handleDragEnd}
      >
        {extendedImages.map((item, index) => (
          <div className='flex-shrink-0 w-full' key={`${item.id}-${index}`}>
            <div className='flex items-center justify-center w-full min-h-[560px] bg-[#f8f4ef]'>
              <img
                loading={index === currentIndex ? 'eager' : 'lazy'}
                className='w-full max-h-[760px] object-contain'
                src={item.src}
                alt={item.alt}
              />
            </div>
          </div>
        ))}
      </div>

      <Pagination currentIndex={currentIndex} onPageChange={setCurrentIndex} />
    </div>
  );
};

export default Carousel;
