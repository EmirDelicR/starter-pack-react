import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';

import './LanguageSwitcher.scss';

interface UpdateData {
  lang: 'de' | 'en' | 'bs';
  side: 'right' | 'front' | 'back';
}

interface LanguageData extends UpdateData {
  data: UpdateData;
}

const LANGUAGE_DATA: LanguageData[] = [
  {
    data: { lang: 'de', side: 'right' },
    side: 'front',
    lang: 'en'
  },
  {
    data: { lang: 'en', side: 'front' },
    side: 'back',
    lang: 'bs'
  },
  {
    data: { lang: 'bs', side: 'back' },
    side: 'right',
    lang: 'de'
  }
];

export default function LanguageSwitcher() {
  const cubeRef = useRef<HTMLDivElement>(null);
  const [currentClass, setCurrentClass] = useState('');
  const {
    i18n: { changeLanguage }
  } = useTranslation();

  const updateLanguage = (data: UpdateData) => () => {
    changeLanguage(data.lang);
    const showClass = `show-${data.side}`;
    if (currentClass !== '') {
      cubeRef.current?.classList?.remove(currentClass);
    }
    cubeRef.current?.classList?.add(showClass);
    setCurrentClass(showClass);
  };

  return (
    <div className="language-wrapper">
      <div ref={cubeRef} className="cube">
        {LANGUAGE_DATA.map((item) => (
          <div
            key={item.lang}
            onClick={updateLanguage({ ...item.data })}
            className={`cube-face cube-face--${item.side}`}
          >
            {item.lang.toUpperCase()}
          </div>
        ))}
        <div className="cube-face cube-face--left">-</div>
        <div className="cube-face cube-face--top">-</div>
        <div className="cube-face cube-face--bottom">-</div>
      </div>
    </div>
  );
}
