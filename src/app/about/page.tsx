'use client'
import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import styles from "./About.module.css";
import WelcomeMessage from '@/components/WelcomeMessage'

const About = () => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  const textParts = useMemo(() => [
    { text: "Conectando ", type: "normal" },
    { text: "talento", type: "highlight" },
    { text: " y ", type: "normal" },
    { text: "oportunidades", type: "highlight" },
    { text: " locales", type: "normal" }
  ], []);
  
  useEffect(() => {
    const fullText = textParts.map(part => part.text).join('');
    let currentIndex = 0;
    
    const timer = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [textParts]);

  const renderText = () => {
    let currentPos = 0;
    return textParts.map((part, index) => {
      const partialText = displayText.slice(currentPos, currentPos + part.text.length);
      currentPos += part.text.length;
      return (
        <span key={index} className={part.type === 'highlight' ? styles.highlight : ''}>
          {partialText}
        </span>
      );
    });
  };

  const benefits = [
    "Publica tu anuncio en pocos pasos",
    "Conéctate con vecinos directamente",
    "Encuentra soluciones cerca de casa",
    "Sin intermediarios ni complicaciones",
    "Fortalece la comunidad local",
    "Proceso simple y directo"
  ];

  const workerBenefits = [
    "Descubre oportunidades laborales en la zona",
    "Contacto directo con empleadores locales",
    "Encuentra trabajo cerca de casa",
    "Comparte tu experiencia profesional"
  ];

  const businessBenefits = [
    "Publica tus servicios sin coste",
    "Llega a más clientes locales",
    "Gestión simple de contactos",
    "Fortalece tu presencia local"
  ];

  return (
    <main className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={`${styles.typewriter} ${!isTyping ? styles.typingComplete : ''}`}>
              {renderText()}
            </span>
          </h1>
          <p className={styles.heroDescription}>
            Nacimos de la necesidad de nuestra comunidad. 
            Un espacio digital donde encontrar y compartir 
            <span className={styles.emphasis}> trabajo</span>, 
            <span className={styles.emphasis}> servicios</span> y 
            <span className={styles.emphasis}> colaboración</span> de 
            manera efectiva y transparente.
          </p>
        </div>
      </section>

      {/* Why AlbirLeaks Section */}
      <section className={styles.whySection}>
        <WelcomeMessage />
      </section>

      {/* CTA Section */}

    </main>
  );
};

export default About;