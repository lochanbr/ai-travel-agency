"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Car, Check, Lock, MapPin, Star, ChevronRight, Map as MapIcon } from "lucide-react";
import type { TripFormData } from "./trip-planner-form";
import { InteractiveMap } from "./interactive-map";

interface Destination {
  id: number;
  name: string;
  description: string;
  coordinates: { lat: number; lng: number };
  budget: number;
  days: number;
  attractions: { name: string; timing: string; coordinates: { lat: number; lng: number } }[];
  activities: string[];
  weather: string;
  hotels: string[];
  unlocked: boolean;
  completed: boolean;
}

interface JourneyMapProps {
  tripData: TripFormData;
  initialDestinations: Destination[];
  onSelectDestination: (destination: Destination) => void;
  selectedDestination: Destination | null;
  onBack: () => void;
}

// Removed mock data generators in favor of AI-generated initialDestinations prop

export function JourneyMap({ tripData, initialDestinations, onSelectDestination, selectedDestination, onBack }: JourneyMapProps) {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    setDestinations(initialDestinations);
  }, [initialDestinations]);

  const progress = destinations.length > 0
    ? Math.round((destinations.filter(d => d.completed).length / destinations.length) * 100)
    : 0;

  const handleDestinationClick = (destination: Destination, index: number) => {
    if (destination.unlocked) {
      onSelectDestination(destination);
    }
  };

  const completeDestination = (destinationId: number) => {
    setIsAnimating(true);
    setAnimationProgress(0);

    const animationDuration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      setAnimationProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        setDestinations(prev => prev.map((d, index) => {
          if (d.id === destinationId) {
            return { ...d, completed: true };
          }
          if (index === destinations.findIndex(dest => dest.id === destinationId) + 1) {
            return { ...d, unlocked: true };
          }
          return d;
        }));
        setCurrentDestinationIndex(prev => Math.min(prev + 1, destinations.length - 1));
      }
    };

    requestAnimationFrame(animate);
  };

  const getNodePosition = (index: number, total: number) => {
    const isOdd = index % 2 === 1;
    const yPosition = 100 + index * 140;
    const xPosition = isOdd ? 70 : 30;
    return { x: xPosition, y: yPosition };
  };

  // Helper to find the symbol for the selected currency
  const getCurrencySymbol = (currencyCode: string) => {
    const map: Record<string, string> = {
      USD: "$", EUR: "€", GBP: "£", JPY: "¥", CNY: "¥", INR: "₹", AUD: "A$",
      CAD: "C$", CHF: "Fr", KRW: "₩", SGD: "S$", HKD: "HK$", NOK: "kr",
      SEK: "kr", DKK: "kr", NZD: "NZ$", MXN: "$", BRL: "R$", ZAR: "R",
      AED: "د.إ", SAR: "﷼", THB: "฿", MYR: "RM", IDR: "Rp", PHP: "₱",
      VND: "₫", PKR: "₨", BDT: "৳", EGP: "E£", NGN: "₦", KES: "KSh",
      GHS: "₵", TZS: "TSh", RUB: "₽", TRY: "₺", PLN: "zł", CZK: "Kč",
      HUF: "Ft", RON: "lei", UAH: "₴", ILS: "₪", QAR: "ر.ق", KWD: "د.ك",
      BHD: "BD", OMR: "﷼", JOD: "JD", LKR: "₨", NPR: "₨", MMK: "K",
      KHR: "៛", TWD: "NT$", CLP: "$", COP: "$", ARS: "$", PEN: "S/.",
      UYU: "$U", BOB: "Bs.", PYG: "₲", VES: "Bs.S", DZD: "DA", MAD: "MAD",
      TND: "DT", XOF: "CFA", XAF: "CFA", ETB: "Br", UGX: "USh", RWF: "FRw",
      MZN: "MT", ZMW: "ZK", BWP: "P", MUR: "₨", NAD: "N$", ISK: "kr",
      HRK: "kn", BGN: "лв", RSD: "din", MKD: "ден", BAM: "KM", ALL: "L",
      GEL: "₾", AMD: "֏", AZN: "₼", KZT: "₸", UZS: "so'm", TMT: "T",
      TJS: "SM", KGS: "лв", MNT: "₮", AFN: "؋", IRR: "﷼", IQD: "ع.د",
      SYP: "£", LBP: "L£", YER: "﷼", FJD: "FJ$", PGK: "K", WST: "T",
      TOP: "T$"
    };
    return map[currencyCode] || "$";
  };
  const currencySymbol = getCurrencySymbol(tripData.currency || "USD");

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Your Quest Through {tripData.country}
          </h2>
          <p className="text-muted-foreground">
            {tripData.days} days · {currencySymbol}{tripData.budget.toLocaleString()} budget · {tripData.travelStyle} style
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Journey Progress</span>
            <span className="text-sm font-medium text-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-3" />
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>{destinations.filter(d => d.completed).length} completed</span>
            <span>{destinations.length} total destinations</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Journey Path */}
          <div className="lg:col-span-2">
            <Card className="bg-card/50 backdrop-blur-sm border-border p-6 relative overflow-hidden">
              <div className="relative" style={{ minHeight: `${destinations.length * 140 + 100}px` }}>
                {/* SVG Path */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ minHeight: `${destinations.length * 140 + 100}px` }}
                >
                  <defs>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="var(--primary)" />
                      <stop offset="100%" stopColor="var(--accent)" />
                    </linearGradient>
                  </defs>
                  {destinations.map((_, index) => {
                    if (index === destinations.length - 1) return null;
                    const start = getNodePosition(index, destinations.length);
                    const end = getNodePosition(index + 1, destinations.length);
                    const midY = (start.y + end.y) / 2;
                    
                    const isCompleted = destinations[index]?.completed;
                    
                    return (
                      <path
                        key={`path-${index}`}
                        d={`M ${start.x}% ${start.y} Q ${(start.x + end.x) / 2}% ${midY} ${end.x}% ${end.y}`}
                        fill="none"
                        stroke={isCompleted ? "url(#pathGradient)" : "var(--border)"}
                        strokeWidth="3"
                        strokeDasharray={isCompleted ? "none" : "8 8"}
                        className={isCompleted ? "path-animated" : ""}
                      />
                    );
                  })}
                </svg>

                {/* Animated Car */}
                {isAnimating && currentDestinationIndex < destinations.length - 1 && (
                  <div
                    className="absolute z-20 transition-all duration-100 animate-drive"
                    style={{
                      left: `calc(${
                        getNodePosition(currentDestinationIndex, destinations.length).x +
                        (getNodePosition(currentDestinationIndex + 1, destinations.length).x -
                          getNodePosition(currentDestinationIndex, destinations.length).x) *
                          animationProgress
                      }% - 16px)`,
                      top: `${
                        getNodePosition(currentDestinationIndex, destinations.length).y +
                        (getNodePosition(currentDestinationIndex + 1, destinations.length).y -
                          getNodePosition(currentDestinationIndex, destinations.length).y) *
                          animationProgress - 16
                      }px`,
                    }}
                  >
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                      <Car className="w-5 h-5 text-primary-foreground" />
                    </div>
                  </div>
                )}

                {/* Destination Nodes */}
                {destinations.map((destination, index) => {
                  const position = getNodePosition(index, destinations.length);
                  const isSelected = selectedDestination?.id === destination.id;
                  
                  return (
                    <div
                      key={destination.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                      style={{
                        left: `${position.x}%`,
                        top: `${position.y}px`,
                      }}
                    >
                      <button
                        onClick={() => handleDestinationClick(destination, index)}
                        disabled={!destination.unlocked}
                        className={`group relative flex flex-col items-center transition-all duration-300 ${
                          destination.unlocked ? "cursor-pointer" : "cursor-not-allowed"
                        }`}
                      >
                        {/* Node */}
                        <div
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                            destination.completed
                              ? "bg-primary text-primary-foreground shadow-lg"
                              : destination.unlocked
                              ? isSelected
                                ? "bg-primary/80 text-primary-foreground animate-pulse-glow"
                                : "bg-secondary text-foreground hover:bg-primary/50"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {destination.completed ? (
                            <Check className="w-8 h-8" />
                          ) : destination.unlocked ? (
                            <MapPin className="w-8 h-8" />
                          ) : (
                            <Lock className="w-6 h-6" />
                          )}
                        </div>

                        {/* Level Badge */}
                        <div
                          className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            destination.completed
                              ? "bg-primary text-primary-foreground"
                              : destination.unlocked
                              ? "bg-accent text-accent-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {index + 1}
                        </div>

                        {/* Destination Name Card */}
                        <div
                          className={`mt-3 px-4 py-2 rounded-lg transition-all ${
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary/80 text-foreground"
                          }`}
                        >
                          <span className="font-medium whitespace-nowrap">{destination.name}</span>
                          {destination.completed && (
                            <div className="flex items-center justify-center gap-0.5 mt-1">
                              {[1, 2, 3].map((star) => (
                                <Star key={star} className="w-3 h-3 fill-primary text-primary" />
                              ))}
                            </div>
                          )}
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Destination Details Panel */}
          <div className="lg:col-span-1">
            {selectedDestination ? (
              <DestinationDetailPanel
                destination={selectedDestination}
                onComplete={() => completeDestination(selectedDestination.id)}
                isAnimating={isAnimating}
                currencySymbol={currencySymbol}
              />
            ) : (
              <Card className="bg-card/50 backdrop-blur-sm border-border p-6 text-center">
                <div className="py-12">
                  <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Select a Destination</h3>
                  <p className="text-sm text-muted-foreground">
                    Click on an unlocked destination to view details and activities
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Button variant="outline" onClick={onBack}>
            Plan Another Trip
          </Button>
        </div>
      </div>
    </div>
  );
}

interface DestinationDetailPanelProps {
  destination: Destination;
  onComplete: () => void;
  isAnimating: boolean;
  currencySymbol: string;
}

function DestinationDetailPanel({ destination, onComplete, isAnimating, currencySymbol }: DestinationDetailPanelProps) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border overflow-hidden sticky top-24">
      {/* Header */}
      <div className="bg-primary/20 p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            Level {destination.id}
          </span>
          {destination.completed && (
            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
              Completed
            </span>
          )}
        </div>
        <h3 className="text-2xl font-bold text-foreground">{destination.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{destination.description}</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-secondary/30 rounded-lg p-3">
            <div className="text-xs text-muted-foreground">Budget</div>
            <div className="text-lg font-bold text-foreground">{currencySymbol}{destination.budget.toLocaleString()}</div>
          </div>
          <div className="bg-secondary/30 rounded-lg p-3">
            <div className="text-xs text-muted-foreground">Duration</div>
            <div className="text-lg font-bold text-foreground">{destination.days} days</div>
          </div>
        </div>

        {/* Weather */}
        <div className="bg-accent/10 rounded-lg p-4">
          <div className="text-xs text-muted-foreground mb-1">Weather</div>
          <div className="text-foreground font-medium">{destination.weather}</div>
        </div>

        {/* Attractions */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Top Attractions</h4>
          <div className="space-y-3">
            {destination.attractions.map((attraction, index) => (
              <div key={index} className="flex flex-col text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">{attraction.name}</span>
                </div>
                <div className="pl-6 text-xs mt-1">
                  Best timing: {attraction.timing}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <MapIcon className="w-4 h-4 text-primary" />
              Interactive Map
            </h4>
            <InteractiveMap destination={destination} />
          </div>
        </div>

        {/* Activities */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Activities</h4>
          <div className="flex flex-wrap gap-2">
            {destination.activities.map((activity, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-secondary/50 text-foreground text-xs rounded-full"
              >
                {activity}
              </span>
            ))}
          </div>
        </div>

        {/* Hotels */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Recommended Hotels</h4>
          <div className="space-y-2">
            {destination.hotels.map((hotel, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="w-4 h-4 text-primary fill-primary" />
                {hotel}
              </div>
            ))}
          </div>
        </div>

        {/* Complete Button */}
        {!destination.completed && (
          <Button
            className="w-full"
            onClick={onComplete}
            disabled={isAnimating}
          >
            {isAnimating ? "Traveling..." : "Complete & Travel Next"}
            <Car className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </Card>
  );
}

export type { Destination };
