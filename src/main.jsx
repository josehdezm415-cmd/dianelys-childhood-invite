import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import './styles.css';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.2, 0.8, 0.2, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
};

const baseUrl = import.meta.env.BASE_URL;
const photo = (name) => `${baseUrl}photos/${name}`;
const musicTrack = `${baseUrl}audio/a-thousand-years-instrumental.mp3`;

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
  const [activeMemory, setActiveMemory] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [musicOn, setMusicOn] = useState(false);
  const musicRef = useRef(null);
  const active = memories[activeMemory];

  const goToMemory = (direction) => {
    setActiveMemory((current) => (current + direction + memories.length) % memories.length);
  };

  const handleTouchEnd = (event) => {
    if (touchStart === null) return;
    const delta = touchStart - event.changedTouches[0].clientX;
    if (Math.abs(delta) > 42) goToMemory(delta > 0 ? 1 : -1);
    setTouchStart(null);
  };

  const toggleMusic = async () => {
    if (musicOn) {
      musicRef.current?.pause();
      setMusicOn(false);
      return;
    }

    if (!musicRef.current) {
      const audio = new Audio(musicTrack);
      audio.loop = true;
      audio.volume = 0.62;
      musicRef.current = audio;
    }

    try {
      await musicRef.current.play();
      setMusicOn(true);
    } catch (error) {
      setMusicOn(false);
    }
  };

  return (
    <main className="page">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="petals" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, index) => <span key={index} style={{ '--i': index }} />)}
      </div>

      <nav className="topbar" aria-label="Navegación">
        <a href="#inicio" className="brand-chip">Sweet Moments SV</a>
        <div>
          <a href="#detalles">Detalles</a>
          <a href="#recuerdos">Fotos</a>
          <a href="#mensaje">Mensaje</a>
          <button className={`music-toggle ${musicOn ? 'playing' : ''}`} type="button" onClick={toggleMusic} aria-pressed={musicOn}>
            {musicOn ? 'Pausar canción' : 'Canción'}
          </button>
        </div>
      </nav>

      <section id="inicio" className="hero invite-card">
        <motion.div className="hero-copy" variants={stagger} initial="hidden" animate="show">
          <motion.p className="eyebrow" variants={fadeUp}>Invitación digital premium</motion.p>
          <motion.p className="invite-line" variants={fadeUp}>Te invitamos a celebrar</motion.p>
          <motion.h1 variants={fadeUp}>Dianelys</motion.h1>
          <motion.p className="script" variants={fadeUp}>recuerdos de infancia</motion.p>
          <motion.p className="intro" variants={fadeUp}>
            Una celebración inspirada en sus primeros años, sus sonrisas pequeñas y esos momentos que la familia guarda con amor.
          </motion.p>
          <motion.div className="hero-actions" variants={fadeUp}>
            <a href="#detalles" className="button primary">Ver detalles</a>
            <a href="#recuerdos" className="button secondary">Ver fotos</a>
          </motion.div>
          <motion.div className="mini-facts" variants={fadeUp}>
            <span>✨ Formato invitación</span>
            <span>📸 Fotos apiladas</span>
            <span>💛 Estilo familiar</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-stack-wrap"
          initial={{ opacity: 0, y: 26, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }}
        >
          <div className="hero-photo-card hero-photo-back one" aria-hidden="true" />
          <div className="hero-photo-card hero-photo-back two" aria-hidden="true" />
          <div className="hero-photo-card hero-photo-main clean-hero-photo">
            <img src={photo('dianelys-hero.jpg')} alt="Dianelys sonriendo cuando era bebé" />
          </div>
          <div className="floating-note">Hecha con amor</div>
        </motion.div>
      </section>

      <motion.section id="detalles" className="event-panel glass" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
        <motion.div className="section-kicker" variants={fadeUp}>
          <p className="eyebrow">Formato invitación</p>
          <h2>Un recuerdo familiar convertido en experiencia para compartir.</h2>
        </motion.div>
        <motion.div className="detail-list" variants={stagger}>
          <motion.div variants={fadeUp}>
            <span>Fecha</span>
            <strong>Por definir</strong>
            <p>Perfecto para cumpleaños, celebración familiar o recuerdo especial.</p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <span>Lugar</span>
            <strong>Donde nazca el momento</strong>
            <p>Puede incluir ubicación, mapa, Waze o dirección si se vuelve evento real.</p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <span>Confirmación</span>
            <strong>RSVP opcional</strong>
            <p>Se puede conectar a WhatsApp para confirmar asistencia o pedir información.</p>
          </motion.div>
        </motion.div>
      </motion.section>

      <section id="recuerdos" className="memories-section">
        <motion.div className="section-heading" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <p className="eyebrow">Galería apilada</p>
          <h2>Fotos que se sienten como recuerdos guardados en una cajita.</h2>
          <p>Un estilo más premium, más editorial y más parecido a una invitación especial.</p>
        </motion.div>

        <motion.div className="true-stack-layout" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
          <motion.div
            className="photo-pile swipe-pile"
            variants={fadeUp}
            aria-label="Fotos apiladas de Dianelys"
            onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
            onTouchEnd={handleTouchEnd}
            onClick={() => goToMemory(1)}
          >
            {memories.map((memory, index) => {
              const offset = (index - activeMemory + memories.length) % memories.length;
              return (
                <div className={`pile-card pile-position-${offset}`} key={memory.title} aria-hidden={offset > 2}>
                  <img src={memory.image} alt={memory.title} style={{ objectPosition: memory.position }} />
                </div>
              );
            })}
            <button className="stack-nav prev" type="button" aria-label="Foto anterior" onClick={(event) => { event.stopPropagation(); goToMemory(-1); }}>‹</button>
            <button className="stack-nav next" type="button" aria-label="Siguiente foto" onClick={(event) => { event.stopPropagation(); goToMemory(1); }}>›</button>
            <div className="pile-label">
              <span>{activeMemory + 1} de {memories.length}</span>
              <strong>desliza o toca</strong>
            </div>
          </motion.div>

          <motion.div className="stack-story" variants={fadeUp}>
            <div className="story-row active-story">
              <span>0{activeMemory + 1}</span>
              <div>
                <h3>{active.title}</h3>
                <p>{active.text}</p>
              </div>
            </div>
            <div className="story-dots" aria-label="Seleccionar foto">
              {memories.map((memory, index) => (
                <button
                  type="button"
                  className={index === activeMemory ? 'active' : ''}
                  key={memory.title}
                  aria-label={`Ver foto ${index + 1}`}
                  onClick={() => setActiveMemory(index)}
                />
              ))}
            </div>
            <p className="swipe-helper">Desliza la foto o toca las flechas para recorrer los recuerdos.</p>
          </motion.div>
        </motion.div>
      </section>

      <motion.section id="mensaje" className="message glass" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
        <p className="eyebrow">Mensaje familiar</p>
        <h2>Hay recuerdos que no se repiten, pero sí se pueden celebrar bonito.</h2>
        <p>
          Dianelys, estas fotos guardan una parte muy dulce de tu historia: tus primeras sonrisas, tus gestos tiernos y esos momentos familiares que se quedan para siempre.
        </p>
      </motion.section>

      <motion.section className="premium-note" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <div>
          <p className="eyebrow">Sweet Moments SV</p>
          <h2>Lo que puede incluir una versión final.</h2>
        </div>
        <ul>
          <li>Cuenta regresiva para el evento</li>
          <li>Botón de WhatsApp para confirmar</li>
          <li>Mapa, ubicación o link de Waze</li>
          <li>Música visual y más fotos familiares</li>
        </ul>
      </motion.section>

      <motion.section id="confirmar" className="final-card" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <p className="eyebrow">Vista previa</p>
        <h2>Una base premium para convertir recuerdos en invitación.</h2>
        <p>Esta versión ya se siente más como una invitación compartible. Solo faltaría decidir si será un evento real, un recuerdo familiar privado o una demo pública de Sweet Moments SV.</p>
        <a className="button primary" href="https://sweetmomentssv.com">Ver Sweet Moments SV</a>
      </motion.section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
