import React from "react";
import Image from "next/image";
import styles from "./About.module.css";


const About = () => {
  const benefits = [
    "Acceso directo a oportunidades locales",
    "Conexión con la comunidad de Albir",
    "Publicación gratuita de ofertas",
    "Notificaciones personalizadas",
    "Soporte local dedicado",
    "Proceso simplificado"
  ];

  const workerBenefits = [
    "Acceso a ofertas exclusivas en la zona",
    "Conexión directa con empleadores locales",
    "Alertas de trabajo personalizadas",
    "Perfil profesional destacado"
  ];

  const businessBenefits = [
    "Publicación gratuita de ofertas",
    "Acceso a talento local cualificado",
    "Gestión simplificada de candidatos",
    "Visibilidad en la comunidad"
  ];

  return (
    <main className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>Conecta. Colabora. Crece en Albir.</h1>
          <p className={styles.intro}>
            Bienvenido a AlbirLeaks, tu plataforma comunitaria para conectar 
            con oportunidades laborales y servicios en Albir. Nacimos de la 
            necesidad de crear un espacio digital donde nuestra comunidad pudiera 
            compartir y encontrar trabajo de manera efectiva y transparente.
          </p>
        </div>
      </section>

      {/* Why AlbirLeaks Section */}
      <section className={styles.whySection}>
        <h2>¿Por qué AlbirLeaks?</h2>
        <div className={styles.missionBox}>
          <p>
            Somos más que una plataforma de empleo - somos el punto de encuentro 
            digital de la comunidad de Albir. Facilitamos conexiones significativas 
            entre personas y oportunidades, fortaleciendo el tejido económico y 
            social de nuestra región.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefitsSection}>
        <h2>Ventajas de formar parte de AlbirLeaks</h2>
        <div className={styles.benefitsList}>
          {benefits.map((benefit, index) => (
            <div key={index} className={styles.benefitItem}>
              <span className={styles.benefitIcon}>🔹</span>
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className={styles.featuresGrid}>
        <div className={styles.featureCard}>
          <h3>Para trabajadores y autónomos</h3>
          <ul>
            {workerBenefits.map((benefit, index) => (
              <li key={index}>
                <span className={styles.checkmark}>✅</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.featureCard}>
          <h3>Para empresas y particulares</h3>
          <ul>
            {businessBenefits.map((benefit, index) => (
              <li key={index}>
                <span className={styles.checkmark}>✅</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <h2>Forma parte de AlbirLeaks y haz crecer la comunidad</h2>
        <p className={styles.ctaText}>
          Únete a una comunidad en crecimiento que está transformando la manera 
          en que nos conectamos y trabajamos en Albir.
        </p>
        <p className={styles.ctaHighlight}>
          🌱 Publica. Conecta. Crece. Únete a AlbirLeaks hoy mismo y sé parte 
          del cambio en Albir.
        </p>
      </section>
    </main>
  );
};

export default About;