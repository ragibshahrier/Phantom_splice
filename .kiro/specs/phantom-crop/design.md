# Phantom Crop - Design Document

## Overview

Phantom Crop is a Chrome extension built with React and TypeScript that provides AI-powered background removal. The frontend communicates with a Flask backend running rembg for image processing.

## Architecture

### Frontend (Chrome Extension)
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS (CDN)
- **Size**: 500-700px window

### Backend (Flask API)
- **Framework**: Flask 3.0
- **AI Model**: rembg 2.0.57
- **Server**: Gunicorn (production)
- **Hosting**: Railway

### Communication
- **Protocol**: HTTP/HTTPS
- **Format**: multipart/form-data (upload), image/png (response)
- **CORS**: Enabled for all origins

## Components and Interfaces

### Frontend Components

**1. App.tsx**
- Main application container
- State management (upload/processing/complete)
- Background effects (Oscilloscope, BloodRain)
- Mute button with state indication

**2. ThePortal.tsx**
- Upload interface
- Drag-and-drop handling
- File validation
- Visual feedback (pulsing, glowing)

**3. SpiritResult.tsx**
- Side-by-side image display
- Download functionality
- Discard/reset functionality
- AI analysis display

**4. Services**
- spiritService.ts: Backend communication
- soundService.ts: Audio feedback
- imageUtils.ts: Image validation and resizing

## Data Models

### ProcessedImage
```typescript
interface ProcessedImage {
  originalUrl: string;      // Blob URL of original
  processedUrl: string;     // Blob URL of processed
  spiritReading: string;    // AI analysis (optional)
}
```

### BackendConfig
```typescript
interface BackendConfig {
  useMock: boolean;         // Mock mode flag
  serverUrl: string;        // Backend endpoint
}
```

### RitualState
```typescript
enum RitualState {
  IDLE,      // Waiting for upload
  SEVERING,  // Processing
  COMPLETE,  // Done
  FAILED     // Error
}
```

## Error Handling

- File validation before upload
- Size limits (10MB max, resize to 800x800)
- Network error handling with retry
- User-friendly error messages
- Automatic reset after failure

## Testing Strategy

Manual testing of:
- Image upload (drag/drop, click)
- Background removal accuracy
- Download functionality
- UI responsiveness
- Cross-browser compatibility
