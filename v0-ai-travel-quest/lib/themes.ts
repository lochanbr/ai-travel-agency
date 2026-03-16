export type ThemeName = 'ocean' | 'sunset' | 'forest' | 'midnight' | 'sky' | 'desert';

export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  primary: string;
  secondary: string;
  accent: string;
  border: string;
  muted: string;
}

export const themes: Record<ThemeName, ThemeColors> = {
  ocean: {
    background: 'oklch(0.15 0.02 250)',
    foreground: 'oklch(0.98 0.01 250)',
    card: 'oklch(0.2 0.025 250)',
    primary: 'oklch(0.65 0.2 30)',
    secondary: 'oklch(0.55 0.15 200)',
    accent: 'oklch(0.55 0.15 200)',
    border: 'oklch(0.3 0.03 250)',
    muted: 'oklch(0.22 0.02 250)',
  },
  sunset: {
    background: 'oklch(0.15 0.02 30)',
    foreground: 'oklch(0.98 0.01 30)',
    card: 'oklch(0.2 0.025 30)',
    primary: 'oklch(0.7 0.2 50)',
    secondary: 'oklch(0.65 0.18 20)',
    accent: 'oklch(0.75 0.15 70)',
    border: 'oklch(0.3 0.03 30)',
    muted: 'oklch(0.22 0.02 30)',
  },
  forest: {
    background: 'oklch(0.12 0.02 140)',
    foreground: 'oklch(0.98 0.01 140)',
    card: 'oklch(0.18 0.025 140)',
    primary: 'oklch(0.55 0.18 140)',
    secondary: 'oklch(0.65 0.15 120)',
    accent: 'oklch(0.7 0.16 100)',
    border: 'oklch(0.28 0.03 140)',
    muted: 'oklch(0.2 0.02 140)',
  },
  midnight: {
    background: 'oklch(0.1 0.01 250)',
    foreground: 'oklch(0.95 0.01 250)',
    card: 'oklch(0.15 0.02 250)',
    primary: 'oklch(0.6 0.2 270)',
    secondary: 'oklch(0.5 0.15 250)',
    accent: 'oklch(0.7 0.18 280)',
    border: 'oklch(0.25 0.02 250)',
    muted: 'oklch(0.18 0.02 250)',
  },
  sky: {
    background: 'oklch(0.2 0.02 200)',
    foreground: 'oklch(0.98 0.01 200)',
    card: 'oklch(0.25 0.025 200)',
    primary: 'oklch(0.6 0.18 200)',
    secondary: 'oklch(0.7 0.16 180)',
    accent: 'oklch(0.75 0.15 60)',
    border: 'oklch(0.35 0.03 200)',
    muted: 'oklch(0.28 0.02 200)',
  },
  desert: {
    background: 'oklch(0.18 0.02 60)',
    foreground: 'oklch(0.98 0.01 60)',
    card: 'oklch(0.22 0.025 60)',
    primary: 'oklch(0.68 0.2 40)',
    secondary: 'oklch(0.75 0.18 20)',
    accent: 'oklch(0.55 0.15 250)',
    border: 'oklch(0.32 0.03 60)',
    muted: 'oklch(0.25 0.02 60)',
  },
};

export const themeMetadata: Record<ThemeName, { label: string; description: string }> = {
  ocean: { label: 'Ocean', description: 'Deep blues with warm orange accents' },
  sunset: { label: 'Sunset', description: 'Warm oranges and reds' },
  forest: { label: 'Forest', description: 'Natural greens and earth tones' },
  midnight: { label: 'Midnight', description: 'Deep purples and cool blues' },
  sky: { label: 'Sky', description: 'Light blues with golden accents' },
  desert: { label: 'Desert', description: 'Warm tans with teal accents' },
};
