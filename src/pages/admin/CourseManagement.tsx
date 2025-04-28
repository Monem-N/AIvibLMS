/**
 * Course Management Page
 *
 * Administrative interface for managing courses in the system.
 * Allows administrators to view, create, edit, and manage courses.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  CircularProgress,
  Alert,
  Tooltip,
  useTheme
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  FilterList as FilterListIcon,
  Refresh as RefreshIcon,
  Archive as ArchiveIcon,
  Unarchive as UnarchiveIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { getFirestore, collection, query, where, orderBy, limit, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';


const CourseManagement: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();
  const firestore = getFirestore();

  useEffect(() => {
    fetchCourses();
  }, [statusFilter]);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);

    try {
      let courseQuery = collection(firestore, 'courses');
      let constraints = [];

      if (statusFilter) {
        constraints.push(where('status', '==', statusFilter));
      }

      const querySnapshot = await getDocs(
        query(
          courseQuery,
          ...constraints,
          orderBy('createdAt', 'desc'),
          limit(100)
        )
      );

      let courseData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Apply search filter client-side
      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        courseData = courseData.filter(course =>
          (course.title && course.title.toLowerCase().includes(lowerQuery)) ||
          (course.description && course.description.toLowerCase().includes(lowerQuery))
        );
      }

      setCourses(courseData);
    } catch (error: any) {
      console.error('Error fetching courses:', error);
      setError(error.message || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    fetchCourses();
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleStatusFilterChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>, course: any) => {
    setActionMenuAnchorEl(event.currentTarget);
    setSelectedCourse(course);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchorEl(null);
  };

  const handleEditCourse = () => {
    handleActionMenuClose();
    if (selectedCourse) {
      navigate(`/admin/courses/edit/${selectedCourse.id}`);
    }
  };

  const handleViewCourse = () => {
    handleActionMenuClose();
    if (selectedCourse) {
      navigate(`/courses/${selectedCourse.id}`);
    }
  };

  const handleDeleteDialogOpen = () => {
    handleActionMenuClose();
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteCourse = async () => {
    if (!selectedCourse) return;

    try {
      await deleteDoc(doc(firestore, 'courses', selectedCourse.id));
      setCourses(courses.filter(course => course.id !== selectedCourse.id));
      handleDeleteDialogClose();
    } catch (error: any) {
      console.error('Error deleting course:', error);
      setError(error.message || 'Failed to delete course');
    }
  };

  const handleArchiveDialogOpen = () => {
    handleActionMenuClose();
    setArchiveDialogOpen(true);
  };

  const handleArchiveDialogClose = () => {
    setArchiveDialogOpen(false);
  };

  const handleArchiveCourse = async () => {
    if (!selectedCourse) return;

    const newStatus = selectedCourse.status === 'archived' ? 'active' : 'archived';

    try {
      await updateDoc(doc(firestore, 'courses', selectedCourse.id), {
        status: newStatus
      });

      setCourses(courses.map(course =>
        course.id === selectedCourse.id ? { ...course, status: newStatus } : course
      ));

      handleArchiveDialogClose();
    } catch (error: any) {
      console.error('Error updating course status:', error);
      setError(error.message || 'Failed to update course status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'draft':
        return 'default';
      case 'archived':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, py: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Course Management
          </Typography>

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate('/admin/courses/new')}
          >
            Add Course
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <TextField
              placeholder="Search courses..."
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ flexGrow: 1 }}
            />

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="status-filter-label">Status</InputLabel>
              <Select
                labelId="status-filter-label"
                id="status-filter"
                value={statusFilter}
                label="Status"
                onChange={handleStatusFilterChange}
              >
                <MenuItem value="">All Statuses</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="archived">Archived</MenuItem>
              </Select>
            </FormControl>

            <Tooltip title="Refresh">
              <IconButton onClick={fetchCourses}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Paper>

        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Instructor</TableCell>
                  <TableCell>Enrollments</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : courses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                      <Typography variant="body1" color="text.secondary">
                        No courses found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  courses
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((course) => (
                      <TableRow key={course.id}>
                        <TableCell>
                          {course.title || 'Untitled Course'}
                        </TableCell>
                        <TableCell>{course.instructorName || 'No Instructor'}</TableCell>
                        <TableCell>{course.enrollmentCount || 0}</TableCell>
                        <TableCell>
                          <Chip
                            label={course.status || 'draft'}
                            color={getStatusColor(course.status || 'draft') as any}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {course.createdAt ? new Date(course.createdAt.toDate()).toLocaleDateString() : 'Unknown'}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            aria-label="course actions"
                            onClick={(event) => handleActionMenuOpen(event, course)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={courses.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>

      {/* Action Menu */}
      <Menu
        anchorEl={actionMenuAnchorEl}
        open={Boolean(actionMenuAnchorEl)}
        onClose={handleActionMenuClose}
      >
        <MenuItem onClick={handleViewCourse}>
          <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
          View
        </MenuItem>
        <MenuItem onClick={handleEditCourse}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleArchiveDialogOpen}>
          {selectedCourse?.status === 'archived' ? (
            <>
              <UnarchiveIcon fontSize="small" sx={{ mr: 1 }} />
              Unarchive
            </>
          ) : (
            <>
              <ArchiveIcon fontSize="small" sx={{ mr: 1 }} />
              Archive
            </>
          )}
        </MenuItem>
        <MenuItem onClick={handleDeleteDialogOpen} sx={{ color: 'error.main' }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
      >
        <DialogTitle>Delete Course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the course "{selectedCourse?.title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleDeleteCourse} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Archive Confirmation Dialog */}
      <Dialog
        open={archiveDialogOpen}
        onClose={handleArchiveDialogClose}
      >
        <DialogTitle>
          {selectedCourse?.status === 'archived' ? 'Unarchive Course' : 'Archive Course'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedCourse?.status === 'archived'
              ? `Are you sure you want to unarchive the course "${selectedCourse?.title}"? This will make it visible to users again.`
              : `Are you sure you want to archive the course "${selectedCourse?.title}"? This will hide it from users but preserve all data.`
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleArchiveDialogClose}>Cancel</Button>
          <Button onClick={handleArchiveCourse} color="primary" autoFocus>
            {selectedCourse?.status === 'archived' ? 'Unarchive' : 'Archive'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CourseManagement;
