import { useEffect, useRef } from 'react';
import { createAnimatable, createScope } from 'animejs';

const menuItems = [
  { name: 'Smoked Ribs', price: '$24', desc: 'Slow-smoked for 8 hours with our signature blend' },
  { name: 'BBQ Brisket', price: '$22', desc: 'Texas-style brisket with a juicy bark' },
  { name: 'Grilled Burger', price: '$14', desc: 'Hand-pattied beef with cheddar and BBQ sauce' },
  { name: 'Pulled Pork', price: '$18', desc: 'Slow-cooked pork with tangy vinegar sauce' },
  { name: 'Corn on the Cob', price: '$6', desc: 'Fresh-grilled with herb butter' },
  { name: 'Peach Cobbler', price: '$8', desc: 'Warm dessert with vanilla ice cream' },
];

export default function Menu() {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuRef.current) return;

    const scope = createScope({ root: menuRef.current });

    scope.execute(() => {
      const cardAnims = menuItems.map((_, i) =>
        createAnimatable(`.menu-card:nth-child(${i + 1})`, { x: 0, y: 30, ease: 'out(3)' })
      );

      const animateCards = () => {
        cardAnims.forEach((anim, i) => {
          setTimeout(() => {
            anim.x(0, 600);
            anim.y(0, 600);
          }, i * 100);
        });
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCards();
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(menuRef.current);

      return () => {
        observer.disconnect();
        scope.revert();
      };
    });
  }, []);

  return (
    <section ref={menuRef} id="menu" className="menu-section">
      <h2 className="section-title">Our Menu</h2>
      <div className="menu-grid">
        {menuItems.map((item, i) => (
          <div key={i} className="menu-card">
            <div className="menu-card-header">
              <span className="menu-item-name">{item.name}</span>
              <span className="menu-item-price">{item.price}</span>
            </div>
            <p className="menu-item-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
