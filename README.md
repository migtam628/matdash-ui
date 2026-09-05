# MatDash UI v0.2.0

A reusable React + TypeScript dashboard component system built with **TSX and plain CSS**. MatDash UI is designed for business dashboards, internal tools, operations consoles, admin applications, analytics products, field-service systems, and SaaS interfaces.

Version 0.2.0 expands the project from a dashboard component set into a broader application UI library with interactive selection, navigation, forms, overlays, workflows, data display, and visualization primitives.

## Highlights

- React 18+ and TypeScript
- Plain component-scoped CSS
- CSS custom-property design tokens
- Dark and light themes
- 52 component modules
- No CSS-in-JS runtime
- No charting dependency
- Custom SVG charts
- Controlled and uncontrolled component patterns
- Keyboard-aware menus and selectors
- Responsive dashboard demo
- Interactive Component Lab
- Library build with declaration output

## Run the demo

```bash
npm install
npm run dev
```

The demo contains two views:

1. **Dashboard** — a production-style business operations command center.
2. **Component Lab** — interactive examples of the expanded v0.2.0 library.

## Build

```bash
npm run typecheck
npm run build
```

Build the reusable library only:

```bash
npm run build:lib
```

Output:

```text
dist-lib/
├── matdash-ui.js
├── matdash-ui.css
└── types/
```

## Install / consume locally

```tsx
import {
  Button,
  Card,
  Combobox,
  DataTable,
  DatePicker,
  ThemeProvider,
  ToastProvider,
} from '@matdash/ui';

import '@matdash/ui/styles.css';
```

```tsx
export function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <ToastProvider>
        <Card padding="lg">MatDash application</Card>
      </ToastProvider>
    </ThemeProvider>
  );
}
```

## Component inventory

### Foundations & layout
- `ThemeProvider`
- `AppShell`
- `Sidebar`
- `Topbar`
- `PageHeader`
- `Card` / `CardHeader`
- `Toolbar`
- `Separator`

### Buttons & navigation
- `Button`
- `IconButton`
- `Tabs`
- `SegmentedControl`
- `Breadcrumbs`
- `Pagination`
- `Stepper`
- `TreeView`

### Forms & selection
- `Input`
- `SearchInput`
- `Textarea`
- `Select`
- `Combobox`
- `Checkbox`
- `RadioGroup`
- `Switch`
- `Slider`
- `FormField`
- `Calendar`
- `DatePicker`

### Overlays & actions
- `Tooltip`
- `Popover`
- `DropdownMenu`
- `ContextMenu`
- `CommandPalette`
- `Modal`
- `Drawer`
- `ToastProvider` / `useToast`

### Feedback & status
- `Badge`
- `Avatar`
- `Alert`
- `Progress`
- `RadialProgress`
- `Skeleton`
- `EmptyState`
- `Accordion`

### Data & visualization
- `DataTable`
- `StatCard`
- `ActivityFeed`
- `Sparkline`
- `LineChart`
- `AreaChart`
- `BarChart`
- `DonutChart`

## DataTable v0.2 example

```tsx
const columns = [
  {
    key: 'name',
    header: 'Project',
    sortable: true,
    sortValue: (row: Project) => row.name,
    render: (row: Project) => row.name,
  },
  {
    key: 'revenue',
    header: 'Revenue',
    sortable: true,
    sortValue: (row: Project) => row.revenue,
    render: (row: Project) => `$${row.revenue}`,
    align: 'right' as const,
  },
];

<DataTable
  columns={columns}
  rows={projects}
  getRowKey={(row) => row.id}
  selectable
  striped
  stickyHeader
/>
```

## Design tokens

The appearance is centralized in `src/lib/styles/tokens.css`.

```css
[data-md-theme="dark"] {
  --md-bg: #0b1020;
  --md-surface: #11192c;
  --md-border: #26344f;
  --md-text: #f6f8fc;
  --md-primary: #7c6cff;
  --md-success: #34d399;
  --md-radius-lg: 18px;
  --md-control-height-md: 40px;
}
```

You can override the variables from your application without modifying the components.

## Project layout

```text
src/
├── demo/
│   ├── DashboardDemo.tsx
│   ├── ComponentShowcase.tsx
│   ├── DemoApp.tsx
│   ├── demo.css
│   └── showcase.css
└── lib/
    ├── components/
    │   └── ...52 reusable component modules
    ├── styles/
    │   ├── globals.css
    │   └── tokens.css
    └── index.ts
```

## Version

Current release: **0.2.0**

See `CHANGELOG.md` for release details.
