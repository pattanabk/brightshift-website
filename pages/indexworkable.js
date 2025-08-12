// brightshift_website.zip/pages/index.js
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'; // Import this
import Link from 'next/link';

export default function Home() {
  const { t } = useTranslation('common');
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
      <Link href="/" <Link href="/" locale="th">ไทย</Link> | locale="en">English</Link>
      <form style={{ marginTop: '20px' }}>
        <div>
          <label>{t('name')}</label><br />
          <input type="text" name="name" />
        </div>
        <div>
          <label>{t('email')}</label><br />
          <input type="email" name="email" />
        </div>
        <div>
          <label>{t('phone')}</label><br />
          <input type="tel" name="phone" />
        </div>
        <button type="submit">{t('submit')}</button>
      </form>
    </div>
  );
}

// Add this function to your page
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])), // Load 'common' namespace for the current locale
      // You can pass other props here too
    },
  };
}