import { useEffect, useRef } from 'react';
import { createAnimatable, createScope } from 'animejs';

export default function About() {
  const aboutRef = useRef(null);

  useEffect(() => {
    if (!aboutRef.current) return;

    const scope = createScope({ root: aboutRef.current });

    scope.execute(() => {
      const animatable = createAnimatable('.about-text', { x: 0, ease: 'out(3)' });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animatable.x(0, 800);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(aboutRef.current);

      return () => {
        observer.disconnect();
        scope.revert();
      };
    });
  }, []);

  return (
    <section ref={aboutRef} id="about" className="about-section">
      <h2 className="section-title">About Us</h2>
      <p className="about-text">
        Grill House is a family-owned barbecue restaurant specializing in
        slow-smoked meats and classic sides. Our recipes have been passed
        down through generations, bringing you authentic flavor with every bite.
      </p>
    </section>
  );
}
