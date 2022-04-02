import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { selectDarkMode, setSystemTheme } from '@redux/modules/darkMode';

export function useThemeEffect() {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector(selectDarkMode);

  useEffect(() => {
    // 시스템 상의 다크모드 확인
    const systemPreferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    dispatch(setSystemTheme(systemPreferDark ? 'dark' : 'light'));
  }, [dispatch]);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);
}
