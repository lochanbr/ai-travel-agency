"use client";

import { ArrowRight, MapPin, Plane, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onStartPlanning: () => void;
}

export function HeroSection({ onStartPlanning }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        
        {/* Floating travel icons */}
        <div className="absolute top-1/4 left-1/4 text-primary/20 animate-bounce" style={{ animationDuration: "3s" }}>
          <Plane className="w-12 h-12" />
        </div>
        <div className="absolute top-1/3 right-1/4 text-accent/20 animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }}>
          <MapPin className="w-10 h-10" />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-8">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">AI-Powered Travel Planning</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight text-balance">
          Plan Your Adventure
          <br />
          <span className="text-primary">with AI</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
          Experience travel planning like never before. Our AI creates personalized journey maps, 
          turning your trip into an exciting quest with destinations to unlock and adventures to discover.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="px-8 py-6 text-lg animate-pulse-glow"
            onClick={onStartPlanning}
          >
            Start Planning
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-6 text-lg"
          >
            Watch Demo
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">50K+</div>
            <div className="text-sm text-muted-foreground">Trips Planned</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">120+</div>
            <div className="text-sm text-muted-foreground">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">4.9</div>
            <div className="text-sm text-muted-foreground">User Rating</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
