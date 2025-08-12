import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image'; // Import Image component for optimized images
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
  const { t } = useTranslation('common');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
      additionalRequest: event.target.additionalRequest.value,
    };

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        event.target.reset();
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An unexpected error occurred during submission.');
    }
  };

  return (
    <div style={styles.container}>
      {/* Header and Logo Section */}
      <header style={styles.header}>
        <div style={styles.logoContainer}>
          {/* Using Next.js Image component for optimization */}
          <Image
            src="/brightshiftlogo.png" // Path to your logo in the public directory
            alt="BrightShift Logo"
            width={300} // Adjust width as needed
            height={200} // Adjust height as needed, aspect ratio will be maintained
            objectFit="contain" // Ensures the entire image is visible
          />
        </div>
        <div style={styles.languageSwitcher}>
          <Link href="/" locale="en" style={styles.langLink}>English</Link> | <Link href="/" locale="th" style={styles.langLink}>ไทย</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <h1 style={styles.heroTitle}>{t('welcome')}</h1>
        <p style={styles.heroDescription}>{t('description')}</p>
      </section>

      <hr style={styles.hr} />

      {/* Services Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{t('servicesTitle')}</h2>
        <div style={styles.servicesGrid}>
          <div style={styles.serviceCard}>
            <h3 style={styles.cardTitle}>{t('softwareSetupTitle')}</h3>
            <ul style={styles.ul}>
              <li style={styles.li}>{t('serverSetup')}</li>
              <li style={styles.li}>{t('appInstallation')}</li>
              <li style={styles.li}>{t('databaseSetup')}</li>
              <li style={styles.li}>{t('cloudDeployment')}</li>
            </ul>
          </div>
          <div style={styles.serviceCard}>
            <h3 style={styles.cardTitle}>{t('aiDevTitle')}</h3>
            <ul style={styles.ul}>
              <li style={styles.li}>{t('aiChatbot')}</li>
              <li style={styles.li}>{t('predictiveAnalytics')}</li>
              <li style={styles.li}>{t('workflowAutomation')}</li>
              <li style={styles.li}>{t('imageGeneration')}</li>
              <li style={styles.li}>{t('aiDataProcessing')}</li>
            </ul>
          </div>
          <div style={styles.serviceCard}>
            <h3 style={styles.cardTitle}>{t('webAppDevTitle')}</h3>
            <ul style={styles.ul}>
              <li style={styles.li}>{t('customWebsites')}</li>
              <li style={styles.li}>{t('apiDevelopment')}</li>
              <li style={styles.li}>{t('dashboardCreation')}</li>
              <li style={styles.li}>{t('podAutomation')}</li>
            </ul>
          </div>
          <div style={styles.serviceCard}>
            <h3 style={styles.cardTitle}>{t('automationIntegrationTitle')}</h3>
            <ul style={styles.ul}>
              <li style={styles.li}>{t('n8nLangChain')}</li>
              <li style={styles.li}>{t('apiBusinessIntegrations')}</li>
              <li style={styles.li}>{t('ecommerceAutomation')}</li>
            </ul>
          </div>
        </div>
      </section>

      <hr style={styles.hr} />

      {/* Skills & Tools Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{t('skillsToolsTitle')}</h2>
        <ul style={styles.ul}>
          <li style={styles.li}>{t('languages')}</li>
          <li style={styles.li}>{t('frameworks')}</li>
          <li style={styles.li}>{t('databases')}</li>
          <li style={styles.li}>{t('aiTools')}</li>
          <li style={styles.li}>{t('cloudTools')}</li>
          <li style={styles.li}>{t('specialSkills')}</li>
        </ul>
      </section>

      <hr style={styles.hr} />

      {/* Contact Form Section */}
      <section style={styles.contactSection}>
        <h2 style={styles.sectionTitle}>{t('contactUs')}</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>{t('name')}</label>
            <input type="text" id="name" name="name" required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>{t('email')}</label>
            <input type="email" id="email" name="email" required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="phone" style={styles.label}>{t('phone')}</label>
            <input type="tel" id="phone" name="phone" required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="additionalRequest" style={styles.label}>{t('additionalRequest')}</label>
            <textarea
              id="additionalRequest"
              name="additionalRequest"
              rows="4"
              style={styles.textarea}
            ></textarea>
          </div>
          <button type="submit" style={styles.button}>{t('submit')}</button>
        </form>
      </section>
    </div>
  );
}

// Inline Styles for UX/UI Enhancement
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    backgroundColor: '#f8f8f8',
    lineHeight: '1.6',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
    paddingBottom: '20px',
    borderBottom: '1px solid #eee',
  },
  logoContainer: {
    // Styling for logo container if needed
  },
  languageSwitcher: {
    fontSize: '0.9em',
  },
  langLink: {
    margin: '0 5px',
    textDecoration: 'none',
    color: '#0070f3',
    fontWeight: 'bold',
  },
  heroSection: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#6a0dad', // Purple background
    color: 'white',
    borderRadius: '10px',
    marginBottom: '40px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  },
  heroTitle: {
    fontSize: '3em',
    marginBottom: '15px',
    fontWeight: 'bold',
  },
  heroDescription: {
    fontSize: '1.2em',
    maxWidth: '800px',
    margin: '0 auto',
  },
  hr: {
    margin: '40px 0',
    border: 'none',
    borderTop: '1px dashed #ccc',
  },
  section: {
    marginBottom: '40px',
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
  },
  sectionTitle: {
    fontSize: '2.2em',
    color: '#333',
    textAlign: 'center',
    marginBottom: '30px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
  },
  serviceCard: {
    backgroundColor: '#e6f7ff', // Light blue background for cards
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    borderLeft: '5px solid #0070f3', // Blue accent
  },
  cardTitle: {
    fontSize: '1.5em',
    color: '#0070f3',
    marginBottom: '15px',
  },
  ul: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  },
  li: {
    marginBottom: '8px',
    fontSize: '1.1em',
    color: '#555',
  },
  contactSection: {
    padding: '40px',
    backgroundColor: '#ffebcd', // Light orange/peach for contact form
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  formGroup: {
    marginBottom: '10px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '1em',
    boxSizing: 'border-box', // Include padding in width
  },
  textarea: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '1em',
    boxSizing: 'border-box',
    resize: 'vertical',
    minHeight: '80px', // Minimum height for the textarea
  },
  button: {
    padding: '15px 25px',
    backgroundColor: '#28a745', // Green button
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.1em',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    alignSelf: 'flex-start', // Align button to the start
  },
  buttonHover: { // This would be applied using state or external CSS if needed
    backgroundColor: '#218838',
  },
};

// THIS FUNCTION IS ESSENTIAL FOR NEXT-I18NEXT TO LOAD TRANSLATIONS ON THE SERVER
export async function getStaticProps({ locale }) {
  return {
    props: {
      // Pass the translations to the page component
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}