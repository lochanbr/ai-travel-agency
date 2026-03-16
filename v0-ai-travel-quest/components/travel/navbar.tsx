'use client';

import { Compass, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ThemeSelector } from '@/components/theme-selector';
import { UserMenu } from '@/components/user-menu';
import { AuthModal } from '@/components/auth-modal';
import { useAuth } from '@/lib/contexts/auth-context';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { user, isLoading } = useAuth();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Compass className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                AI Travel Quest
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Destinations
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <ThemeSelector />
              {user ? (
                <UserMenu />
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAuthOpen(true)}
                  disabled={isLoading}
                >
                  Sign In
                </Button>
              )}
            </div>

            <button
              className="md:hidden text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-background border-b border-border">
            <div className="px-4 py-4 space-y-4">
              <a href="#" className="block text-muted-foreground hover:text-foreground">
                Destinations
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground">
                How It Works
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground">
                Pricing
              </a>
              <div className="flex gap-2 pt-2">
                <ThemeSelector />
                {user ? (
                  <UserMenu />
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      setAuthOpen(true);
                      setIsOpen(false);
                    }}
                    disabled={isLoading}
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
