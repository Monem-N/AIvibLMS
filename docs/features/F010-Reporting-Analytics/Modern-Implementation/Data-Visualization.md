# Data Visualization

The Data Visualization components provide charts, graphs, and other visual representations of analytics data in the Hypatia Modern LMS.

## Engagement Chart

```typescript
// src/components/analytics/charts/EngagementChart.tsx
import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Paper, Box, Typography, useTheme } from '@mui/material';
import { format } from 'date-fns';

interface EngagementChartProps {
  data?: Array<{
    date: string;
    timeSpent?: number;
    resourcesAccessed?: number;
    activitiesCompleted?: number;
    [key: string]: any;
  }>;
  height?: number;
}

export const EngagementChart: React.FC<EngagementChartProps> = ({ 
  data = [], 
  height = 300 
}) => {
  const theme = useTheme();
  
  if (!data || data.length === 0) {
    return (
      <Paper sx={{ p: 2, height }}>
        <Box 
          sx={{ 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <Typography variant="subtitle1" color="text.secondary">
            No data available
          </Typography>
        </Box>
      </Paper>
    );
  }
  
  // Format dates for display
  const formattedData = data.map(item => ({
    ...item,
    formattedDate: format(new Date(item.date), 'MMM d')
  }));
  
  return (
    <Paper sx={{ p: 2, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="formattedDate" 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            yAxisId="left"
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            tick={{ fontSize: 12 }}
          />
          <Tooltip />
          <Legend />
          {data[0]?.timeSpent !== undefined && (
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="timeSpent"
              name="Time Spent (min)"
              stroke={theme.palette.primary.main}
              activeDot={{ r: 8 }}
            />
          )}
          {data[0]?.resourcesAccessed !== undefined && (
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="resourcesAccessed"
              name="Resources Accessed"
              stroke={theme.palette.secondary.main}
            />
          )}
          {data[0]?.activitiesCompleted !== undefined && (
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="activitiesCompleted"
              name="Activities Completed"
              stroke={theme.palette.success.main}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};
```

## Completion Chart

```typescript
// src/components/analytics/charts/CompletionChart.tsx
import React from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Paper, Box, Typography, useTheme } from '@mui/material';

interface CompletionChartProps {
  data?: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
  height?: number;
}

export const CompletionChart: React.FC<CompletionChartProps> = ({ 
  data = [], 
  height = 300 
}) => {
  const theme = useTheme();
  
  if (!data || data.length === 0) {
    return (
      <Paper sx={{ p: 2, height }}>
        <Box 
          sx={{ 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <Typography variant="subtitle1" color="text.secondary">
            No data available
          </Typography>
        </Box>
      </Paper>
    );
  }
  
  // Default colors if not provided
  const defaultColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.error.main,
    theme.palette.warning.main,
  ];
  
  return (
    <Paper sx={{ p: 2, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color || defaultColors[index % defaultColors.length]} 
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`${value}`, 'Count']}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
};
```

## Grade Distribution

```typescript
// src/components/analytics/charts/GradeDistribution.tsx
import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Paper, Box, Typography, useTheme } from '@mui/material';

interface GradeDistributionProps {
  data?: Array<{
    range: string;
    count: number;
  }>;
  height?: number;
}

export const GradeDistribution: React.FC<GradeDistributionProps> = ({ 
  data = [], 
  height = 300 
}) => {
  const theme = useTheme();
  
  if (!data || data.length === 0) {
    return (
      <Paper sx={{ p: 2, height }}>
        <Box 
          sx={{ 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <Typography variant="subtitle1" color="text.secondary">
            No data available
          </Typography>
        </Box>
      </Paper>
    );
  }
  
  return (
    <Paper sx={{ p: 2, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="range" 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
          />
          <Tooltip />
          <Legend />
          <Bar 
            dataKey="count" 
            name="Number of Students" 
            fill={theme.palette.primary.main} 
          />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};
```

## Resource Usage

```typescript
// src/components/analytics/charts/ResourceUsage.tsx
import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Paper, Box, Typography, useTheme } from '@mui/material';

interface ResourceUsageProps {
  data?: Array<{
    name: string;
    views: number;
    timeSpent: number;
  }>;
  height?: number;
}

export const ResourceUsage: React.FC<ResourceUsageProps> = ({ 
  data = [], 
  height = 300 
}) => {
  const theme = useTheme();
  
  if (!data || data.length === 0) {
    return (
      <Paper sx={{ p: 2, height }}>
        <Box 
          sx={{ 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <Typography variant="subtitle1" color="text.secondary">
            No data available
          </Typography>
        </Box>
      </Paper>
    );
  }
  
  return (
    <Paper sx={{ p: 2, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            yAxisId="left"
            tick={{ fontSize: 12 }}
            label={{ value: 'Views', angle: -90, position: 'insideLeft' }}
          />
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            tick={{ fontSize: 12 }}
            label={{ value: 'Time (min)', angle: 90, position: 'insideRight' }}
          />
          <Tooltip />
          <Legend />
          <Bar 
            yAxisId="left"
            dataKey="views" 
            name="Views" 
            fill={theme.palette.primary.main} 
          />
          <Bar 
            yAxisId="right"
            dataKey="timeSpent" 
            name="Time Spent (min)" 
            fill={theme.palette.secondary.main} 
          />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};
```

## Heatmap Chart

```typescript
// src/components/analytics/charts/HeatmapChart.tsx
import React from 'react';
import { Paper, Box, Typography, useTheme } from '@mui/material';

interface HeatmapChartProps {
  data?: Array<{
    day: number;
    hour: number;
    value: number;
  }>;
  height?: number;
}

export const HeatmapChart: React.FC<HeatmapChartProps> = ({ 
  data = [], 
  height = 300 
}) => {
  const theme = useTheme();
  
  if (!data || data.length === 0) {
    return (
      <Paper sx={{ p: 2, height }}>
        <Box 
          sx={{ 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <Typography variant="subtitle1" color="text.secondary">
            No data available
          </Typography>
        </Box>
      </Paper>
    );
  }
  
  // Days of the week
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Hours of the day (24-hour format)
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  // Find the maximum value for color scaling
  const maxValue = Math.max(...data.map(item => item.value));
  
  // Create a lookup map for quick access to data points
  const dataMap = new Map(
    data.map(item => [`${item.day}-${item.hour}`, item.value])
  );
  
  // Function to get color based on value
  const getColor = (value: number) => {
    const intensity = value / maxValue;
    return `rgba(${theme.palette.primary.main}, ${intensity})`;
  };
  
  return (
    <Paper sx={{ p: 2, height }}>
      <Typography variant="subtitle1" gutterBottom>
        Activity by Day and Hour
      </Typography>
      
      <Box sx={{ display: 'flex', mb: 1, ml: 4 }}>
        {hours.map(hour => (
          <Box 
            key={hour} 
            sx={{ 
              width: 20, 
              textAlign: 'center', 
              fontSize: '0.75rem',
              color: 'text.secondary'
            }}
          >
            {hour}
          </Box>
        ))}
      </Box>
      
      {days.map((day, dayIndex) => (
        <Box key={day} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box 
            sx={{ 
              width: 30, 
              textAlign: 'right', 
              mr: 1,
              fontSize: '0.75rem',
              color: 'text.secondary'
            }}
          >
            {day}
          </Box>
          
          {hours.map(hour => {
            const value = dataMap.get(`${dayIndex}-${hour}`) || 0;
            return (
              <Box 
                key={hour} 
                sx={{ 
                  width: 20, 
                  height: 20, 
                  backgroundColor: getColor(value),
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    opacity: 0.8,
                  }
                }}
                title={`${day} ${hour}:00 - ${value} activities`}
              />
            );
          })}
        </Box>
      ))}
      
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box 
            sx={{ 
              width: 20, 
              height: 20, 
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              border: '1px solid',
              borderColor: 'divider',
              mr: 0.5
            }}
          />
          <Typography variant="caption" sx={{ mr: 2 }}>Low</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box 
            sx={{ 
              width: 20, 
              height: 20, 
              backgroundColor: `rgba(${theme.palette.primary.main}, 0.5)`,
              border: '1px solid',
              borderColor: 'divider',
              mr: 0.5
            }}
          />
          <Typography variant="caption" sx={{ mr: 2 }}>Medium</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box 
            sx={{ 
              width: 20, 
              height: 20, 
              backgroundColor: `rgba(${theme.palette.primary.main}, 1)`,
              border: '1px solid',
              borderColor: 'divider',
              mr: 0.5
            }}
          />
          <Typography variant="caption">High</Typography>
        </Box>
      </Box>
    </Paper>
  );
};
```

## Progress Chart

```typescript
// src/components/analytics/charts/ProgressChart.tsx
import React from 'react';
import { 
  Box, 
  Typography, 
  LinearProgress, 
  Paper, 
  Grid 
} from '@mui/material';

interface ProgressItem {
  id: string;
  name: string;
  progress: number;
  total: number;
}

interface ProgressChartProps {
  data?: ProgressItem[];
  title?: string;
  height?: number;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ 
  data = [], 
  title = 'Progress', 
  height = 300 
}) => {
  if (!data || data.length === 0) {
    return (
      <Paper sx={{ p: 2, height }}>
        <Box 
          sx={{ 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <Typography variant="subtitle1" color="text.secondary">
            No data available
          </Typography>
        </Box>
      </Paper>
    );
  }
  
  return (
    <Paper sx={{ p: 2, height, overflow: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      
      <Grid container spacing={2}>
        {data.map((item) => {
          const percentage = Math.round((item.progress / item.total) * 100);
          
          return (
            <Grid item xs={12} key={item.id}>
              <Box sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">{item.name}</Typography>
                  <Typography variant="body2">{percentage}%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={percentage} 
                  sx={{ height: 10, borderRadius: 5 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {item.progress} of {item.total} completed
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};
```

## Radar Chart

```typescript
// src/components/analytics/charts/RadarChart.tsx
import React from 'react';
import { 
  ResponsiveContainer, 
  RadarChart as RechartsRadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Paper, Box, Typography, useTheme } from '@mui/material';

interface RadarChartProps {
  data?: Array<{
    subject: string;
    value: number;
    fullMark: number;
  }>;
  height?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({ 
  data = [], 
  height = 300 
}) => {
  const theme = useTheme();
  
  if (!data || data.length === 0) {
    return (
      <Paper sx={{ p: 2, height }}>
        <Box 
          sx={{ 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <Typography variant="subtitle1" color="text.secondary">
            No data available
          </Typography>
        </Box>
      </Paper>
    );
  }
  
  return (
    <Paper sx={{ p: 2, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar 
            name="Performance" 
            dataKey="value" 
            stroke={theme.palette.primary.main} 
            fill={theme.palette.primary.main} 
            fillOpacity={0.6} 
          />
          <Tooltip />
          <Legend />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </Paper>
  );
};
```

## Data Table

```typescript
// src/components/analytics/DataTable.tsx
import React, { useState } from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TablePagination, 
  TableSortLabel, 
  Box, 
  Typography 
} from '@mui/material';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, any>[];
  title?: string;
  height?: number | string;
}

export const DataTable: React.FC<DataTableProps> = ({ 
  columns, 
  data, 
  title, 
  height = 400 
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState<string>('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  
  const sortedData = React.useMemo(() => {
    if (!orderBy) {
      return data;
    }
    
    return [...data].sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];
      
      if (aValue < bValue) {
        return order === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, order, orderBy]);
  
  if (!data || data.length === 0) {
    return (
      <Paper sx={{ p: 2, height }}>
        <Box 
          sx={{ 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <Typography variant="subtitle1" color="text.secondary">
            No data available
          </Typography>
        </Box>
      </Paper>
    );
  }
  
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {title && (
        <Typography variant="h6" sx={{ p: 2, pb: 0 }}>
          {title}
        </Typography>
      )}
      
      <TableContainer sx={{ maxHeight: height }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={() => handleSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
```
