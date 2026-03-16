'use client';

import React, { useState } from 'react';
import { useTheme } from '@/lib/contexts/theme-context';
import { themeMetadata, ThemeName, themes } from '@/lib/themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Palette } from 'lucide-react';

export function ThemeSelector() {
  const { theme, setTheme, isLoading } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeNames = Object.keys(themeMetadata) as ThemeName[];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={isLoading}
          className="gap-2"
        >
          <Palette className="h-4 w-4" />
          <span className="hidden sm:inline capitalize">{theme}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themeNames.map((themeName) => (
          <DropdownMenuItem
            key={themeName}
            onClick={() => {
              setTheme(themeName);
              setIsOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer"
            aria-label={`Select ${themeMetadata[themeName].label} theme`}
          >
            <div className="flex items-center gap-2 flex-1">
              <div className="flex gap-1">
                {themeName === 'ocean' && (
                  <>
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                    <div className="w-3 h-3 rounded-full bg-blue-400" />
                  </>
                )}
                {themeName === 'sunset' && (
                  <>
                    <div className="w-3 h-3 rounded-full bg-orange-600" />
                    <div className="w-3 h-3 rounded-full bg-pink-500" />
                  </>
                )}
                {themeName === 'forest' && (
                  <>
                    <div className="w-3 h-3 rounded-full bg-green-600" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </>
                )}
                {themeName === 'midnight' && (
                  <>
                    <div className="w-3 h-3 rounded-full bg-purple-600" />
                    <div className="w-3 h-3 rounded-full bg-indigo-400" />
                  </>
                )}
                {themeName === 'sky' && (
                  <>
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <div className="w-3 h-3 rounded-full bg-cyan-400" />
                  </>
                )}
                {themeName === 'desert' && (
                  <>
                    <div className="w-3 h-3 rounded-full bg-amber-600" />
                    <div className="w-3 h-3 rounded-full bg-teal-500" />
                  </>
                )}
              </div>
              <div>
                <div className="font-medium capitalize">
                  {themeMetadata[themeName].label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {themeMetadata[themeName].description}
                </div>
              </div>
            </div>
            {theme === themeName && (
              <div className="w-2 h-2 rounded-full bg-primary ml-auto" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
