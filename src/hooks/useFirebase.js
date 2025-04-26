import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, query, orderByChild, equalTo } from 'firebase/database';

/**
 * Custom hook for fetching data from Firebase Realtime Database
 * 
 * @param {string} path - Database path to fetch
 * @param {Object} options - Query options
 * @param {string} options.orderByChild - Child key to order by
 * @param {any} options.equalTo - Value to filter by
 * @returns {Object} - Data, loading state, and error
 */
export function useFirebase(path, options = {}) {
  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const db = getDatabase();
    let dataRef = ref(db, path);
    
    // Apply query options if provided
    if (options.orderByChild && options.equalTo !== undefined) {
      dataRef = query(
        dataRef,
        orderByChild(options.orderByChild),
        equalTo(options.equalTo)
      );
    }
    
    // Listen for data changes
    const unsubscribe = onValue(
      dataRef,
      snapshot => {
        setData(snapshot.val());
        setIsLoaded(true);
      },
      error => {
        setError(error);
        setIsLoaded(true);
      }
    );
    
    // Cleanup function
    return () => unsubscribe();
  }, [path, options.orderByChild, options.equalTo]);
  
  return { data, isLoaded, error };
}

/**
 * Custom hook for fetching a single item by slug
 * 
 * @param {string} path - Database path to fetch
 * @param {string} slug - Slug to filter by
 * @returns {Object} - Data, loading state, and error
 */
export function useFirebaseBySlug(path, slug) {
  return useFirebase(path, {
    orderByChild: 'slug',
    equalTo: slug
  });
}

/**
 * Custom hook for fetching user data
 * 
 * @param {string} userId - User ID to fetch
 * @returns {Object} - User data, loading state, and error
 */
export function useFirebaseUser(userId) {
  return useFirebase(`users/${userId}`);
}
