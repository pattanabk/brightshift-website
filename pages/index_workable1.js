// brightshift_website.zip/pages/index.js
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'; // Import this

export default function Home() {
  const { t } = useTranslation('common');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = {
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
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
        alert(result.message); // Show success message
        // Optionally, clear the form
        event.target.reset();
      } else {
        alert(`Error: ${result.message}`); // Show error message
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
      <Link href="/" locale="en">English</Link> | <Link href="/" locale="th">ไทย</Link>
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
        <button type="submit">{t('submit')}</button>
      </form>
    </div>
  );
}

// Add this function to enable server-side translations for the home page
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}