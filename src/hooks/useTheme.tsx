import { useState } from 'react';

export const useTheme = (theme: string = 'dark') => {
  const [themeState, setTheme] = useState(theme);

  return { themeState, setTheme };
};
