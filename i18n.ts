import { Locale } from 'antd/lib/locale';
import en_US from 'antd/locale/en_US';
import fr_CA from 'antd/locale/fr_CA';
import { getRequestConfig } from 'next-intl/server';

export const languages = {
	'en-US': { name: 'English', flag: '🇺🇸', unicode: '1f1fa-1f1f8', antd: en_US },
	'fr-CA': { name: 'French', flag: '🇨🇦', unicode: '', antd: fr_CA },
};

export type ILanguage = {
	[K in keyof typeof languages]: {
		name: string;
		flag: string;
		unicode: string;
		antd: Locale;
	};
};

export const defaultLocale: keyof typeof languages = 'en-US';

export default getRequestConfig(async ({ locale }) => ({
	messages: (await import(`./locales/${locale}.json`)).default,
}));
