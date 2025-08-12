// brightshift_website.zip/pages/index.js
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
export default function Home() {
  const { t } = useTranslation('common');
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>{t('welcome')}</h1> {/* Uses 'welcome' key from common.json */}
      <p>{t('description')}</p> {/* Uses 'description' key from common.json */}
      <Link href="/" locale="en">English</Link> | <Link href="/" locale="th">ไทย</Link>
      <form style={{ marginTop: '20px' }}>
        <div>
          <label>{t('name')}</label><br /> {/* Uses 'name' key */}
          <input type="text" name="name" />
        </div>
        <div>
          <label>{t('email')}</label><br /> {/* Uses 'email' key */}
          <input type="email" name="email" />
        </div>
        <div>
          <label>{t('phone')}</label><br /> {/* Uses 'phone' key */}
          <input type="tel" name="phone" />
        </div>
        <button type="submit">{t('submit')}</button> {/* Uses 'submit' key */}
      </form>
    </div>
  );
}