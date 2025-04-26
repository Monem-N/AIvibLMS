/**
 * Date Utility Functions
 * 
 * Utility functions for date formatting and manipulation.
 */

/**
 * Format a date string to a human-readable format
 * @param dateString Date string to format
 * @param options Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export const formatDate = (
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Format a date string to a time format
 * @param dateString Date string to format
 * @param options Intl.DateTimeFormatOptions
 * @returns Formatted time string
 */
export const formatTime = (
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }
): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', options);
  } catch (error) {
    console.error('Error formatting time:', error);
    return dateString;
  }
};

/**
 * Format a date string to a date and time format
 * @param dateString Date string to format
 * @param options Intl.DateTimeFormatOptions
 * @returns Formatted date and time string
 */
export const formatDateTime = (
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }
): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  } catch (error) {
    console.error('Error formatting date and time:', error);
    return dateString;
  }
};

/**
 * Get relative time from now
 * @param dateString Date string to format
 * @returns Relative time string
 */
export const getRelativeTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
      return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    }
    
    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
  } catch (error) {
    console.error('Error getting relative time:', error);
    return dateString;
  }
};

/**
 * Check if a date is in the past
 * @param dateString Date string to check
 * @returns True if date is in the past
 */
export const isOverdue = (dateString: string): boolean => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    return date < now;
  } catch (error) {
    console.error('Error checking if date is overdue:', error);
    return false;
  }
};

/**
 * Check if a date is today
 * @param dateString Date string to check
 * @returns True if date is today
 */
export const isToday = (dateString: string): boolean => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  } catch (error) {
    console.error('Error checking if date is today:', error);
    return false;
  }
};

/**
 * Check if a date is tomorrow
 * @param dateString Date string to check
 * @returns True if date is tomorrow
 */
export const isTomorrow = (dateString: string): boolean => {
  try {
    const date = new Date(dateString);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return (
      date.getDate() === tomorrow.getDate() &&
      date.getMonth() === tomorrow.getMonth() &&
      date.getFullYear() === tomorrow.getFullYear()
    );
  } catch (error) {
    console.error('Error checking if date is tomorrow:', error);
    return false;
  }
};

/**
 * Get the number of days between two dates
 * @param startDateString Start date string
 * @param endDateString End date string
 * @returns Number of days between dates
 */
export const getDaysBetween = (
  startDateString: string,
  endDateString: string
): number => {
  try {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    const diffInTime = endDate.getTime() - startDate.getTime();
    return Math.floor(diffInTime / (1000 * 3600 * 24));
  } catch (error) {
    console.error('Error getting days between dates:', error);
    return 0;
  }
};
