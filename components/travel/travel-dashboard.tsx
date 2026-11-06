"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  MapPin, 
  Plane, 
  Save, 
  Share2, 
  Sun, 
  Thermometer,
  Clock,
  TrendingUp,
  Wallet
} from "lucide-react";
import type { TripFormData } from "./trip-planner-form";
import type { Destination } from "./journey-map";

interface TravelDashboardProps {
  tripData: TripFormData;
  destinations: Destination[];
}

export function TravelDashboard({ tripData, destinations }: TravelDashboardProps) {
  const completedDestinations = destinations.filter(d => d.completed).length;
  const progress = Math.round((completedDestinations / destinations.length) * 100);
  
  const budgetSpent = destinations
    .filter(d => d.completed)
    .reduce((sum, d) => sum + d.budget, 0);
  
  const daysCompleted = destinations
    .filter(d => d.completed)
    .reduce((sum, d) => sum + d.days, 0);

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
    <div className="w-full py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Trip Dashboard</h2>
            <p className="text-muted-foreground">Track your journey progress</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save Trip
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {completedDestinations}/{destinations.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Destinations</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {currencySymbol}{budgetSpent.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">of {currencySymbol}{tripData.budget.toLocaleString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-3/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-chart-3" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {daysCompleted}/{tripData.days}
                  </div>
                  <div className="text-xs text-muted-foreground">Days</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-4/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-chart-4" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {progress}%
                  </div>
                  <div className="text-xs text-muted-foreground">Complete</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Budget Breakdown */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="text-lg text-card-foreground">Budget Breakdown</CardTitle>
              <CardDescription>Spending by destination</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {destinations.map((destination) => (
                <div key={destination.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">{destination.name}</span>
                    <span className="text-muted-foreground">{currencySymbol}{destination.budget.toLocaleString()}</span>
                  </div>
                  <Progress 
                    value={destination.completed ? 100 : 0} 
                    className="h-2"
                  />
                </div>
              ))}
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between">
                  <span className="font-medium text-foreground">Total Budget</span>
                  <span className="font-bold text-primary">{currencySymbol}{tripData.budget.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Day-wise Itinerary */}
          <Card className="bg-card/50 backdrop-blur-sm border-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg text-card-foreground">Day-wise Itinerary</CardTitle>
              <CardDescription>Your complete travel schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {destinations.map((destination, index) => {
                  const startDay = destinations
                    .slice(0, index)
                    .reduce((sum, d) => sum + d.days, 1);
                  const endDay = startDay + destination.days - 1;

                  return (
                    <div
                      key={destination.id}
                      className={`flex gap-4 p-4 rounded-xl transition-all ${
                        destination.completed
                          ? "bg-primary/10 border border-primary/20"
                          : destination.unlocked
                          ? "bg-secondary/30 border border-border"
                          : "bg-muted/30 border border-muted"
                      }`}
                    >
                      <div className="flex-shrink-0">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            destination.completed
                              ? "bg-primary text-primary-foreground"
                              : destination.unlocked
                              ? "bg-secondary text-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <Plane className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-foreground">{destination.name}</h4>
                          <span className="text-xs text-muted-foreground">
                            Day {startDay} - {endDay}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {destination.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {destination.days} days
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <Wallet className="w-3 h-3" />
                            {currencySymbol}{destination.budget.toLocaleString()}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <Thermometer className="w-3 h-3" />
                            {destination.weather}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weather Overview */}
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">Weather Overview</CardTitle>
            <CardDescription>Expected weather at each destination</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {destinations.map((destination) => (
                <div
                  key={destination.id}
                  className="text-center p-4 rounded-xl bg-secondary/30"
                >
                  <Sun className="w-8 h-8 mx-auto mb-2 text-chart-4" />
                  <div className="text-sm font-medium text-foreground">{destination.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{destination.weather}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="bg-card/50 backdrop-blur-sm border-border border-primary/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <CardTitle className="text-lg text-card-foreground">AI Recommendations</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-secondary/30">
                <h4 className="font-medium text-foreground mb-2">Best Time to Visit</h4>
                <p className="text-sm text-muted-foreground">
                  Based on your {tripData.travelStyle} style, consider visiting during the shoulder season for fewer crowds.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/30">
                <h4 className="font-medium text-foreground mb-2">Budget Tip</h4>
                <p className="text-sm text-muted-foreground">
                  You can save up to 20% by booking accommodations in advance for your {tripData.days}-day trip.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/30">
                <h4 className="font-medium text-foreground mb-2">Local Experience</h4>
                <p className="text-sm text-muted-foreground">
                  Try local street food in each destination to experience authentic {tripData.country} cuisine.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
