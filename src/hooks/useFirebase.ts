/**
 * useFirebase Hook
 * 
 * Custom hook for Firebase operations.
 * Provides methods for fetching and updating data in Firestore.
 */

import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';
import { useNotification } from './useNotification';
import { setUserData } from '../actions/userActions';
import { Course, Activity } from '../types/course';
import { UserData } from '../types/state';

export function useFirebase() {
  // State
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Hooks
  const dispatch = useDispatch();
  const { showError } = useNotification();
  
  /**
   * Fetch user data from Firestore
   * @param userId User ID
   * @returns Promise resolving to user data
   */
  const fetchUserData = useCallback(async (userId: string): Promise<UserData | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const db = getFirestore();
      
      // Get user document
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        throw new Error('User data not found');
      }
      
      // Get user courses
      const coursesQuery = query(
        collection(db, 'enrollments'),
        where('userId', '==', userId)
      );
      const coursesSnapshot = await getDocs(coursesQuery);
      
      const courseIds = coursesSnapshot.docs.map(doc => doc.data().courseId);
      const courses: Course[] = [];
      
      // Get course details
      for (const courseId of courseIds) {
        const courseDocRef = doc(db, 'courses', courseId);
        const courseDoc = await getDoc(courseDocRef);
        
        if (courseDoc.exists()) {
          courses.push({
            id: courseDoc.id,
            ...courseDoc.data()
          } as Course);
        }
      }
      
      // Get user activities
      const activitiesQuery = query(
        collection(db, 'activities'),
        where('courseId', 'in', courseIds)
      );
      const activitiesSnapshot = await getDocs(activitiesQuery);
      
      const activities = activitiesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Activity[];
      
      // Get user progress
      const progressDocRef = doc(db, 'progress', userId);
      const progressDoc = await getDoc(progressDocRef);
      
      const progress = progressDoc.exists() 
        ? progressDoc.data() 
        : {
            overall: 0,
            courses: {},
            grades: {},
            achievements: []
          };
      
      // Get user events
      const eventsQuery = query(
        collection(db, 'events'),
        where('userId', '==', userId)
      );
      const eventsSnapshot = await getDocs(eventsQuery);
      
      const events = eventsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Get user messages
      const messagesQuery = query(
        collection(db, 'messages'),
        where('recipientId', '==', userId)
      );
      const messagesSnapshot = await getDocs(messagesQuery);
      
      const messages = messagesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Get user announcements
      const announcementsQuery = query(
        collection(db, 'announcements'),
        where('courseId', 'in', courseIds)
      );
      const announcementsSnapshot = await getDocs(announcementsQuery);
      
      const announcements = announcementsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Combine all data
      const userData: UserData = {
        courses,
        activities,
        progress,
        events,
        messages,
        announcements
      };
      
      // Update Redux state
      dispatch(setUserData(userData));
      
      setLoading(false);
      return userData;
    } catch (error: any) {
      console.error('Error fetching user data:', error);
      setError(error.message || 'Failed to fetch user data');
      showError(error.message || 'Failed to fetch user data');
      setLoading(false);
      return null;
    }
  }, [dispatch, showError]);
  
  /**
   * Update user data in Firestore
   * @param userId User ID
   * @param data Data to update
   * @returns Promise resolving when update is complete
   */
  const updateUserData = useCallback(async (
    userId: string,
    data: Partial<UserData>
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const db = getFirestore();
      const userDocRef = doc(db, 'users', userId);
      
      await updateDoc(userDocRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
      
      setLoading(false);
    } catch (error: any) {
      console.error('Error updating user data:', error);
      setError(error.message || 'Failed to update user data');
      showError(error.message || 'Failed to update user data');
      setLoading(false);
    }
  }, [showError]);
  
  return {
    loading,
    error,
    fetchUserData,
    updateUserData
  };
}
