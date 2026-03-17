'use client';

import { Compass, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ThemeSelector } from '@/components/theme-selector';
import { UserMenu } from '@/components/user-menu';
import { useAuth } from '@/lib/contexts/auth-context';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const { user } = useAuth();

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
              <button
                onClick={() => setInstructionsOpen(true)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                How It Works
              </button>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <ThemeSelector />
              {user && <UserMenu />}
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
              <button
                onClick={() => {
                  setInstructionsOpen(true);
                  setIsOpen(false);
                }}
                className="block text-muted-foreground hover:text-foreground"
              >
                How It Works
              </button>
              <div className="flex gap-2 pt-2">
                <ThemeSelector />
                {user && <UserMenu />}
              </div>
            </div>
          </div>
        )}
      </nav>

      <Dialog open={instructionsOpen} onOpenChange={setInstructionsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>How It Works</DialogTitle>
            <DialogDescription>
              A quick guide to using AI Travel Quest.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">1. Enter Your Details</h4>
              <p className="text-sm text-muted-foreground">
                Start by typing your desired destination, total trip budget, duration in days, and your preferred travel style.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">2. AI Generates Your Plan</h4>
              <p className="text-sm text-muted-foreground">
                Our smart AI analyzes your inputs and generates a personalized daily itinerary, assigning an expected budget to each location.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">3. The Interactive Quest</h4>
              <p className="text-sm text-muted-foreground">
                Your journey turns into an interactive quest! Follow the map, visit top attractions at your active location, and click &apos;Complete & Travel Next&apos; to unlock the next destination on your trip.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
