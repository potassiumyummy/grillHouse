import { useEffect, useRef } from 'react';
import { createAnimatable, createScope } from 'animejs';
import './header.css';

export default function Header() {
  const navRef = useRef(null);

  useEffect(() => {
    if (!navRef.current) return;

    const scope = createScope({ root: navRef.current });

    scope.execute(() => {
      const logoAnim = createAnimatable('.header-logo', { y: 0, ease: 'out(3)' });
      const linkAnims = createAnimatable('.header-link', { y: 0, ease: 'out(3)' });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              logoAnim.y(0, 600);
              linkAnims.y(0, 600);
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(navRef.current);

      return () => {
        observer.disconnect();
        scope.revert();
      };
    });
  }, []);

  return (
    <nav ref={navRef} className="header-nav">
      <span className="header-logo">Grill House</span>
      <div className="header-links">
        <a href="#menu" className="header-link">Menu</a>
        <a href="#about" className="header-link">About</a>
        <a href="#contact" className="header-link">Contact</a>
      </div>
    </nav>
  );
}
