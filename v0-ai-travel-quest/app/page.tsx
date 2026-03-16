"use client";

import { useState } from "react";
import { Navbar } from "@/components/travel/navbar";
import { HeroSection } from "@/components/travel/hero-section";
import { TripPlannerForm, type TripFormData } from "@/components/travel/trip-planner-form";
import { JourneyMap, type Destination } from "@/components/travel/journey-map";
import { TravelDashboard } from "@/components/travel/travel-dashboard";

type AppView = "landing" | "form" | "journey";

export default function TravelQuestApp() {
  const [currentView, setCurrentView] = useState<AppView>("landing");
  const [tripData, setTripData] = useState<TripFormData | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);

  const [isGenerating, setIsGenerating] = useState(false);

  const handleStartPlanning = () => {
    setCurrentView("form");
  };

  const handleFormSubmit = async (data: TripFormData) => {
    setTripData(data);
    setIsGenerating(true);
    
    try {
      const response = await fetch("/api/generate-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to generate trip plan");
      }

      const result = await response.json();
      setDestinations(result.destinations);
      setCurrentView("journey");
    } catch (error) {
      console.error(error);
      alert("There was an error generating your trip. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBackToLanding = () => {
    setCurrentView("landing");
    setTripData(null);
    setSelectedDestination(null);
    setDestinations([]);
  };

  const handleBackToForm = () => {
    setCurrentView("form");
    setSelectedDestination(null);
  };

  const handleSelectDestination = (destination: Destination) => {
    setSelectedDestination(destination);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {currentView === "landing" && (
        <HeroSection onStartPlanning={handleStartPlanning} />
      )}
      
      {currentView === "form" && (
        <>
          {isGenerating ? (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-4"></div>
              <h2 className="text-2xl font-bold text-foreground">AI is crafting your journey...</h2>
              <p className="text-muted-foreground mt-2 text-center max-w-md">Our Gemini travel agent is researching the best attractions, tailored to your {tripData?.travelStyle} style.</p>
            </div>
          ) : (
            <TripPlannerForm 
              onSubmit={handleFormSubmit} 
              onBack={handleBackToLanding}
            />
          )}
        </>
      )}
      
      {currentView === "journey" && tripData && (
        <div className="pt-16">
          <JourneyMap
            tripData={tripData}
            initialDestinations={destinations}
            onSelectDestination={handleSelectDestination}
            selectedDestination={selectedDestination}
            onBack={handleBackToForm}
          />
          <TravelDashboard
            tripData={tripData}
            destinations={destinations}
          />
        </div>
      )}
    </main>
  );
}
