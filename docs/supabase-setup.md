# Supabase Setup for AIvibLMS

This document provides instructions for setting up Supabase for the AIvibLMS project.

## Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (sign up at [supabase.com](https://supabase.com))

## Supabase Project Setup

1. **Create a Supabase Project**:
   - Go to the [Supabase Dashboard](https://app.supabase.io/)
   - Click "New Project"
   - Enter a project name (e.g., "AIvibLMS")
   - Set a secure database password
   - Choose a region closest to your users
   - Click "Create New Project"

2. **Set Up Database Schema**:
   - Go to the SQL Editor in your Supabase project
   - Copy the contents of `supabase/migrations/20230501000000_initial_schema.sql`
   - Paste it into the SQL Editor and run the query

3. **Create Storage Buckets**:
   - Go to Storage in your Supabase project
   - Create the following buckets:
     - `course-materials`: For storing course materials
     - `profile-images`: For storing user profile images
     - `submissions`: For storing assignment submissions
     - `resources`: For storing course resources
   - Set appropriate permissions for each bucket

4. **Configure Authentication**:
   - Go to Authentication > Settings in your Supabase project
   - Enable Email/Password sign-in
   - Configure email templates for verification, password reset, etc.
   - Set up any additional authentication providers as needed

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

3. **Configure Environment Variables**:
   - Create a `.env.local` file in the project root
   - Add your Supabase configuration:
   
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   You can find these values in the Supabase Dashboard:
   - Go to Project Settings
   - Click on API
   - Copy the URL and anon/public key

## Development

1. **Start Development Server**:
   ```bash
   npm run dev
   ```

2. **Access the Application**:
   - Open http://localhost:5173 in your browser

## Database Schema

The AIvibLMS database schema includes the following tables:

- **profiles**: User profiles
- **courses**: Course information
- **modules**: Course modules
- **activities**: Learning activities
- **enrollments**: User enrollments in courses
- **assignments**: Course assignments
- **submissions**: Assignment submissions
- **grades**: Assignment grades
- **announcements**: Course announcements
- **messages**: User messages
- **notifications**: User notifications

## Storage Buckets

The AIvibLMS storage includes the following buckets:

- **course-materials**: For storing course materials
- **profile-images**: For storing user profile images
- **submissions**: For storing assignment submissions
- **resources**: For storing course resources

## Row Level Security (RLS) Policies

The database uses Row Level Security (RLS) policies to control access to data:

- Users can only view and update their own profiles
- Admins can view all profiles
- Courses are viewable by everyone
- Only instructors and admins can create and update courses
- Only admins can delete courses

## Additional Resources

- [Supabase Documentation](https://supabase.io/docs)
- [Supabase JavaScript Client](https://supabase.io/docs/reference/javascript/supabase-client)
- [Supabase Auth Helpers](https://supabase.io/docs/guides/auth)
