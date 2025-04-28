/**
 * CourseList Page
 * 
 * Page wrapper for the CourseListModern component.
 */

import React from 'react';
import CourseListModern from '../components/courses/CourseListModern';
import MainLayout from '../layouts/MainLayout';

const CourseList: React.FC = () => {
  return (
    <MainLayout>
      <CourseListModern />
    </MainLayout>
  );
};

export default CourseList;
