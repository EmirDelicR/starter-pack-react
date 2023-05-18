import i18n from 'i18next';
import { ResourceLanguage } from 'i18next';
import { ResourceKey } from 'i18next';
import { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

const loadLocaleMessages = () => {
  const localesFiles = import.meta.glob('./locales/*.json', {
    eager: true,
    import: 'default'
  });
  const messages: Resource = {};

  for (const key in localesFiles) {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale: ResourceKey = matched[1];
      messages[locale] = localesFiles[key] as ResourceLanguage;
    }
  }

  return messages;
};

i18n.use(initReactI18next).init({
  resources: loadLocaleMessages(),
  lng: 'en',
  debug: true,
  fallbackLng: 'en'
});
