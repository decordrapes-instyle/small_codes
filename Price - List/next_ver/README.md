# Price List - Decor Drapes Instyle

A modern, responsive React application for displaying and managing product price lists with real-time Firebase integration.

## Features

### Core Features
- **Real-time Data**: Firebase Realtime Database integration for live price updates
- **Category Navigation**: Browse products organized by categories
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **PDF Export**: Generate and download professional PDF price lists
- **Deep Linking**: Share direct links to specific categories

### New Measurement Feature
- **Interactive Measurements**: Click any product to add custom measurements
- **Multiple Entries**: Add unlimited width × height measurements
- **Area Calculations**: Automatic calculation of area in square feet
- **Cost Estimates**: Real-time cost estimates based on measurements and product price
- **Share as Image**: Generate and share measurement summaries via WhatsApp, email, or other apps
- **Native Share API**: Uses device's native sharing capabilities

## Tech Stack

- **React 18** with TypeScript
- **Firebase Realtime Database** for data storage
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **html2canvas** for image generation
- **Lucide React** for icons

## Project Structure

```
src/
├── components/
│   ├── Header.tsx
│   ├── CategoriesView.tsx
│   ├── CategoryCard.tsx
│   ├── CategoryDetailsView.tsx
│   ├── ProductTable.tsx
│   ├── ProductCard.tsx
│   └── MeasurementModal.tsx
├── hooks/
│   └── useFirebaseData.ts
├── utils/
│   └── formatters.ts
├── types/
│   └── index.ts
└── config/
    └── firebase.ts
```

## Key Improvements

1. **Modern React Architecture**: Component-based structure for maintainability
2. **TypeScript**: Full type safety throughout the application
3. **Custom Hooks**: Reusable Firebase data fetching logic
4. **Optimized Performance**: Efficient re-renders with proper state management
5. **Better UX**: Click-to-measure feature with instant calculations
6. **Mobile-First**: Responsive design with touch-optimized interactions
7. **Share Integration**: Native device sharing for measurements

## Firebase Database Structure

```
pricelist/
  CategoryName/
    lastUpdated: "2024-12-05"
    products/
      product1/
        serial: 1
        product name: "Product Name"
        price: 100
        gst: 0.18
        ...

quotations/
  meta/
    termsAndConditions: []
```

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Native Web Share API support on compatible devices
