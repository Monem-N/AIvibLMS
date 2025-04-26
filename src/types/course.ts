/**
 * Course types for the Hypatia LMS
 */

/**
 * Course
 */
export interface Course {
  id: string;
  title: string;
  slug?: string;
  description: string;
  status: 'draft' | 'published' | 'archived';
  createdBy?: string;
  instructor?: {
    id: string;
    name: string;
    avatar?: string;
  };
  instructors?: string[];
  startDate?: string;
  endDate?: string;
  subjects?: string[];
  modules?: Module[];
  resources?: Attachment[];
  thumbnail?: string;
  category?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  duration?: string;
  credits?: number;
  syllabus?: string;
  prerequisites?: string[];
  enrollmentType?: 'open' | 'invite' | 'approval';
  maxEnrollment?: number;
  selfPaced?: boolean;
  visibility?: 'public' | 'unlisted' | 'private';
  featured?: boolean;
  completionCriteria?: 'all-activities' | 'required-activities' | 'percentage' | 'final-exam';
  completionPercentage?: number;
  certificateEnabled?: boolean;
  language?: string;
  tags?: string[];
  discussionEnabled?: boolean;
  peerReviewEnabled?: boolean;
  progress?: number;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Module
 */
export interface Module {
  id: string;
  title: string;
  description?: string;
  courseId?: string;
  order: number;
  status?: 'locked' | 'unlocked';
  activities?: Activity[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Activity
 */
export interface Activity {
  id: string;
  title: string;
  description?: string;
  moduleId: string;
  courseId?: string;
  moduleTitle?: string;
  type: 'content' | 'assignment' | 'quiz' | 'discussion';
  content?: string;
  dueDate?: string;
  points?: number;
  order: number;
  status?: 'not-started' | 'in-progress' | 'completed';
  submissions?: Submission[];
  attachments?: Attachment[];
  grade?: Grade;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Subject
 */
export interface Subject {
  id: string;
  title: string;
  slug: string;
  description: string;
  teachers: string[];
  activities?: string[];
  color?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Enrollment
 */
export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  status: 'active' | 'completed' | 'dropped';
  enrolledAt: string;
  completedAt?: string;
  progress: number;
}

/**
 * Assignment
 */
export interface Assignment {
  id: string;
  title: string;
  description: string;
  activityId: string;
  dueDate: string;
  points: number;
  instructions: string;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Submission
 */
export interface Submission {
  id: string;
  activityId: string;
  userId?: string;
  courseId?: string;
  moduleId?: string;
  content?: string;
  attachments?: Attachment[];
  submittedAt: string;
  grade?: Grade;
  status: 'draft' | 'submitted' | 'graded' | 'returned';
  activity?: {
    id: string;
    title: string;
    description?: string;
    type: string;
    content?: string;
    points?: number;
  };
  module?: {
    id: string;
    title: string;
  };
  course?: {
    id: string;
    title: string;
  };
  student?: {
    id: string;
    name: string;
    email?: string;
    avatar?: string;
  };
}

/**
 * Attachment
 */
export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  uploadedAt: string;
}

/**
 * Grade
 */
export interface Grade {
  score: number;
  maxScore: number;
  percentage: number;
  letter?: string;
  feedback?: string;
  gradedAt?: string;
  gradedBy?: {
    id: string;
    name: string;
  };
}
