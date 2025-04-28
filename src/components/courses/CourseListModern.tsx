/**
 * CourseListModern Component
 * 
 * Displays a list of courses with filtering and sorting options.
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Pagination,
  CircularProgress,
  Alert,
  Divider
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import { useAuthContext } from '../../contexts/AuthContext';
import { useFirebase } from '../../hooks/useFirebase';

// Types
interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  instructor: string;
  category: string;
  level: string;
  duration: string;
  enrollmentCount: number;
  rating: number;
  createdAt: string;
}

const CourseListModern: React.FC = () => {
  // State
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [levelFilter, setLevelFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [page, setPage] = useState<number>(1);
  const coursesPerPage = 6;
  
  // Hooks
  const { user } = useAuthContext();
  const { firestore } = useFirebase();
  
  // Effect to fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        
        // In a real implementation, this would fetch from Firestore
        // For now, we'll use mock data
        const mockCourses: Course[] = [
          {
            id: '1',
            title: 'Introduction to Web Development',
            description: 'Learn the basics of HTML, CSS, and JavaScript to build modern websites.',
            imageUrl: 'https://source.unsplash.com/random/300x200?web',
            instructor: 'John Doe',
            category: 'Web Development',
            level: 'Beginner',
            duration: '8 weeks',
            enrollmentCount: 120,
            rating: 4.5,
            createdAt: '2023-01-15'
          },
          {
            id: '2',
            title: 'Advanced JavaScript',
            description: 'Master advanced JavaScript concepts like closures, promises, and async/await.',
            imageUrl: 'https://source.unsplash.com/random/300x200?javascript',
            instructor: 'Jane Smith',
            category: 'Web Development',
            level: 'Advanced',
            duration: '10 weeks',
            enrollmentCount: 85,
            rating: 4.8,
            createdAt: '2023-02-20'
          },
          {
            id: '3',
            title: 'React Fundamentals',
            description: 'Learn the fundamentals of React, including components, state, and props.',
            imageUrl: 'https://source.unsplash.com/random/300x200?react',
            instructor: 'Bob Johnson',
            category: 'Web Development',
            level: 'Intermediate',
            duration: '6 weeks',
            enrollmentCount: 150,
            rating: 4.7,
            createdAt: '2023-03-10'
          },
          {
            id: '4',
            title: 'Data Science with Python',
            description: 'Learn data analysis, visualization, and machine learning with Python.',
            imageUrl: 'https://source.unsplash.com/random/300x200?python',
            instructor: 'Alice Williams',
            category: 'Data Science',
            level: 'Intermediate',
            duration: '12 weeks',
            enrollmentCount: 95,
            rating: 4.6,
            createdAt: '2023-04-05'
          },
          {
            id: '5',
            title: 'Mobile App Development with Flutter',
            description: 'Build cross-platform mobile apps with Flutter and Dart.',
            imageUrl: 'https://source.unsplash.com/random/300x200?mobile',
            instructor: 'David Brown',
            category: 'Mobile Development',
            level: 'Intermediate',
            duration: '8 weeks',
            enrollmentCount: 75,
            rating: 4.4,
            createdAt: '2023-05-12'
          },
          {
            id: '6',
            title: 'DevOps Fundamentals',
            description: 'Learn the principles and practices of DevOps, including CI/CD, containers, and cloud infrastructure.',
            imageUrl: 'https://source.unsplash.com/random/300x200?devops',
            instructor: 'Sarah Miller',
            category: 'DevOps',
            level: 'Advanced',
            duration: '10 weeks',
            enrollmentCount: 60,
            rating: 4.9,
            createdAt: '2023-06-18'
          },
          {
            id: '7',
            title: 'UI/UX Design Principles',
            description: 'Learn the fundamentals of user interface and user experience design.',
            imageUrl: 'https://source.unsplash.com/random/300x200?design',
            instructor: 'Michael Davis',
            category: 'Design',
            level: 'Beginner',
            duration: '6 weeks',
            enrollmentCount: 110,
            rating: 4.3,
            createdAt: '2023-07-22'
          },
          {
            id: '8',
            title: 'Blockchain Development',
            description: 'Learn how to build decentralized applications using blockchain technology.',
            imageUrl: 'https://source.unsplash.com/random/300x200?blockchain',
            instructor: 'Emily Wilson',
            category: 'Blockchain',
            level: 'Advanced',
            duration: '12 weeks',
            enrollmentCount: 45,
            rating: 4.7,
            createdAt: '2023-08-30'
          }
        ];
        
        setCourses(mockCourses);
        setFilteredCourses(mockCourses);
        setError(null);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, []);
  
  // Effect to filter and sort courses
  useEffect(() => {
    let result = [...courses];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter) {
      result = result.filter(course => course.category === categoryFilter);
    }
    
    // Apply level filter
    if (levelFilter) {
      result = result.filter(course => course.level === levelFilter);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'popular':
        result.sort((a, b) => b.enrollmentCount - a.enrollmentCount);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    
    setFilteredCourses(result);
    setPage(1); // Reset to first page when filters change
  }, [courses, searchTerm, categoryFilter, levelFilter, sortBy]);
  
  // Get unique categories
  const categories = [...new Set(courses.map(course => course.category))];
  
  // Get unique levels
  const levels = [...new Set(courses.map(course => course.level))];
  
  // Get current page courses
  const indexOfLastCourse = page * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  
  // Change page
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo(0, 0);
  };
  
  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  
  // Handle category filter change
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategoryFilter(event.target.value);
  };
  
  // Handle level filter change
  const handleLevelChange = (event: SelectChangeEvent) => {
    setLevelFilter(event.target.value);
  };
  
  // Handle sort change
  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setLevelFilter('');
    setSortBy('newest');
  };
  
  // If loading, show loading state
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  
  // If error, show error state
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Courses
      </Typography>
      
      <Typography variant="body1" paragraph>
        Browse our collection of courses to enhance your skills and knowledge.
      </Typography>
      
      {/* Filters */}
      <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FilterListIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Filters</Typography>
        </Box>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search Courses"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                value={categoryFilter}
                onChange={handleCategoryChange}
                label="Category"
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map(category => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="level-label">Level</InputLabel>
              <Select
                labelId="level-label"
                value={levelFilter}
                onChange={handleLevelChange}
                label="Level"
              >
                <MenuItem value="">All Levels</MenuItem>
                {levels.map(level => (
                  <MenuItem key={level} value={level}>{level}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="sort-label">Sort By</InputLabel>
              <Select
                labelId="sort-label"
                value={sortBy}
                onChange={handleSortChange}
                label="Sort By"
                startAdornment={<SortIcon sx={{ color: 'action.active', mr: 1 }} />}
              >
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="oldest">Oldest</MenuItem>
                <MenuItem value="popular">Most Popular</MenuItem>
                <MenuItem value="rating">Highest Rated</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                {(searchTerm || categoryFilter || levelFilter || sortBy !== 'newest') && (
                  <Button 
                    variant="outlined" 
                    size="small" 
                    onClick={clearFilters}
                    sx={{ mr: 1 }}
                  >
                    Clear Filters
                  </Button>
                )}
                
                <Typography variant="body2" component="span" color="text.secondary">
                  {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
                </Typography>
              </Box>
              
              {user?.role === 'admin' || user?.role === 'instructor' ? (
                <Button 
                  variant="contained" 
                  color="primary"
                  component={Link}
                  to="/courses/create"
                >
                  Create Course
                </Button>
              ) : null}
            </Box>
          </Grid>
        </Grid>
      </Box>
      
      {/* Active filters */}
      {(searchTerm || categoryFilter || levelFilter || sortBy !== 'newest') && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          {searchTerm && (
            <Chip 
              label={`Search: ${searchTerm}`} 
              onDelete={() => setSearchTerm('')}
              color="primary"
              variant="outlined"
            />
          )}
          
          {categoryFilter && (
            <Chip 
              label={`Category: ${categoryFilter}`} 
              onDelete={() => setCategoryFilter('')}
              color="primary"
              variant="outlined"
            />
          )}
          
          {levelFilter && (
            <Chip 
              label={`Level: ${levelFilter}`} 
              onDelete={() => setLevelFilter('')}
              color="primary"
              variant="outlined"
            />
          )}
          
          {sortBy !== 'newest' && (
            <Chip 
              label={`Sort: ${sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}`} 
              onDelete={() => setSortBy('newest')}
              color="primary"
              variant="outlined"
            />
          )}
        </Box>
      )}
      
      {/* Course list */}
      {filteredCourses.length === 0 ? (
        <Alert severity="info" sx={{ mb: 4 }}>
          No courses found matching your criteria. Try adjusting your filters.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {currentCourses.map(course => (
            <Grid item key={course.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={course.imageUrl}
                  alt={course.title}
                />
                
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {course.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PersonIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {course.instructor}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <SchoolIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {course.level}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {course.duration}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {course.description.length > 120
                      ? `${course.description.substring(0, 120)}...`
                      : course.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip 
                      label={course.category} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                    />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        {course.rating} ★
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
                
                <Divider />
                
                <CardActions>
                  <Button 
                    size="small" 
                    component={Link} 
                    to={`/courses/${course.id}`}
                  >
                    View Details
                  </Button>
                  
                  <Button 
                    size="small" 
                    variant="contained" 
                    color="primary"
                    component={Link}
                    to={`/courses/${course.id}/enroll`}
                  >
                    Enroll
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      {/* Pagination */}
      {filteredCourses.length > coursesPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={Math.ceil(filteredCourses.length / coursesPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};

export default CourseListModern;
