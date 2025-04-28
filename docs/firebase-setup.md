# Firebase Setup for AIvibLMS

This document provides instructions for setting up Firebase for the AIvibLMS project.

## Prerequisites

- Node.js 18+
- npm or yarn
- Firebase CLI (`npm install -g firebase-tools`)

## Firebase Project Setup

1. **Create a Firebase Project**:
   - Go to the [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project"
   - Enter a project name (e.g., "AIvibLMS")
   - Follow the prompts to complete project creation

2. **Enable Firebase Services**:
   - **Authentication**: Enable Email/Password authentication
   - **Firestore**: Create a Firestore database in production mode
   - **Storage**: Set up Firebase Storage
   - **Realtime Database**: Create a Realtime Database
   - **Functions**: Enable Firebase Functions

## Local Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/AIvibLMS.git
   cd AIvibLMS
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Initialize Firebase**:
   ```bash
   firebase login
   firebase init
   ```
   
   Select the following features:
   - Firestore
   - Functions
   - Hosting
   - Storage
   - Emulators

4. **Configure Environment Variables**:
   - Create a `.env.local` file in the project root
   - Add your Firebase configuration:
   
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com
   ```

   You can find these values in the Firebase Console:
   - Go to Project Settings
   - Scroll down to "Your apps"
   - Select your web app (or create one if needed)
   - Copy the configuration values

## Development

1. **Start Firebase Emulators**:
   ```bash
   firebase emulators:start
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Access the Application**:
   - Open http://localhost:5173 in your browser

## Deployment

1. **Build the Application**:
   ```bash
   npm run build
   ```

2. **Deploy to Firebase**:
   ```bash
   firebase deploy
   ```

## Firebase Security Rules

The project includes security rules for:

- **Firestore**: `firestore.rules`
- **Storage**: `storage.rules`
- **Realtime Database**: `database.rules.json`

These rules implement role-based access control based on user roles:
- Admin (level 5)
- Instructor (level 4)
- Assistant (level 3)
- Moderator (level 2)
- Student (level 1)

## Firebase Functions

The project includes the following Firebase Functions:

- **setUserClaims**: Sets custom claims on user creation/update based on the user's level

## Troubleshooting

- **Authentication Issues**: Make sure you've enabled Email/Password authentication in the Firebase Console
- **Emulator Connection Issues**: Check that the emulator ports match those in `FirebaseInitializer.tsx`
- **Deployment Issues**: Ensure you have the correct permissions for the Firebase project

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Firebase Hooks](https://github.com/CSFrequency/react-firebase-hooks)
