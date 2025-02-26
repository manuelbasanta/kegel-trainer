# Kegel Trainer App

A mobile application designed to help users perform and track their Kegel exercises effectively. This app provides guided training sessions, progress tracking, and customizable exercise routines.

## Features

- Guided Kegel exercise sessions
- Customizable workout routines
- Progress tracking
- Exercise history
- User-friendly interface

## Tech Stack

- React Native with Expo
- TypeScript
- React Navigation
- Redux for state management

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (LTS version)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac users) or Android Studio (for Android development)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd kegel-trainer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## Project Structure

```
kegel-trainer/
├── src/
│   ├── constants/     # App constants and configuration
│   ├── navigation/    # Navigation setup and routing
│   ├── screens/       # Screen components
│   ├── store/         # Redux store setup and slices
│   └── types/         # TypeScript type definitions
├── assets/           # Images and other static assets
├── App.tsx          # Main application component
└── app.json         # Expo configuration
```