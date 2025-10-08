import {DOCUMENT} from '@angular/common';
import {inject, Injectable, PLATFORM_ID, signal} from '@angular/core';

type Theme = 'light' | 'dark' | 'light dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeManager {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  readonly currentTheme = signal<Theme>('light dark');

  setTheme(theme: Theme) {
    const THEME_PREFERENCE_LOCAL_STORAGE_KEY = 'themePreference';
    localStorage.setItem(THEME_PREFERENCE_LOCAL_STORAGE_KEY, theme);
    const htmlElement = document.querySelector("html");
    if (theme === 'light dark') {
      localStorage.removeItem(THEME_PREFERENCE_LOCAL_STORAGE_KEY);
      if (htmlElement) {
        htmlElement.style.colorScheme = theme;
      }
    } else if (htmlElement) {
      htmlElement.style.colorScheme = theme;
    }
  }

}
