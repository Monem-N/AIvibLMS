/**
 * Date Utilities Tests
 */

import { formatDate, getRelativeTime, formatDateRange } from '../dateUtils';

describe('dateUtils', () => {
  describe('formatDate', () => {
    it('should format a date with default options', () => {
      const date = '2023-01-01T00:00:00.000Z';
      const result = formatDate(date);
      
      // The exact format may vary by locale, but it should contain the date
      expect(result).toContain('January');
      expect(result).toContain('1');
      expect(result).toContain('2023');
    });
    
    it('should format a date with custom options', () => {
      const date = '2023-01-01T00:00:00.000Z';
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      };
      
      const result = formatDate(date, options);
      
      // The exact format may vary by locale, but it should contain the date and time
      expect(result).toContain('Jan');
      expect(result).toContain('1');
      expect(result).toContain('2023');
      // Time part will vary by timezone, so we don't check it specifically
    });
    
    it('should return an empty string for empty input', () => {
      expect(formatDate('')).toBe('');
    });
    
    it('should handle invalid dates gracefully', () => {
      const invalidDate = 'not-a-date';
      
      // This should not throw an error
      expect(() => formatDate(invalidDate)).not.toThrow();
      
      // The result might vary, but it should be a string
      expect(typeof formatDate(invalidDate)).toBe('string');
    });
  });
  
  describe('getRelativeTime', () => {
    // Mock the current date
    const originalDate = Date;
    const mockDate = new Date('2023-01-10T00:00:00.000Z');
    
    beforeAll(() => {
      global.Date = class extends Date {
        constructor(date: any) {
          if (date) {
            return super(date);
          }
          return mockDate;
        }
        
        static now() {
          return mockDate.getTime();
        }
      } as any;
    });
    
    afterAll(() => {
      global.Date = originalDate;
    });
    
    it('should return "just now" for very recent dates', () => {
      const date = new Date(mockDate.getTime() - 30 * 1000).toISOString(); // 30 seconds ago
      expect(getRelativeTime(date)).toBe('just now');
    });
    
    it('should return minutes for dates less than an hour ago', () => {
      const date = new Date(mockDate.getTime() - 10 * 60 * 1000).toISOString(); // 10 minutes ago
      expect(getRelativeTime(date)).toBe('10 minutes ago');
      
      const dateOneMinute = new Date(mockDate.getTime() - 1 * 60 * 1000).toISOString(); // 1 minute ago
      expect(getRelativeTime(dateOneMinute)).toBe('1 minute ago');
    });
    
    it('should return hours for dates less than a day ago', () => {
      const date = new Date(mockDate.getTime() - 5 * 60 * 60 * 1000).toISOString(); // 5 hours ago
      expect(getRelativeTime(date)).toBe('5 hours ago');
      
      const dateOneHour = new Date(mockDate.getTime() - 1 * 60 * 60 * 1000).toISOString(); // 1 hour ago
      expect(getRelativeTime(dateOneHour)).toBe('1 hour ago');
    });
    
    it('should return days for dates less than a month ago', () => {
      const date = new Date(mockDate.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(); // 5 days ago
      expect(getRelativeTime(date)).toBe('5 days ago');
      
      const dateOneDay = new Date(mockDate.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(); // 1 day ago
      expect(getRelativeTime(dateOneDay)).toBe('1 day ago');
    });
    
    it('should return months for dates less than a year ago', () => {
      // Mock a date 2 months ago
      const date = '2022-11-10T00:00:00.000Z';
      expect(getRelativeTime(date)).toBe('2 months ago');
      
      // Mock a date 1 month ago
      const dateOneMonth = '2022-12-10T00:00:00.000Z';
      expect(getRelativeTime(dateOneMonth)).toBe('1 month ago');
    });
    
    it('should return years for dates more than a year ago', () => {
      // Mock a date 2 years ago
      const date = '2021-01-10T00:00:00.000Z';
      expect(getRelativeTime(date)).toBe('2 years ago');
      
      // Mock a date 1 year ago
      const dateOneYear = '2022-01-10T00:00:00.000Z';
      expect(getRelativeTime(dateOneYear)).toBe('1 year ago');
    });
    
    it('should return an empty string for empty input', () => {
      expect(getRelativeTime('')).toBe('');
    });
    
    it('should handle invalid dates gracefully', () => {
      const invalidDate = 'not-a-date';
      
      // This should not throw an error
      expect(() => getRelativeTime(invalidDate)).not.toThrow();
      
      // The result might vary, but it should be a string
      expect(typeof getRelativeTime(invalidDate)).toBe('string');
    });
  });
  
  describe('formatDateRange', () => {
    it('should format a date range with default options', () => {
      const startDate = '2023-01-01T00:00:00.000Z';
      const endDate = '2023-06-30T00:00:00.000Z';
      const result = formatDateRange(startDate, endDate);
      
      // The exact format may vary by locale, but it should contain both dates
      expect(result).toContain('Jan');
      expect(result).toContain('1');
      expect(result).toContain('2023');
      expect(result).toContain('Jun');
      expect(result).toContain('30');
      expect(result).toContain('-');
    });
    
    it('should format a date range with custom options', () => {
      const startDate = '2023-01-01T00:00:00.000Z';
      const endDate = '2023-06-30T00:00:00.000Z';
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      
      const result = formatDateRange(startDate, endDate, options);
      
      // The exact format may vary by locale, but it should contain both dates
      expect(result).toContain('January');
      expect(result).toContain('1');
      expect(result).toContain('2023');
      expect(result).toContain('June');
      expect(result).toContain('30');
      expect(result).toContain('-');
    });
    
    it('should return an empty string if either date is empty', () => {
      expect(formatDateRange('', '2023-06-30T00:00:00.000Z')).toBe('');
      expect(formatDateRange('2023-01-01T00:00:00.000Z', '')).toBe('');
      expect(formatDateRange('', '')).toBe('');
    });
    
    it('should handle invalid dates gracefully', () => {
      const invalidStartDate = 'not-a-date';
      const invalidEndDate = 'also-not-a-date';
      
      // This should not throw an error
      expect(() => formatDateRange(invalidStartDate, invalidEndDate)).not.toThrow();
      
      // The result might vary, but it should be a string
      expect(typeof formatDateRange(invalidStartDate, invalidEndDate)).toBe('string');
    });
  });
});
