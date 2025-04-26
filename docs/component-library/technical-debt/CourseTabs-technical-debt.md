# Technical Debt Review for CourseTabs

## Summary

| Category | Count | Severity | Overall Impact |
|----------|-------|----------|----------------|
| Legacy Patterns | 2 | Low-Medium | Low |
| Accessibility Issues | 2 | Medium-High | Medium |
| Required Future Optimizations | 3 | Low-Medium | Low |
| **Total** | **7** | **Medium** | **Medium** |

## Legacy Patterns

| ID | Pattern | Description | Impact | Remediation | Priority |
|----|---------|-------------|--------|-------------|----------|
| LP-001 | Inline SVG Icons | SVG icons are defined inline instead of using a component | Reduces reusability and increases file size | Extract SVG icons to separate components | Medium |
| LP-002 | Hardcoded Tab Structure | Tab structure is hardcoded in the component | Makes it difficult to add or remove tabs | Make tabs configurable via props | Low |

## Deprecated Props

| ID | Prop | Version Deprecated | Replacement | Migration Path | Breaking Change |
|----|------|-------------------|-------------|----------------|----------------|
| N/A | N/A | N/A | N/A | N/A | N/A |

## Required Future Optimizations

| ID | Optimization | Description | Benefit | Complexity | Priority |
|----|--------------|-------------|---------|------------|----------|
| RFO-001 | Tab Configuration | Make tabs configurable via props | More flexible tab system | Medium | Medium |
| RFO-002 | Theme Support | Add better theme support for different color schemes | Consistent appearance across themes | Low | Low |
| RFO-003 | Animation | Add smooth transitions when switching tabs | Better user experience | Low | Low |

## Accessibility Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| A-001 | Missing Keyboard Navigation | No keyboard shortcuts for navigating between tabs | Reduces efficiency for keyboard users | Add left/right arrow key navigation | Medium |
| A-002 | Incomplete ARIA Implementation | ARIA attributes are incomplete for full tab panel implementation | May cause confusion for screen reader users | Implement complete ARIA tab pattern | High |

## Technical Debt Roadmap

| ID | Issue | Priority | Estimated Effort | Target Version | Dependencies |
|----|-------|----------|------------------|----------------|--------------|
| A-002 | Incomplete ARIA Implementation | High | 1 day | 2.3.0 | None |
| LP-001 | Inline SVG Icons | Medium | 2 days | 2.4.0 | Icon component library |
| A-001 | Missing Keyboard Navigation | Medium | 1 day | 2.4.0 | None |
| RFO-001 | Tab Configuration | Medium | 2 days | 2.5.0 | None |
| RFO-003 | Animation | Low | 1 day | 2.6.0 | None |
| LP-002 | Hardcoded Tab Structure | Low | 2 days | 3.0.0 | Tab Configuration |
| RFO-002 | Theme Support | Low | 2 days | 3.0.0 | Design system updates |

## Migration Guide for Deprecated Features

```jsx
// No deprecated features in the current version
```

## Additional Notes

This technical debt analysis was automatically generated based on static code analysis and manual review. It may not capture all technical debt issues, and some identified issues may be false positives. Please review and validate each issue before addressing it.

The component was analyzed on 2023-08-18.

## Severity Definitions

| Severity | Definition |
|----------|------------|
| **High** | Critical issues that significantly impact maintainability, performance, or user experience. Should be addressed in the next release. |
| **Medium** | Important issues that have moderate impact. Should be addressed in the next few releases. |
| **Low** | Minor issues with limited impact. Can be addressed when convenient or as part of larger refactoring efforts. |

## Priority Definitions

| Priority | Definition |
|----------|------------|
| **High** | Should be addressed as soon as possible, ideally in the next sprint. |
| **Medium** | Should be addressed in the next 2-3 sprints. |
| **Low** | Can be addressed when convenient or as part of larger refactoring efforts. |

## Refactoring Examples

### Extracting SVG Icons to Components

```tsx
// Before: Inline SVG icons
const tabs = [
  {
    id: 'modules',
    label: 'Modules',
    count: moduleCount,
    icon: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="18" 
        height="18" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      </svg>
    )
  },
  // Other tabs...
];

// After: Using Icon components
import { BookIcon, FileIcon, AlertIcon, UsersIcon } from 'components/icons';

const tabs = [
  {
    id: 'modules',
    label: 'Modules',
    count: moduleCount,
    icon: <BookIcon size={18} aria-hidden="true" />
  },
  // Other tabs with imported icons...
];
```

### Making Tabs Configurable

```tsx
// Before: Hardcoded tabs
const tabs = [
  {
    id: 'modules',
    label: 'Modules',
    count: moduleCount,
    icon: (/* SVG icon */)
  },
  // Other hardcoded tabs...
];

// After: Configurable tabs via props
interface CourseTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  course: Course;
  tabs?: TabConfig[]; // Optional custom tabs
}

interface TabConfig {
  id: string;
  label: string;
  icon: React.ReactNode;
  countProperty?: keyof Course; // Property to use for count
}

const CourseTabs: React.FC<CourseTabsProps> = ({ 
  activeTab, 
  onTabChange,
  course,
  tabs: customTabs
}) => {
  // Default tabs configuration
  const defaultTabs: TabConfig[] = [
    {
      id: 'modules',
      label: 'Modules',
      icon: <BookIcon size={18} aria-hidden="true" />,
      countProperty: 'modules'
    },
    // Other default tabs...
  ];
  
  // Use custom tabs if provided, otherwise use default tabs
  const tabs = customTabs || defaultTabs;
  
  // Generate tab data with counts
  const tabsWithCounts = tabs.map(tab => ({
    ...tab,
    count: tab.countProperty 
      ? (Array.isArray(course[tab.countProperty]) 
          ? course[tab.countProperty]?.length 
          : course[tab.countProperty]) || 0
      : 0
  }));
  
  // Rest of component implementation...
};
```

### Adding Keyboard Navigation

```tsx
// Before: No keyboard navigation
return (
  <div className="course-tabs" role="tablist">
    <div className="tabs-container">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`${tab.id}-panel`}
          id={`${tab.id}-tab`}
        >
          {/* Button content */}
        </button>
      ))}
    </div>
  </div>
);

// After: With keyboard navigation
const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
  const tabsArray = tabs.map(tab => tab.id);
  
  // Handle left/right arrow keys
  if (e.key === 'ArrowRight') {
    e.preventDefault();
    const nextIndex = (currentIndex + 1) % tabsArray.length;
    onTabChange(tabsArray[nextIndex]);
    document.getElementById(`${tabsArray[nextIndex]}-tab`)?.focus();
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    const prevIndex = (currentIndex - 1 + tabsArray.length) % tabsArray.length;
    onTabChange(tabsArray[prevIndex]);
    document.getElementById(`${tabsArray[prevIndex]}-tab`)?.focus();
  }
};

return (
  <div className="course-tabs" role="tablist">
    <div className="tabs-container">
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`${tab.id}-panel`}
          id={`${tab.id}-tab`}
          tabIndex={activeTab === tab.id ? 0 : -1}
        >
          {/* Button content */}
        </button>
      ))}
    </div>
  </div>
);
```

### Implementing Complete ARIA Tab Pattern

```tsx
// Before: Incomplete ARIA implementation
return (
  <div className="course-tabs" role="tablist">
    <div className="tabs-container">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`${tab.id}-panel`}
          id={`${tab.id}-tab`}
        >
          {/* Button content */}
        </button>
      ))}
    </div>
  </div>
);

// After: Complete ARIA implementation
return (
  <div className="course-tabs-wrapper">
    <div className="course-tabs" role="tablist" aria-label="Course sections">
      <div className="tabs-container">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tab.id}-panel`}
            id={`${tab.id}-tab`}
            tabIndex={activeTab === tab.id ? 0 : -1}
          >
            {/* Button content */}
          </button>
        ))}
      </div>
    </div>
    
    {/* Tab panels with proper ARIA attributes */}
    <div 
      id="modules-panel" 
      role="tabpanel" 
      aria-labelledby="modules-tab"
      hidden={activeTab !== 'modules'}
      tabIndex={0}
    >
      {/* Modules content */}
    </div>
    
    <div 
      id="resources-panel" 
      role="tabpanel" 
      aria-labelledby="resources-tab"
      hidden={activeTab !== 'resources'}
      tabIndex={0}
    >
      {/* Resources content */}
    </div>
    
    {/* Other tab panels */}
  </div>
);
```

### Adding Tab Transitions

```tsx
// CSS for smooth transitions
.tab-content {
  transition: opacity 0.3s ease;
  opacity: 0;
  height: 0;
  overflow: hidden;
}

.tab-content.active {
  opacity: 1;
  height: auto;
  overflow: visible;
}

// React component with transitions
const [previousTab, setPreviousTab] = useState<string>(activeTab);
const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

useEffect(() => {
  if (previousTab !== activeTab) {
    setIsTransitioning(true);
    setPreviousTab(activeTab);
    
    // Reset transition state after animation completes
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300); // Match the CSS transition duration
    
    return () => clearTimeout(timer);
  }
}, [activeTab, previousTab]);

return (
  <div className="course-tabs-wrapper">
    {/* Tabs */}
    
    {/* Tab content with transitions */}
    <div className={`tab-content ${activeTab === 'modules' && !isTransitioning ? 'active' : ''}`}>
      {/* Modules content */}
    </div>
    
    <div className={`tab-content ${activeTab === 'resources' && !isTransitioning ? 'active' : ''}`}>
      {/* Resources content */}
    </div>
    
    {/* Other tab content */}
  </div>
);
```
