const themeToggle = document.querySelector('#theme-toggle');
const storedTheme = getStoredTheme();
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function getStoredTheme() {
  try {
    return localStorage.getItem('college-diaries-theme');
  } catch (error) {
    console.error('Unable to read the saved theme preference.', error);
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem('college-diaries-theme', theme);
  } catch (error) {
    console.error('Unable to save the theme preference.', error);
  }
}

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.dataset.theme = theme;
  themeToggle.textContent = isDark ? 'Light mode' : 'Dark mode';
  themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
  themeToggle.setAttribute('aria-pressed', String(isDark));
}

const initialTheme = storedTheme === 'light' || storedTheme === 'dark'
  ? storedTheme
  : systemPrefersDark ? 'dark' : 'light';

applyTheme(initialTheme);

themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  saveTheme(nextTheme);
});
