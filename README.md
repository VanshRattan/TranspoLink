# TranspoLink - Transportation Platform

A modern transportation platform connecting drivers and businesses for efficient goods transport.

## Features

### Role-Based Authentication System

The platform supports two distinct user types:

#### 🚛 **Driver (Transporter)**
- **Signup**: Select "Driver" role during registration
- **Dashboard**: Access to Driver Dashboard
- **Features**: 
  - Post Trips
  - Manage Bookings
  - Track Earnings
  - View Active Shipments

#### 🏢 **Business/Client (Sender)**
- **Signup**: Select "Business Owner" role during registration
- **Dashboard**: Access to Client Dashboard
- **Features**:
  - Post Goods for Transport
  - Find Available Trucks
  - Track Shipments
  - Manage Bookings

### Authentication Flow

1. **Signup Process**:
   - User selects role (Driver or Business Owner)
   - Fills out registration form
   - Automatically redirected to appropriate dashboard based on role

2. **Login Process**:
   - User selects role during login
   - Authenticates with email/password
   - Redirected to role-specific dashboard

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
│   ├── Login.js        # Login with role selection
│   ├── Signup.js       # Signup with role selection
│   ├── DriverDashboard.js    # Driver-specific dashboard
│   └── ClientDashboard.js    # Client-specific dashboard
└── App.js              # Main app with routing
```

## Routes

- `/` - Home page
- `/login` - Login page with role selection
- `/signup` - Signup page with role selection
- `/driver-dashboard` - Driver dashboard (Post Trips, Manage Bookings)
- `/client-dashboard` - Client dashboard (Post Goods, Find Trucks)
- `/trucks` - Available trucks listing
- `/post-goods` - Post goods for transport
- `/about` - About page
- `/contact` - Contact page 