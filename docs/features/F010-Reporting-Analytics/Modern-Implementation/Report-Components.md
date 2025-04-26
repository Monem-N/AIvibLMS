# Report Components

The Report Components provide the user interface for generating and displaying reports in the Hypatia Modern LMS.

## Key Components

### ReportBuilder

The `ReportBuilder` component allows users to create custom reports by selecting data sources, metrics, and visualization types.

```typescript
// src/components/analytics/reports/ReportBuilder.tsx
import React from 'react';
// Component implementation...
```

Key features:
- Data source selection (courses, users, activities, etc.)
- Metric selection with drag-and-drop interface
- Filter configuration
- Visualization type selection
- Report preview
- Save and export options

### ReportViewer

The `ReportViewer` component displays generated reports with interactive visualizations and export options.

```typescript
// src/components/analytics/reports/ReportViewer.tsx
import React from 'react';
// Component implementation...
```

Key features:
- Report header with metadata
- Dynamic visualization rendering
- Filter controls
- Export options (PDF, Excel, CSV)
- Print functionality
- Sharing options

### ReportList

The `ReportList` component displays a list of saved reports with management options.

```typescript
// src/components/analytics/reports/ReportList.tsx
import React from 'react';
// Component implementation...
```

Key features:
- List of saved reports with metadata
- Search and filter functionality
- Report preview thumbnails
- Management actions (edit, delete, duplicate)
- Sorting options

### ReportScheduler

The `ReportScheduler` component allows users to schedule automated report generation and delivery.

```typescript
// src/components/analytics/reports/ReportScheduler.tsx
import React from 'react';
// Component implementation...
```

Key features:
- Schedule configuration (frequency, time)
- Recipient selection
- Format selection (PDF, Excel, CSV)
- Email template customization
- Schedule status monitoring

## Report Templates

The system includes several pre-configured report templates for common use cases:

### CourseProgressReport

Displays student progress through course materials and activities.

```typescript
// src/components/analytics/reports/templates/CourseProgressReport.tsx
import React from 'react';
// Component implementation...
```

### StudentPerformanceReport

Displays detailed performance metrics for individual students.

```typescript
// src/components/analytics/reports/templates/StudentPerformanceReport.tsx
import React from 'react';
// Component implementation...
```

### CourseEngagementReport

Displays engagement metrics for course content and activities.

```typescript
// src/components/analytics/reports/templates/CourseEngagementReport.tsx
import React from 'react';
// Component implementation...
```

### AssessmentAnalysisReport

Displays detailed analysis of assessment results and question performance.

```typescript
// src/components/analytics/reports/templates/AssessmentAnalysisReport.tsx
import React from 'react';
// Component implementation...
```

### SystemUsageReport

Displays system-wide usage metrics and trends.

```typescript
// src/components/analytics/reports/templates/SystemUsageReport.tsx
import React from 'react';
// Component implementation...
```

## Report Configuration

Reports are configured using a flexible JSON schema that defines data sources, metrics, filters, and visualizations.

```typescript
// Example report configuration
const reportConfig = {
  id: 'course-progress-report',
  name: 'Course Progress Report',
  description: 'Displays student progress through course materials',
  dataSource: 'courses',
  filters: [
    { field: 'courseId', operator: 'equals', value: 'course123' },
    { field: 'startDate', operator: 'greaterThan', value: '2023-01-01' }
  ],
  metrics: [
    { id: 'completionRate', name: 'Completion Rate', aggregation: 'average' },
    { id: 'timeSpent', name: 'Time Spent', aggregation: 'sum' }
  ],
  dimensions: [
    { id: 'student', name: 'Student' },
    { id: 'module', name: 'Module' }
  ],
  visualizations: [
    {
      type: 'table',
      config: { /* Table configuration */ }
    },
    {
      type: 'barChart',
      config: { /* Chart configuration */ }
    }
  ],
  exportOptions: ['pdf', 'excel', 'csv']
};
```
