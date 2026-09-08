import { useEffect, useRef } from 'react';
import { createAnimatable, createScope } from 'animejs';

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const scope = createScope({ root: heroRef.current });

    scope.execute(() => {
      const titleAnim = createAnimatable('.hero-title', { x: 0, ease: 'out(3)' });
      const subtitleAnim = createAnimatable('.hero-subtitle', { x: 0, ease: 'out(3)' });
      const ctaAnim = createAnimatable('.hero-cta', { x: 0, ease: 'out(3)' });

      const animateIn = () => {
        titleAnim.x(0, 800);
        subtitleAnim.x(0, 800);
        ctaAnim.x(0, 800);
      };

      const animateOut = () => {
        titleAnim.x(-50, 600);
        subtitleAnim.x(-30, 600);
        ctaAnim.x(-20, 600);
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateIn();
            } else {
              animateOut();
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(heroRef.current);

      return () => {
        observer.disconnect();
        scope.revert();
      };
    });
  }, []);

  return (
    <section ref={heroRef} className="hero-section">
      <div className="hero-content">
        <h1 ref={titleRef} className="hero-title">
          Grill House
        </h1>
        <p ref={subtitleRef} className="hero-subtitle">
          Where Fire Meets Flavor
        </p>
        <a ref={ctaRef} href="#menu" className="hero-cta">
          Explore the Menu
        </a>
      </div>
    </section>
  );
}
