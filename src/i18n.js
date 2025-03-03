import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import vi from "@/locales/vi.json";
const savedLocale = localStorage.getItem("lang") || "en";
const i18n = createI18n({
  legacy: false, // Dùng Composition API
  locale: savedLocale, // Ngôn ngữ mặc định
  fallbackLocale: "en",
  messages: { en, vi }
});

export default i18n;