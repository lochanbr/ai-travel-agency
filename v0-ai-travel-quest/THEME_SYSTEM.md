# Theme System Documentation

## Overview

The AI Travel Quest application features a complete theme customization system with Supabase authentication backend. Users can:
- Choose from 6 predefined themes
- Save theme preferences to their account
- Have themes persist across sessions

## Architecture

### Components

1. **Theme Context** (`lib/contexts/theme-context.tsx`)
   - Manages current theme state
   - Loads theme from Supabase for logged-in users
   - Falls back to localStorage for anonymous users
   - Applies theme colors to CSS variables

2. **Auth Context** (`lib/contexts/auth-context.tsx`)
   - Manages user authentication state
   - Handles sign up, sign in, and sign out
   - Listens for auth state changes from Supabase

3. **Theme Selector** (`components/theme-selector.tsx`)
   - Dropdown component showing all available themes
   - Visual color previews for each theme
   - Saves theme choice on selection

4. **Auth Modal** (`components/auth-modal.tsx`)
   - Sign up and sign in forms
   - Email and password validation
   - Error handling and success messages

5. **User Menu** (`components/user-menu.tsx`)
   - Shows logged-in user email
   - Sign out functionality

### Available Themes

```typescript
Ocean    // Deep blues with warm orange accents
Sunset   // Warm oranges and reds
Forest   // Natural greens and earth tones
Midnight // Deep purples and cool blues
Sky      // Light blues with golden accents
Desert   // Warm tans with teal accents
```

## Database Schema

### user_preferences Table

```sql
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id),
  theme_name VARCHAR(50) NOT NULL DEFAULT 'ocean',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Row Level Security Policies:**
- Users can only view their own preferences
- Users can only update their own preferences
- Users can only insert their own preferences

## Usage

### For Users

1. Click the palette icon in the navbar to open the theme selector
2. Select a theme from the dropdown
3. Theme changes apply immediately
4. If logged in, theme is saved to Supabase account
5. If not logged in, theme is saved to browser localStorage

### For Developers

#### Using Theme Context

```typescript
import { useTheme } from '@/lib/contexts/theme-context';

export function MyComponent() {
  const { theme, setTheme, isLoading } = useTheme();
  
  return (
    <button onClick={() => setTheme('sunset')}>
      Change to Sunset
    </button>
  );
}
```

#### Adding New Themes

1. Add theme to `lib/themes.ts`:
```typescript
export const themes: Record<ThemeName, ThemeColors> = {
  // ... existing themes
  newtheme: {
    background: 'oklch(...)',
    foreground: 'oklch(...)',
    // ... other colors
  },
};
```

2. Add metadata:
```typescript
export const themeMetadata: Record<ThemeName, { label: string; description: string }> = {
  // ... existing themes
  newtheme: { label: 'New Theme', description: 'Description' },
};
```

3. Add color preview to `components/theme-selector.tsx`

## File Structure

```
lib/
├── contexts/
│   ├── auth-context.tsx      # Authentication context
│   └── theme-context.tsx     # Theme management context
├── supabase/
│   ├── client.ts             # Supabase client instance
│   ├── server.ts             # Server-side Supabase client
│   └── db-operations.ts      # Database helper functions
└── themes.ts                 # Theme definitions

components/
├── theme-selector.tsx        # Theme dropdown selector
├── auth-modal.tsx            # Auth login/signup modal
└── user-menu.tsx             # User profile menu

app/
├── layout.tsx                # Root layout with providers
├── auth/
│   └── callback/
│       └── route.ts          # Auth callback route
└── middleware.ts             # Auth middleware

scripts/
├── setup-db.sql              # Database migration script
└── setup-db.js               # Node.js setup helper
```

## Environment Variables

Ensure these are set in your Vercel environment:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Color System

Colors are defined using OKLch color space for consistent, perceptually uniform colors:

```
oklch(L C H)
L = Lightness (0-1)
C = Chroma (saturation)
H = Hue (0-360)
```

### CSS Variables Applied

- `--background` - Main background color
- `--foreground` - Main text color
- `--card` - Card/panel background
- `--primary` - Primary accent color
- `--secondary` - Secondary accent color
- `--accent` - Accent color
- `--border` - Border color
- `--muted` - Muted text color

## Data Flow

### User Logs In
1. Enters email/password in Auth Modal
2. Auth Context authenticates with Supabase
3. On successful login, Theme Context loads saved theme from user_preferences table
4. Theme colors apply to CSS variables
5. User can change theme, which saves to Supabase

### Anonymous User
1. Selects theme from Theme Selector
2. Theme saves to browser localStorage
3. Theme persists until localStorage is cleared
4. When user logs in later, Supabase theme takes precedence

## Troubleshooting

### Theme not persisting after login
- Check Supabase connection in browser DevTools
- Verify user_preferences table exists
- Check Row Level Security policies are enabled

### Auth modal not appearing
- Ensure AuthProvider wraps app in layout.tsx
- Check Supabase credentials in environment variables
- Verify NEXT_PUBLIC_SUPABASE_URL is set

### Colors not changing
- Check theme CSS variables are applied to :root
- Verify globals.css includes theme definitions
- Ensure ThemeProvider is in component tree

## Future Enhancements

- Custom color picker for user-defined themes
- Theme preview before applying
- Export/import theme configurations
- Share theme with other users
- Advanced color customization per component
