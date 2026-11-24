import { ThemeName } from '@/lib/themes';

export async function getUserTheme(_userId: string): Promise<ThemeName | null> {
  return null;
}

export async function saveUserTheme(
  _userId: string,
  _themeName: ThemeName
): Promise<boolean> {
  return true;
}

export async function deleteUserPreferences(_userId: string): Promise<boolean> {
  return true;
}
