// Copyright (c) 2024 Dmytro Hovenko
// All rights reserved.
/**
 * Language management core functionality
 */

const LanguageManager = {
    currentLang: 'en',
    loadedTranslations: {}, // Cache for loaded translations

    async init() {
        this.currentLang = localStorage.getItem('siteLang') || 'en';
        await this.setLanguage(this.currentLang);

        document.querySelectorAll('.lang-btn').forEach(btn => {
            const lang = btn.getAttribute('data-lang');
            btn.addEventListener('click', async () => { // Event handler is now asynchronous
                // Short delay for visual feedback before changing language
                await new Promise(resolve => setTimeout(resolve, 100));
                
                this.currentLang = lang;
                localStorage.setItem('siteLang', lang);
                await this.setLanguage(lang);
            });
        });
    },

    async fetchTranslations(lang) {
        if (this.loadedTranslations[lang]) {
            return this.loadedTranslations[lang];
        }
        try {
            // Path to translation files relative to the site root
            // For production, remove `?v=${new Date().getTime()}` or replace with a proper cache-busting strategy (e.g., build hash).
            // This query parameter is useful for development to prevent browser caching of JSON files.
            const response = await fetch(`js/lang/translations/${lang}.json?v=${new Date().getTime()}`);
            if (!response.ok) {
                throw new Error(`Failed to load ${lang}.json: ${response.statusText}`);
            }
            const translations = await response.json();
            this.loadedTranslations[lang] = translations;
            return translations;
        } catch (error) {
            console.error(`Error fetching translations for ${lang}:`, error);
            if (lang !== 'en') {
                console.warn(`Falling back to English translations.`);
                // Recursive call to load English in case of an error
                return await this.fetchTranslations('en');
            }
            return {}; // Return an empty object if English also fails to load
        }
    },

    async setLanguage(lang) {
        const translations = await this.fetchTranslations(lang);

        // If translations are empty (e.g., file not found and English also failed to load)
        if (Object.keys(translations).length === 0) {
            console.error(`No translations available for ${lang}. Displaying might be incomplete.`);
            // Additional logic can be added, e.g., show a message to the user
        }

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations && translations[key]) {
                el.innerHTML = translations[key]; // Use innerHTML for correct HTML insertion
            } else {
                console.warn(`Translation key "${key}" not found for language "${lang}".`);
                // Optionally: keep the old value or clear el.innerHTML = '';
            }
        });

        document.querySelectorAll('.lang-btn').forEach(btn =>
            btn.classList.toggle('active-lang', btn.getAttribute('data-lang') === lang)
        );

        document.documentElement.setAttribute('lang', lang);
        this.currentLang = lang; // Update the current language
    }
};

export default LanguageManager;
