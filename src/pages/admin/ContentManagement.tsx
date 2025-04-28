/**
 * Content Management Component
 *
 * Admin interface for managing content like pages, announcements, and other site content.
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Button,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Chip,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';
import ContentEditor from '../../components/admin/ContentEditor';
import {
  getPages,
  getAnnouncements,
  createPage,
  updatePage,
  deletePage,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  Page,
  Announcement
} from '../../services/contentService';
import { useNotificationContext } from '../../contexts/NotificationContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`content-tabpanel-${index}`}
      aria-labelledby={`content-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const ContentManagement: React.FC = () => {
  const theme = useTheme();
  const { showNotification } = useNotificationContext();

  // Tab state
  const [tabValue, setTabValue] = useState(0);

  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Content state
  const [pages, setPages] = useState<Page[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  // Editor state
  const [editorOpen, setEditorOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState<Page | Announcement | null>(null);
  const [contentType, setContentType] = useState<'page' | 'announcement'>('page');

  // Confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contentToDelete, setContentToDelete] = useState<{ id: string; title: string } | null>(null);

  // Preview dialog state
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [contentToPreview, setContentToPreview] = useState<Page | Announcement | null>(null);

  // Load content on mount and when filters change
  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);

      try {
        if (tabValue === 0) {
          // Load pages
          const loadedPages = await getPages({
            status: statusFilter !== 'all' ? statusFilter : undefined,
            search: searchTerm || undefined
          });
          setPages(loadedPages);
        } else {
          // Load announcements
          const loadedAnnouncements = await getAnnouncements({
            status: statusFilter !== 'all' ? statusFilter : undefined,
            search: searchTerm || undefined
          });
          setAnnouncements(loadedAnnouncements);
        }
      } catch (error) {
        console.error('Error loading content:', error);
        showNotification({
          message: 'Error loading content. Please try again.',
          type: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [tabValue, statusFilter, searchTerm, showNotification]);

  // Handle tab change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setPage(0);
    setStatusFilter('all');
    setSearchTerm('');
  };

  // Handle search change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  // Handle status filter change
  const handleStatusFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatusFilter(event.target.value as string);
    setPage(0);
  };

  // Handle pagination
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle content creation
  const handleCreateContent = () => {
    setContentType(tabValue === 0 ? 'page' : 'announcement');
    setCurrentContent(null);
    setEditorOpen(true);
  };

  // Handle content editing
  const handleEditContent = (content: Page | Announcement) => {
    setContentType(tabValue === 0 ? 'page' : 'announcement');
    setCurrentContent(content);
    setEditorOpen(true);
  };

  // Handle content preview
  const handlePreviewContent = (content: Page | Announcement) => {
    setContentToPreview(content);
    setPreviewDialogOpen(true);
  };

  // Handle content deletion confirmation
  const handleDeleteConfirmation = (content: Page | Announcement) => {
    setContentToDelete({
      id: content.id as string,
      title: content.title
    });
    setDeleteDialogOpen(true);
  };

  // Handle content deletion
  const handleDeleteContent = async () => {
    if (!contentToDelete) return;

    try {
      if (tabValue === 0) {
        await deletePage(contentToDelete.id);
        setPages(pages.filter(page => page.id !== contentToDelete.id));
      } else {
        await deleteAnnouncement(contentToDelete.id);
        setAnnouncements(announcements.filter(announcement => announcement.id !== contentToDelete.id));
      }

      showNotification({
        message: `${tabValue === 0 ? 'Page' : 'Announcement'} deleted successfully.`,
        type: 'success'
      });
    } catch (error) {
      console.error('Error deleting content:', error);
      showNotification({
        message: 'Error deleting content. Please try again.',
        type: 'error'
      });
    } finally {
      setDeleteDialogOpen(false);
      setContentToDelete(null);
    }
  };

  // Handle content save
  const handleSaveContent = async (content: Page | Announcement) => {
    console.log('ContentManagement: handleSaveContent called with content:', content);

    try {
      if (contentType === 'page') {
        console.log('ContentManagement: Saving page content');
        const pageContent = content as Page;
        if (pageContent.id) {
          console.log('ContentManagement: Updating existing page with ID:', pageContent.id);
          await updatePage(pageContent.id, pageContent);
        } else {
          console.log('ContentManagement: Creating new page');
          const newPageId = await createPage(pageContent);
          console.log('ContentManagement: New page created with ID:', newPageId);
        }

        // Refresh pages
        console.log('ContentManagement: Refreshing pages list');
        const loadedPages = await getPages({
          status: statusFilter !== 'all' ? statusFilter : undefined,
          search: searchTerm || undefined
        });
        console.log('ContentManagement: Loaded pages:', loadedPages);
        setPages(loadedPages);
      } else {
        console.log('ContentManagement: Saving announcement content');
        const announcementContent = content as Announcement;
        if (announcementContent.id) {
          console.log('ContentManagement: Updating existing announcement with ID:', announcementContent.id);
          await updateAnnouncement(announcementContent.id, announcementContent);
        } else {
          console.log('ContentManagement: Creating new announcement');
          const newAnnouncementId = await createAnnouncement(announcementContent);
          console.log('ContentManagement: New announcement created with ID:', newAnnouncementId);
        }

        // Refresh announcements
        console.log('ContentManagement: Refreshing announcements list');
        const loadedAnnouncements = await getAnnouncements({
          status: statusFilter !== 'all' ? statusFilter : undefined,
          search: searchTerm || undefined
        });
        console.log('ContentManagement: Loaded announcements:', loadedAnnouncements);
        setAnnouncements(loadedAnnouncements);
      }

      console.log('ContentManagement: Showing success notification');
      showNotification({
        message: `${contentType === 'page' ? 'Page' : 'Announcement'} saved successfully.`,
        type: 'success'
      });

      console.log('ContentManagement: Closing editor');
      setEditorOpen(false);
    } catch (error) {
      console.error('ContentManagement: Error saving content:', error);
      showNotification({
        message: 'Error saving content. Please try again.',
        type: 'error'
      });
    }
  };

  return (
    <>
      <Box sx={{ width: '100%', maxWidth: '100%' }}>
        {/* Page Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Content Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage website content, pages, and announcements
          </Typography>
        </Box>

        {/* Search and Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              placeholder="Search content..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ width: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="status-filter-label">Status</InputLabel>
              <Select
                labelId="status-filter-label"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as string)}
                label="Status"
              >
                <MenuItem value="all">All</MenuItem>
                {tabValue === 0 ? (
                  <>
                    <MenuItem value="published">Published</MenuItem>
                    <MenuItem value="draft">Draft</MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="scheduled">Scheduled</MenuItem>
                    <MenuItem value="expired">Expired</MenuItem>
                  </>
                )}
              </Select>
            </FormControl>
          </Box>

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreateContent}
            sx={{ textTransform: 'none' }}
          >
            Create New {tabValue === 0 ? 'Page' : 'Announcement'}
          </Button>
        </Box>

        {/* Tabs */}
        <Paper sx={{ width: '100%', mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Pages" />
            <Tab label="Announcements" />
          </Tabs>

          {/* Pages Tab */}
          <TabPanel value={tabValue} index={0}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="pages table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Slug</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Last Updated</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : pages.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No pages found. {searchTerm && 'Try a different search term.'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    pages
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row">
                            {row.title}
                          </TableCell>
                          <TableCell>{row.slug}</TableCell>
                          <TableCell>
                            <Chip
                              label={row.status}
                              color={row.status === 'published' ? 'success' : 'default'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{row.lastUpdated}</TableCell>
                          <TableCell>{row.author}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handlePreviewContent(row)}
                              title="Preview"
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleEditContent(row)}
                              title="Edit"
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDeleteConfirmation(row)}
                              title="Delete"
                            >
                              <DeleteIcon fontSize="small" />
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
              count={pages.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TabPanel>

          {/* Announcements Tab */}
          <TabPanel value={tabValue} index={1}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="announcements table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Publish Date</TableCell>
                    <TableCell>Expiry Date</TableCell>
                    <TableCell>Audience</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : announcements.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No announcements found. {searchTerm && 'Try a different search term.'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    announcements
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row">
                            {row.title}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={row.status}
                              color={
                                row.status === 'active'
                                  ? 'success'
                                  : row.status === 'scheduled'
                                    ? 'primary'
                                    : 'default'
                              }
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{typeof row.publishDate === 'string' ? row.publishDate : (row.publishDate as any)?.toDate?.().toLocaleDateString()}</TableCell>
                          <TableCell>{typeof row.expiryDate === 'string' ? row.expiryDate : (row.expiryDate as any)?.toDate?.().toLocaleDateString()}</TableCell>
                          <TableCell>{Array.isArray(row.audience) ? row.audience.join(', ') : row.audience}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handlePreviewContent(row)}
                              title="Preview"
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleEditContent(row)}
                              title="Edit"
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDeleteConfirmation(row)}
                              title="Delete"
                            >
                              <DeleteIcon fontSize="small" />
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
              count={announcements.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TabPanel>
        </Paper>
      </Box>

      {/* Content Editor Dialog */}
      <ContentEditor
        contentType={contentType}
        content={currentContent}
        onSave={handleSaveContent}
        onCancel={() => setEditorOpen(false)}
        open={editorOpen}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{contentToDelete?.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleDeleteContent} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog
        open={previewDialogOpen}
        onClose={() => setPreviewDialogOpen(false)}
        maxWidth="md"
        fullWidth
        aria-labelledby="preview-dialog-title"
      >
        <DialogTitle id="preview-dialog-title">
          {contentToPreview?.title}
        </DialogTitle>
        <DialogContent dividers>
          <div dangerouslySetInnerHTML={{ __html: contentToPreview?.content || '' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewDialogOpen(false)}>
            Close
          </Button>
          <Button
            onClick={() => {
              setPreviewDialogOpen(false);
              if (contentToPreview) {
                handleEditContent(contentToPreview);
              }
            }}
            color="primary"
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ContentManagement;
