import styles from './WelcomeMessage.module.css'
import Image from 'next/image'

const WelcomeMessage = () => {
  const coreBenefits = [
    {
      title: "Anuncios de empleo y servicios",
      description: "Encuentra trabajo o comparte tus habilidades de forma directa y personal",
      icon: "work_outline"
    },
    {
      title: "Colaboración vecinal",
      description: "Una comunidad dispuesta a ayudarse mutuamente, sin intermediarios",
      icon: "diversity_3"
    },
    {
      title: "Soluciones confiables",
      description: "Un espacio seguro donde cada anuncio es una oportunidad local",
      icon: "verified"
    }
  ];

  const targetAudience = [
    {
      role: "Trabajadores locales",
      benefit: "Encuentra oportunidades de empleo cercanas y reales",
      icon: "badge"
    },
    {
      role: "Emprendedores",
      benefit: "Llega directamente a quienes necesitan tus servicios",
      icon: "store"
    },
    {
      role: "Vecinos comprometidos",
      benefit: "Participa y marca la diferencia en tu comunidad",
      icon: "volunteer_activism"
    }
  ];

  return (
    <section className={styles.welcomeSection}>
      <div className={styles.container}>
        {/* Sección Hero */}
        <div className={styles.heroContent}>
          <h1 className={styles.mainTitle}>¿Qué es <span className={styles.highlight}>Conecta Albir</span>?</h1>
          <p className={styles.mainDescription}>
            Más que un tablero de anuncios: tu punto de encuentro local
          </p>
        </div>

        {/* Beneficios Principales */}
        <div className={styles.featuresGrid}>
          {coreBenefits.map((benefit, index) => (
            <div key={index} className={styles.featureCard}>
              <span className={`material-icons-outlined ${styles.icon}`}>
                {benefit.icon}
              </span>
              <h3 className={styles.featureTitle}>{benefit.title}</h3>
              <p className={styles.featureDescription}>{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Sección Público Objetivo */}
        <div className={styles.audienceSection}>
          <h2 className={styles.sectionTitle}>¿A quién va dirigido?</h2>
          <div className={styles.audienceGrid}>
            {targetAudience.map((target, index) => (
              <div key={index} className={styles.audienceCard}>
                <span className={`material-icons-outlined ${styles.audienceIcon}`}>
                  {target.icon}
                </span>
                <h3 className={styles.audienceRole}>{target.role}</h3>
                <p className={styles.audienceBenefit}>{target.benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sección CTA */}
        <div className={styles.valueProposition}>
          <div className={styles.textContent}>
            <h2 className={styles.secondaryTitle}>
              ¿Cómo funciona?
            </h2>
            <div className={styles.stepsList}>
              <div className={styles.step}>
                <span className={styles.stepNumber}>1</span>
                <p>Publica tu anuncio con una interfaz intuitiva</p>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNumber}>2</span>
                <p>Descubre oportunidades locales</p>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNumber}>3</span>
                <p>Conecta directamente con tus vecinos</p>
              </div>
            </div>
            <button className={styles.ctaButton}>
              Únete a la comunidad
            </button>
          </div>
          <div className={styles.imageContainer}>
            <Image 
              src="/assets/proceso-albir.webp"
              alt="Comunidad de Albir"
              width={400}
              height={300}
              className={styles.illustration}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default WelcomeMessage 