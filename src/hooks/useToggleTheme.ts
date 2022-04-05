import { useAppDispatch } from 'redux/hooks';
import { useTheme } from './useTheme';
import { enableDarkMode, enableLightMode } from 'redux/modules/darkMode';

export function useToggleTheme() {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const save = (value: 'light' | 'dark') => {
    localStorage.setItem('theme', value); // For CSR
    document.cookie = `theme=${value}; path=/;`; // For SSR
  };

  const toggle = (value: 'light' | 'dark') => {
    if (!theme) return;
    if (theme === 'dark') {
      dispatch(enableLightMode());
      save(value);
    } else if (theme === 'light') {
      dispatch(enableDarkMode());
      save(value);
    }
  };

  return [theme, toggle] as const;
}
