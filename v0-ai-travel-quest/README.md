# AI Travel Quest 🗺️✈️

An intelligent travel planning application powered by AI that creates personalized, immersive travel experiences. Plan your perfect journey with our Gemini AI-powered travel agent that crafts custom itineraries based on your preferences, budget, and travel style.

![AI Travel Quest](https://img.shields.io/badge/Next.js-16.1.6-black) ![React](https://img.shields.io/badge/React-19.2.4-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue) ![Supabase](https://img.shields.io/badge/Supabase-2.39.0-green) ![Gemini AI](https://img.shields.io/badge/Gemini-2.5--flash-orange)

## 🌟 Features

### 🤖 AI-Powered Trip Planning
- **Gemini AI Integration**: Uses Google's latest Gemini 2.5-flash model for intelligent trip generation
- **Personalized Itineraries**: Custom travel plans based on your budget, duration, destinations, and travel style
- **Smart Recommendations**: AI-curated attractions, activities, and accommodations tailored to your preferences

### 🎨 Advanced Theming System
- **6 Beautiful Themes**: Ocean, Sunset, Forest, Midnight, Sky, and Desert
- **Persistent Preferences**: Save theme choices to your Supabase account
- **Real-time Switching**: Instant theme changes with smooth transitions
- **Guest Mode**: Local storage fallback for anonymous users

### 🔐 Authentication & User Management
- **Supabase Auth**: Secure email/password authentication
- **User Preferences**: Persistent theme and settings storage
- **Row Level Security**: Database policies ensure data privacy

### 🗺️ Interactive Travel Experience
- **Journey Map**: Visual representation of your trip itinerary
- **Destination Details**: Comprehensive information for each stop
- **Progress Tracking**: Mark destinations as completed
- **Weather Integration**: Current weather conditions for planning

### 💰 Budget Management
- **Smart Budget Allocation**: AI distributes your budget across destinations
- **Cost Estimation**: Realistic pricing for activities and accommodations
- **Currency Support**: Flexible currency selection

## 🚀 Tech Stack

### Frontend
- **Next.js 16.1.6** - React framework with App Router
- **React 19.2.4** - UI library
- **TypeScript 5.7.3** - Type-safe JavaScript
- **Tailwind CSS 4.2.0** - Utility-first CSS framework

### UI Components
- **Radix UI** - Accessible, unstyled UI primitives
- **shadcn/ui** - Beautiful, customizable components
- **Lucide React** - Modern icon library
- **React Hook Form** - Form management with validation
- **Zod** - Schema validation

### Backend & AI
- **Google Generative AI** - Gemini 2.5-flash for trip planning
- **Supabase** - Authentication, database, and real-time features
- **Next.js API Routes** - Server-side API endpoints

### Maps & Visualization
- **@vis.gl/react-google-maps** - Interactive Google Maps integration
- **Recharts** - Data visualization components

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Supabase account and project
- Google AI API key (for Gemini)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ai-travel-agency.git
cd ai-travel-agency/v0-ai-travel-quest
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Google AI API
GEMINI_API_KEY=your_google_ai_api_key

# Optional: Google Maps API (for enhanced map features)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 4. Database Setup
Run the database setup script in your Supabase SQL editor:

```sql
-- Copy and paste the contents of scripts/setup-db.sql
```

### 5. Run the Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
v0-ai-travel-quest/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   └── generate-trip/        # AI trip generation endpoint
│   ├── auth/                     # Authentication pages
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main application page
├── components/                   # React components
│   ├── auth-modal.tsx           # Authentication modal
│   ├── theme-provider.tsx       # Theme provider wrapper
│   ├── theme-selector.tsx       # Theme selection dropdown
│   ├── user-menu.tsx            # User account menu
│   ├── travel/                  # Travel-specific components
│   │   ├── hero-section.tsx     # Landing page hero
│   │   ├── interactive-map.tsx  # Map component
│   │   ├── journey-map.tsx      # Trip itinerary map
│   │   ├── navbar.tsx           # Navigation bar
│   │   ├── travel-dashboard.tsx # Trip details dashboard
│   │   └── trip-planner-form.tsx # Trip planning form
│   └── ui/                      # Reusable UI components
├── hooks/                       # Custom React hooks
├── lib/                         # Utility libraries
│   ├── contexts/                # React contexts
│   │   ├── auth-context.tsx     # Authentication context
│   │   └── theme-context.tsx    # Theme context
│   ├── supabase/                # Supabase client and operations
│   ├── themes.ts                # Theme definitions
│   └── utils.ts                 # Utility functions
├── public/                      # Static assets
├── scripts/                     # Database setup scripts
│   ├── setup-db.js             # Database setup script
│   └── setup-db.sql            # SQL schema
└── styles/                      # Additional styles
```

## 🎯 How It Works

### Trip Planning Flow

1. **Landing Page**: User sees the hero section and starts planning
2. **Trip Form**: User inputs preferences (destination, duration, budget, style)
3. **AI Generation**: Gemini AI creates a personalized itinerary
4. **Journey Map**: Interactive map shows the trip with destinations
5. **Travel Dashboard**: Detailed information for each destination

### AI Trip Generation

The `/api/generate-trip` endpoint uses Gemini AI to:
- Analyze user preferences and constraints
- Research real-world destinations and attractions
- Generate realistic itineraries with timing and costs
- Provide weather information and hotel recommendations
- Ensure activities match the specified travel style

### Theming System

- **Theme Context**: Manages theme state and persistence
- **CSS Variables**: Dynamic color application via CSS custom properties
- **Supabase Storage**: User preferences stored in `user_preferences` table
- **Fallback**: localStorage for anonymous users

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🌍 Supported Travel Styles

- **Adventure**: Hiking, extreme sports, thrilling experiences
- **Cultural**: Museums, historical sites, local traditions
- **Relaxation**: Beaches, spas, scenic leisure activities
- **Custom**: AI adapts to any specified style

## 📊 Database Schema

### user_preferences
```sql
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id),
  theme_name VARCHAR(50) NOT NULL DEFAULT 'ocean',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google AI** for the powerful Gemini model
- **Supabase** for the excellent backend-as-a-service
- **shadcn/ui** for the beautiful component library
- **v0** for the initial project scaffolding

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers.

---

**Happy Travels!** ✈️🌍
