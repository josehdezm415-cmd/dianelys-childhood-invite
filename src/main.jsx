import React from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import './styles.css';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.2, 0.8, 0.2, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const baseUrl = import.meta.env.BASE_URL;
const photo = (name) => `${baseUrl}photos/${name}`;

const memories = [
  {
    title: 'Ojitos que enamoran',
    text: 'Una sonrisita de bebé que guarda toda la ternura de sus primeros años.',
    image: photo('dianelys-gallery-01.jpg'),
    position: '50% 42%',
  },
  {
    title: 'Lista para salir',
    text: 'Ese momento dulce y divertido que se vuelve recuerdo para siempre.',
    image: photo('dianelys-gallery-02.jpg'),
    position: '50% 38%',
  },
  {
    title: 'Dulce conejita',
    text: 'Una foto alegre, llena de color y de esa inocencia tan bonita.',
    image: photo('dianelys-gallery-03.jpg'),
    position: '52% 48%',
  },
  {
    title: 'Cerquita del corazón',
    text: 'Un recuerdo familiar de esos que se sienten cálidos y cercanos.',
    image: photo('dianelys-gallery-04.jpg'),
    position: '54% 44%',
  },
  {
    title: 'Navidad en casa',
    text: 'Luces, familia y un recuerdo que se queda guardado con mucho amor.',
    image: photo('dianelys-gallery-05.jpg'),
    position: '48% 48%',
  },
];

function App() {
  return (
    <main className="page">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="petals" aria-hidden="true">
        {Array.from({ length: 22 }).map((_, index) => <span key={index} style={{ '--i': index }} />)}
      </div>

      <nav className="topbar" aria-label="Navegación">
        <a href="#inicio" className="brand-chip">Sweet Moments SV</a>
        <div>
          <a href="#recuerdos">Recuerdos</a>
          <a href="#mensaje">Mensaje</a>
        </div>
      </nav>

      <section id="inicio" className="hero">
        <motion.div className="hero-copy" variants={stagger} initial="hidden" animate="show">
          <motion.p className="eyebrow" variants={fadeUp}>Una invitación de recuerdos</motion.p>
          <motion.h1 variants={fadeUp}>Dianelys</motion.h1>
          <motion.p className="script" variants={fadeUp}>cuando era pequeña</motion.p>
          <motion.p className="intro" variants={fadeUp}>
            Un recuerdo digital para celebrar esos años dulces, las sonrisas chiquitas y los momentos que la familia guarda con amor.
          </motion.p>
          <motion.div className="hero-actions" variants={fadeUp}>
            <a href="#recuerdos" className="button primary">Ver la galería</a>
            <a href="#mensaje" className="button secondary">Leer el mensaje</a>
          </motion.div>
          <motion.div className="mini-facts" variants={fadeUp}>
            <span>✨ Diseño familiar</span>
            <span>📸 Galería emocional</span>
            <span>💛 Hecho con amor</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="portrait-stage"
          initial={{ opacity: 0, y: 26, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }}
        >
          <div className="portrait-card portrait-back" aria-hidden="true" />
          <div className="portrait-card portrait-main">
            <div className="photo-frame">
              <img src={photo('dianelys-hero.jpg')} alt="Dianelys sonriendo cuando era bebé" />
            </div>
            <p>Una sonrisa para recordar siempre</p>
          </div>
          <div className="floating-note">Recuerdos de infancia</div>
        </motion.div>
      </section>

      <motion.section className="details glass" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
        <motion.div variants={fadeUp}>
          <strong>✨ Estilo</strong>
          <p>Pastel, dulce, nostálgico y familiar.</p>
        </motion.div>
        <motion.div variants={fadeUp}>
          <strong>📸 Enfoque</strong>
          <p>Fotos de infancia como parte principal de la experiencia.</p>
        </motion.div>
        <motion.div variants={fadeUp}>
          <strong>💌 Uso</strong>
          <p>Demo premium, recuerdo familiar o invitación especial.</p>
        </motion.div>
      </motion.section>

      <section id="recuerdos" className="memories-section">
        <motion.div className="section-heading" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <p className="eyebrow">Galería emocional</p>
          <h2>Pequeños momentos, grandes recuerdos</h2>
          <p>Una colección de fotos de infancia para celebrar lo dulce, lo tierno y lo familiar.</p>
        </motion.div>

        <motion.div className="memory-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
          {memories.map((memory, index) => (
            <motion.article className={`memory-card memory-${index + 1}`} variants={fadeUp} key={memory.title}>
              <div className="memory-photo">
                <img src={memory.image} alt={memory.title} style={{ objectPosition: memory.position }} />
              </div>
              <div className="memory-copy">
                <p className="memory-number">0{index + 1}</p>
                <h3>{memory.title}</h3>
                <p>{memory.text}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <motion.section id="mensaje" className="message glass" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
        <p className="eyebrow">Mensaje</p>
        <h2>Hay recuerdos que no se repiten, pero sí se pueden celebrar bonito.</h2>
        <p>
          Dianelys, estas fotos guardan una parte muy dulce de tu historia: tus primeras sonrisas, tus gestos tiernos y esos momentos familiares que se quedan para siempre.
        </p>
      </motion.section>

      <motion.section className="keepsake-card" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <div>
          <p className="eyebrow">Sweet Moments SV</p>
          <h2>De una foto bonita a una experiencia para compartir.</h2>
        </div>
        <p>
          Esta página puede crecer con más fotos, música visual, cuenta regresiva, ubicación o una invitación completa para un evento real.
        </p>
      </motion.section>

      <motion.section id="confirmar" className="final-card" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <p className="eyebrow">Siguiente paso</p>
        <h2>Podemos convertir estos recuerdos en una invitación completa.</h2>
        <p>Con estas fotos ya tenemos una base hermosa. Podemos agregar fecha, mensaje familiar, más fotos y un link privado o público cuando tú decidas.</p>
        <a className="button primary" href="https://sweetmomentssv.com">Sweet Moments SV</a>
      </motion.section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
