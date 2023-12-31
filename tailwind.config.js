/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        // TODO How to change color dynamically?
        // Add hues instead of discrete colors
        "my-ng-theme-primary-color": "var(--mat-badge-background-color)",
        "my-ng-theme-primary-lighter-color": "var(--mat-select-focused-arrow-color)",
      },
    },
  }
}

