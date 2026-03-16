"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Compass, Wallet, Calendar, Heart, MapPin, Sparkles, AlertCircle } from "lucide-react";

export interface TripFormData {
  country: string;
  budget: number;
  currency: string;
  days: number;
  travelStyle: string;
  destinations: number;
}

interface TripPlannerFormProps {
  onSubmit: (data: TripFormData) => void;
  onBack: () => void;
}

const countries = [
  "India", "Japan", "Thailand", "Italy", "France", "Spain",
  "Australia", "United States", "Brazil", "South Africa",
  "United Kingdom", "Germany", "Canada", "Mexico", "Vietnam",
  "Indonesia", "Turkey", "Greece", "Egypt", "Morocco",
  "New Zealand", "Argentina", "Peru", "Colombia", "China",
  "South Korea", "Malaysia", "Philippines", "Switzerland", "Portugal"
];

const currencies = [
  { code: "USD", symbol: "$",  name: "US Dollar" },
  { code: "EUR", symbol: "€",  name: "Euro" },
  { code: "GBP", symbol: "£",  name: "British Pound" },
  { code: "JPY", symbol: "¥",  name: "Japanese Yen" },
  { code: "CNY", symbol: "¥",  name: "Chinese Yuan" },
  { code: "INR", symbol: "₹",  name: "Indian Rupee" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "CHF", symbol: "Fr", name: "Swiss Franc" },
  { code: "KRW", symbol: "₩",  name: "South Korean Won" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
  { code: "HKD", symbol: "HK$",name: "Hong Kong Dollar" },
  { code: "NOK", symbol: "kr", name: "Norwegian Krone" },
  { code: "SEK", symbol: "kr", name: "Swedish Krona" },
  { code: "DKK", symbol: "kr", name: "Danish Krone" },
  { code: "NZD", symbol: "NZ$",name: "New Zealand Dollar" },
  { code: "MXN", symbol: "$",  name: "Mexican Peso" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real" },
  { code: "ZAR", symbol: "R",  name: "South African Rand" },
  { code: "AED", symbol: "د.إ",name: "UAE Dirham" },
  { code: "SAR", symbol: "﷼",  name: "Saudi Riyal" },
  { code: "THB", symbol: "฿",  name: "Thai Baht" },
  { code: "MYR", symbol: "RM", name: "Malaysian Ringgit" },
  { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah" },
  { code: "PHP", symbol: "₱",  name: "Philippine Peso" },
  { code: "VND", symbol: "₫",  name: "Vietnamese Dong" },
  { code: "PKR", symbol: "₨",  name: "Pakistani Rupee" },
  { code: "BDT", symbol: "৳",  name: "Bangladeshi Taka" },
  { code: "EGP", symbol: "E£", name: "Egyptian Pound" },
  { code: "NGN", symbol: "₦",  name: "Nigerian Naira" },
  { code: "KES", symbol: "KSh",name: "Kenyan Shilling" },
  { code: "GHS", symbol: "₵",  name: "Ghanaian Cedi" },
  { code: "TZS", symbol: "TSh",name: "Tanzanian Shilling" },
  { code: "RUB", symbol: "₽",  name: "Russian Ruble" },
  { code: "TRY", symbol: "₺",  name: "Turkish Lira" },
  { code: "PLN", symbol: "zł", name: "Polish Zloty" },
  { code: "CZK", symbol: "Kč", name: "Czech Koruna" },
  { code: "HUF", symbol: "Ft", name: "Hungarian Forint" },
  { code: "RON", symbol: "lei",name: "Romanian Leu" },
  { code: "UAH", symbol: "₴",  name: "Ukrainian Hryvnia" },
  { code: "ILS", symbol: "₪",  name: "Israeli Shekel" },
  { code: "QAR", symbol: "ر.ق",name: "Qatari Riyal" },
  { code: "KWD", symbol: "د.ك",name: "Kuwaiti Dinar" },
  { code: "BHD", symbol: "BD", name: "Bahraini Dinar" },
  { code: "OMR", symbol: "﷼",  name: "Omani Rial" },
  { code: "JOD", symbol: "JD", name: "Jordanian Dinar" },
  { code: "LKR", symbol: "₨",  name: "Sri Lankan Rupee" },
  { code: "NPR", symbol: "₨",  name: "Nepalese Rupee" },
  { code: "MMK", symbol: "K",  name: "Myanmar Kyat" },
  { code: "KHR", symbol: "៛",  name: "Cambodian Riel" },
  { code: "TWD", symbol: "NT$",name: "Taiwan Dollar" },
  { code: "CLP", symbol: "$",  name: "Chilean Peso" },
  { code: "COP", symbol: "$",  name: "Colombian Peso" },
  { code: "ARS", symbol: "$",  name: "Argentine Peso" },
  { code: "PEN", symbol: "S/.",name: "Peruvian Sol" },
  { code: "UYU", symbol: "$U", name: "Uruguayan Peso" },
  { code: "BOB", symbol: "Bs.",name: "Bolivian Boliviano" },
  { code: "PYG", symbol: "₲",  name: "Paraguayan Guaraní" },
  { code: "VES", symbol: "Bs.S",name: "Venezuelan Bolívar" },
  { code: "DZD", symbol: "DA", name: "Algerian Dinar" },
  { code: "MAD", symbol: "MAD",name: "Moroccan Dirham" },
  { code: "TND", symbol: "DT", name: "Tunisian Dinar" },
  { code: "XOF", symbol: "CFA",name: "West African CFA Franc" },
  { code: "XAF", symbol: "CFA",name: "Central African CFA Franc" },
  { code: "ETB", symbol: "Br", name: "Ethiopian Birr" },
  { code: "UGX", symbol: "USh",name: "Ugandan Shilling" },
  { code: "RWF", symbol: "FRw",name: "Rwandan Franc" },
  { code: "MZN", symbol: "MT", name: "Mozambican Metical" },
  { code: "ZMW", symbol: "ZK", name: "Zambian Kwacha" },
  { code: "BWP", symbol: "P",  name: "Botswana Pula" },
  { code: "MUR", symbol: "₨",  name: "Mauritian Rupee" },
  { code: "NAD", symbol: "N$", name: "Namibian Dollar" },
  { code: "ISK", symbol: "kr", name: "Icelandic Króna" },
  { code: "HRK", symbol: "kn", name: "Croatian Kuna" },
  { code: "BGN", symbol: "лв", name: "Bulgarian Lev" },
  { code: "RSD", symbol: "din",name: "Serbian Dinar" },
  { code: "MKD", symbol: "ден",name: "Macedonian Denar" },
  { code: "BAM", symbol: "KM", name: "Bosnia-Herzegovina Mark" },
  { code: "ALL", symbol: "L",  name: "Albanian Lek" },
  { code: "GEL", symbol: "₾",  name: "Georgian Lari" },
  { code: "AMD", symbol: "֏",  name: "Armenian Dram" },
  { code: "AZN", symbol: "₼",  name: "Azerbaijani Manat" },
  { code: "KZT", symbol: "₸",  name: "Kazakhstani Tenge" },
  { code: "UZS", symbol: "so'm",name: "Uzbekistani Som" },
  { code: "TMT", symbol: "T",  name: "Turkmenistani Manat" },
  { code: "TJS", symbol: "SM", name: "Tajikistani Somoni" },
  { code: "KGS", symbol: "лв", name: "Kyrgystani Som" },
  { code: "MNT", symbol: "₮",  name: "Mongolian Tögrög" },
  { code: "AFN", symbol: "؋",  name: "Afghan Afghani" },
  { code: "IRR", symbol: "﷼",  name: "Iranian Rial" },
  { code: "IQD", symbol: "ع.د",name: "Iraqi Dinar" },
  { code: "SYP", symbol: "£",  name: "Syrian Pound" },
  { code: "LBP", symbol: "L£", name: "Lebanese Pound" },
  { code: "YER", symbol: "﷼",  name: "Yemeni Rial" },
  { code: "FJD", symbol: "FJ$",name: "Fijian Dollar" },
  { code: "PGK", symbol: "K",  name: "Papua New Guinean Kina" },
  { code: "WST", symbol: "T",  name: "Samoan Tala" },
  { code: "TOP", symbol: "T$", name: "Tongan Paʻanga" },
];

const travelStyles = [
  { value: "adventure", label: "Adventure", icon: Compass, description: "Hiking, trekking, extreme sports", multiplier: 0.8 },
  { value: "cultural", label: "Cultural", icon: Heart, description: "Museums, history, local experiences", multiplier: 1.0 },
  { value: "relaxation", label: "Relaxation", icon: MapPin, description: "Beaches, spas, leisure", multiplier: 1.5 },
];

// Rough daily cost basis in USD per region/country
const countryCostTiers: Record<string, number> = {
  India: 40, Vietnam: 40, Indonesia: 45, Philippines: 45, Egypt: 40, Morocco: 50,
  Thailand: 50, Malaysia: 55, Peru: 60, Colombia: 55, Argentina: 60, Turkey: 70,
  SouthAfrica: 80, Brazil: 80, China: 80, Mexico: 80,
  Japan: 120, SouthKorea: 120, Spain: 120, Portugal: 110, Greece: 110,
  France: 150, Italy: 150, Germany: 140, UnitedKingdom: 160,
  Australia: 160, NewZealand: 160, UnitedStates: 180, Canada: 160, Switzerland: 220
};

export function TripPlannerForm({ onSubmit, onBack }: TripPlannerFormProps) {
  const [formData, setFormData] = useState<TripFormData>({
    country: "",
    budget: 2000,
    currency: "USD",
    days: 7,
    travelStyle: "",
    destinations: 4,
  });

  const selectedCurrency = currencies.find((c) => c.code === formData.currency) ?? currencies[0];
  const selectedStyle = travelStyles.find((s) => s.value === formData.travelStyle);

  // Exchange rate mock for budget warning calculation
  const fxRates: Record<string, number> = {
    USD: 1, EUR: 0.9, GBP: 0.8, JPY: 150, INR: 83, AUD: 1.5, CAD: 1.35, CHF: 0.9,
    CNY: 7.2, KRW: 1300, SGD: 1.35, HKD: 7.8, NZD: 1.6, MXN: 17, BRL: 5, ZAR: 19,
    THB: 35, MYR: 4.7, IDR: 15500, PHP: 56, VND: 24500, EGP: 31, TRY: 30
  };

  let minSuggestedBudget = 0;
  if (formData.country && selectedStyle) {
    const baseUsd = countryCostTiers[formData.country.replace(/\s+/g, '')] || 100;
    const styleMult = selectedStyle.multiplier || 1.0;
    const rate = fxRates[selectedCurrency.code] || 1.0; // fallback to 1:1 if not mapped

    // Minimum budget = (Daily Base USD * Style Multiplier) * Days * Exchange Rate
    minSuggestedBudget = Math.floor((baseUsd * styleMult) * formData.days * rate);
  }
  
  const isBudgetLow = formData.budget > 0 && minSuggestedBudget > 0 && formData.budget < minSuggestedBudget;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.country && formData.travelStyle && !isBudgetLow) {
      onSubmit(formData);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4">
      <Card className="w-full max-w-2xl bg-card/50 backdrop-blur-sm border-border">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/20 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-3xl text-card-foreground">Design Your Quest</CardTitle>
          <CardDescription className="text-muted-foreground">
            Tell us about your dream adventure and we will create a personalized journey map
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Country Selection */}
            <div className="space-y-3">
              <Label className="text-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Destination Country
              </Label>
              <Select
                value={formData.country}
                onValueChange={(value) => setFormData({ ...formData, country: value })}
              >
                <SelectTrigger className="bg-input border-border text-foreground">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Budget */}
            <div className="space-y-3">
              <Label className="text-foreground flex items-center gap-2">
                <Wallet className="w-4 h-4 text-primary" />
                Budget
              </Label>
              <div className="flex gap-2">
                {/* Currency selector */}
                <Select
                  value={formData.currency}
                  onValueChange={(value) => setFormData({ ...formData, currency: value })}
                >
                  <SelectTrigger className="w-40 bg-input border-border text-foreground shrink-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-64 overflow-y-auto">
                    {currencies.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.symbol} {c.code} — {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* Amount input */}
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                    {selectedCurrency.symbol}
                  </span>
                  <Input
                    type="number"
                    min={0}
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: Math.max(0, Number(e.target.value)) })
                    }
                    className="pl-8 bg-input border-border text-foreground"
                    placeholder="Enter amount"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center px-1">
                <p className="text-xs text-muted-foreground">
                  Your budget in {selectedCurrency.name} ({selectedCurrency.code})
                </p>
                {minSuggestedBudget > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Avg. required: {selectedCurrency.symbol}{minSuggestedBudget.toLocaleString()}
                  </p>
                )}
              </div>
              {isBudgetLow && (
                <div className="flex items-start gap-2 p-3 mt-2 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg text-sm transition-all animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <p>
                    Your budget is too low for a {formData.days}-day {selectedStyle?.label.toLowerCase()} trip to {formData.country}. You must increase it to at least <strong>{selectedCurrency.symbol}{minSuggestedBudget.toLocaleString()}</strong> to generate a trip plan.
                  </p>
                </div>
              )}
            </div>

            {/* Days */}
            <div className="space-y-3">
              <Label className="text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Duration: {formData.days} days
              </Label>
              <Slider
                value={[formData.days]}
                onValueChange={(value) => setFormData({ ...formData, days: value[0] })}
                min={3}
                max={30}
                step={1}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>3 days</span>
                <span>30 days</span>
              </div>
            </div>

            {/* Travel Style */}
            <div className="space-y-3">
              <Label className="text-foreground">Travel Style</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {travelStyles.map((style) => {
                  const Icon = style.icon;
                  return (
                    <button
                      key={style.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, travelStyle: style.value })}
                      className={`p-4 rounded-xl border transition-all text-left ${
                        formData.travelStyle === style.value
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-secondary/30 text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      <Icon className={`w-6 h-6 mb-2 ${formData.travelStyle === style.value ? "text-primary" : ""}`} />
                      <div className="font-medium text-foreground">{style.label}</div>
                      <div className="text-xs mt-1 text-muted-foreground">{style.description}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Number of Destinations */}
            <div className="space-y-3">
              <Label className="text-foreground flex items-center gap-2">
                <Compass className="w-4 h-4 text-primary" />
                Number of Destinations: {formData.destinations}
              </Label>
              <div className="flex gap-2">
                {[3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setFormData({ ...formData, destinations: num })}
                    className={`flex-1 py-3 rounded-lg border transition-all ${
                      formData.destinations === num
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-secondary/30 text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={!formData.country || !formData.travelStyle || isBudgetLow}
              >
                Generate Journey Map
                <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
