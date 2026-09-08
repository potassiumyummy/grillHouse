import Header from './header.jsx';
import Hero from './sections/Hero.jsx';
import Menu from './sections/Menu.jsx';
import About from './sections/About.jsx';
import Contact from './sections/Contact.jsx';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <Menu />
        <About />
        <Contact />
      </main>
    </div>
  );
}
