import { useTranslation } from 'next-i18next';
import Link from 'next/link';
// Make sure serverSideTranslations is imported! This is crucial.
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
  const { t } = useTranslation('common');

  // Existing handleSubmit function for your form logic
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
      additionalRequest: event.target.additionalRequest.value, // Added this line
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
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
      {/* Language Switcher */}
      <Link href="/" locale="en">English</Link> | <Link href="/" locale="th">ไทย</Link>

      <hr style={{ margin: '40px 0' }} />

      {/* Services Section */}
      <h2>{t('servicesTitle')}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <div>
          <h3>{t('softwareSetupTitle')}</h3>
          <ul>
            <li>{t('serverSetup')}</li>
            <li>{t('appInstallation')}</li>
            <li>{t('databaseSetup')}</li>
            <li>{t('cloudDeployment')}</li>
          </ul>
        </div>
        <div>
          <h3>{t('aiDevTitle')}</h3>
          <ul>
            <li>{t('aiChatbot')}</li>
            <li>{t('predictiveAnalytics')}</li>
            <li>{t('workflowAutomation')}</li>
            <li>{t('imageGeneration')}</li>
            <li>{t('aiDataProcessing')}</li>
          </ul>
        </div>
        <div>
          <h3>{t('webAppDevTitle')}</h3>
          <ul>
            <li>{t('customWebsites')}</li>
            <li>{t('apiDevelopment')}</li>
            <li>{t('dashboardCreation')}</li>
            <li>{t('podAutomation')}</li>
          </ul>
        </div>
        <div>
          <h3>{t('automationIntegrationTitle')}</h3>
          <ul>
            <li>{t('n8nLangChain')}</li>
            <li>{t('apiBusinessIntegrations')}</li>
            <li>{t('ecommerceAutomation')}</li>
          </ul>
        </div>
      </div>

      <hr style={{ margin: '40px 0' }} />

      {/* Skills & Tools Section */}
      <h2>{t('skillsToolsTitle')}</h2>
      <ul>
        <li>{t('languages')}</li>
        <li>{t('frameworks')}</li>
        <li>{t('databases')}</li>
        <li>{t('aiTools')}</li>
        <li>{t('cloudTools')}</li>
        <li>{t('specialSkills')}</li>
      </ul>

      <hr style={{ margin: '40px 0' }} />

      {/* Contact Form - Moved to Bottom */}
      <h2>{t('contactUs')}</h2>
      <form style={{ marginTop: '20px' }} onSubmit={handleSubmit}>
        <div>
          <label>{t('name')}</label><br />
          <input type="text" name="name" required />
        </div>
        <div>
          <label>{t('email')}</label><br />
          <input type="email" name="email" required />
        </div>
        <div>
          <label>{t('phone')}</label><br />
          <input type="tel" name="phone" required />
        </div>
        {/* New "Additional Request" field */}
        <div>
          <label htmlFor="additionalRequest">{t('additionalRequest')}</label><br />
          <textarea
            id="additionalRequest" // Added ID for accessibility with label
            name="additionalRequest"
            rows="4" // Make the box wider (more rows)
            cols="50" // Adjust columns for width
            style={{ width: '100%', maxWidth: '500px', resize: 'vertical' }} // Responsive and resizable
          ></textarea>
        </div>
        <button type="submit">{t('submit')}</button>
      </form>
    </div>
  );
}

// THIS FUNCTION IS ESSENTIAL FOR NEXT-I18NEXT TO LOAD TRANSLATIONS ON THE SERVER
export async function getStaticProps({ locale }) {
  return {
    props: {
      // Pass the translations to the page component
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}