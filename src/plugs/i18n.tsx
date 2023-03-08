
import i18n from "i18next";
import {initReactI18next} from 'react-i18next';
import en from "@/lang/en.json";
import ja from "@/lang/ja.json";

i18n.use(initReactI18next).init({
  //引入资源文件
  resources: {
    en: {
      translation: en,
    },
    ja: {
      translation: ja,
    },
  },
  //选择默认语言，选择内容为上述配置中的key，即en/zh
  lng: localStorage.getItem('uic_language') || 'en',
  // lng: 'en',
  fallbackLng: "en",
  debug: false,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

// usage
//i18n.changeLanguage(localStorage.getItem('uic_language') || 'en');
// import { useTranslation } from "react-i18next";
// const { t } = useTranslation();
// {t('PUBLIC.NODATA')}
export default i18n;