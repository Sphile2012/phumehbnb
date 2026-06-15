# 🏠 Phumeh - Your South African Stay & Experience Platform

<div align="center">

![Phumeh Logo](https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200&auto=format&fit=crop)

**Discover extraordinary stays and experiences across South Africa**

[![Deployed on Heroku](https://img.shields.io/badge/Deployed%20on-Heroku-7928C8?style=for-the-badge&logo=heroku)](https://phumeh-stay-za.herokuapp.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/Sphile2012/phumehbnb)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)

</div>

---

## ✨ What is Phumeh?

**Phumeh** (meaning "relax" in isiZulu) is a full-featured property rental and services marketplace, inspired by Airbnb and tailored for the South African market. Whether you're looking for a luxury beachfront villa in Cape Town, a wine estate cottage in Stellenbosch, or a safari lodge near Kruger National Park, Phumeh connects travelers with unforgettable stays and local experiences.

### 🌟 Featured Properties

- 🏖️ **Beachfront Villas** - Clifton, Durban, Plettenberg Bay
- 🍷 **Wine Estate Cottages** - Stellenbosch, Franschhoek
- 🦁 **Safari Lodges** - Kruger National Park
- 🏔️ **Mountain Retreats** - Drakensberg, Hermanus
- 🌊 **Lagoon Houseboats** - Knysna
- 🏙️ **City Apartments** - Johannesburg, Cape Town V&A Waterfront
- 🏜️ **Desert Tiny Homes** - Karoo

---

## 🚀 Features

### For Guests
- 🔍 **Smart Search** - Filter by location, dates, guests, and property categories
- ❤️ **Wishlists** - Save your favorite properties for later
- 📅 **Trip Management** - View and manage your bookings
- ⭐ **Reviews & Ratings** - Read authentic guest reviews
- 📸 **Photo Galleries** - High-quality property images
- 💳 **Secure Booking** - Streamlined booking process

### For Hosts
- 📝 **Create Listings** - Easy property listing creation
- 📊 **Host Dashboard** - Manage your properties and bookings
- 💰 **Pricing Control** - Set your own rates and fees
- 📈 **Performance Insights** - Track your listing performance

### Additional Services
- 📷 **Photography Services**
- 👨‍🍳 **Private Chefs**
- 💆 **Massage & Spa**
- 🍽️ **Prepared Meals**
- 🏋️ **Personal Training**
- 💄 **Makeup & Hair**

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 18, Vite, React Router DOM |
| **UI Components** | Radix UI, shadcn/ui, Tailwind CSS |
| **State Management** | TanStack React Query |
| **Forms** | React Hook Form, Zod Validation |
| **Icons** | Lucide React |
| **Maps** | React Leaflet |
| **Charts** | Recharts |
| **Animations** | Framer Motion |
| **Payments** | Stripe (React Stripe JS) |
| **3D/Graphics** | Three.js |
| **Rich Text** | React Quill, React Markdown |
| **PDF Generation** | jsPDF, html2canvas |

---

## 🏃 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sphile2012/phumehbnb.git
   cd phumehbnb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

---

## 🌐 Deployment

### Heroku Deployment

The app is configured for easy Heroku deployment:

```bash
# Login to Heroku
heroku login

# Deploy to Heroku
git push heroku main

# Open the app
heroku open --app phumeh-stay-za
```

**Live URL:** https://phumeh-stay-za.herokuapp.com

See `HEROKU_DEPLOYMENT_GUIDE.md` for detailed deployment instructions.

---

## 📁 Project Structure

```
phumehbnb/
├── src/
│   ├── api/              # API client and mock data
│   │   ├── phumehClient.js    # Main API client
│   │   └── mockData.js        # Sample properties & data
│   ├── components/       # Reusable UI components
│   │   ├── home/         # Home page components
│   │   ├── property/     # Property detail components
│   │   └── ui/           # shadcn/ui components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities and contexts
│   │   ├── AuthContext.jsx    # Authentication context
│   │   └── query-client.js    # React Query setup
│   ├── pages/            # Application pages
│   │   ├── Home.jsx           # Main search & listings
│   │   ├── PropertyDetail.jsx # Property details
│   │   ├── CreateListing.jsx  # Host listing creation
│   │   ├── Trips.jsx          # User trips
│   │   ├── Wishlists.jsx      # Saved properties
│   │   ├── HostDashboard.jsx  # Host management
│   │   ├── Profile.jsx        # User profile
│   │   ├── Services.jsx       # Services marketplace
│   │   └── Experiences.jsx    # Experiences section
│   ├── App.jsx           # Main application
│   ├── Layout.jsx        # App layout with navigation
│   └── pages.config.js   # Page routing configuration
├── public/               # Static assets
├── server.cjs            # Express server for production
├── Procfile              # Heroku configuration
└── package.json          # Dependencies and scripts
```

---

## 🎨 Design System

Phumeh uses a modern, accessible design system built with:

- **Primary Color:** `#FF385C` (Phumeh Red)
- **Typography:** System fonts with Tailwind's default stack
- **Components:** Radix UI primitives with shadcn/ui styling
- **Responsive:** Mobile-first design with Tailwind breakpoints

---

## 📊 Key Features Implementation

### Mock Data & API
The app includes a comprehensive mock data system that simulates a real backend:
- 12+ properties across South Africa
- Reviews and ratings system
- Booking management
- User authentication (localStorage)

### Search & Filtering
- Location-based search with suggested destinations
- Category filtering (Beachfront, Countryside, Amazing Views, etc.)
- Price range filtering
- Guest count filtering

### User Experience
- Smooth page transitions with React Router
- Loading states with skeleton loaders
- Toast notifications for user feedback
- Responsive design for all screen sizes
- Mobile bottom navigation

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- Inspired by [Airbnb](https://www.airbnb.com)
- Built with love for South African travelers
- Special thanks to the open-source community

---

<div align="center">

**Made with ❤️ by Sphile2012**

[🌟 Star this repo](https://github.com/Sphile2012/phumehbnb) | [🐛 Report an issue](https://github.com/Sphile2012/phumehbnb/issues)

</div>