# Changelog

## 0.2.0 — 2026-08-30

### Added
- `Accordion` disclosure primitive with single and multi-open modes.
- `Popover` with controlled/uncontrolled state, placement options, outside-click dismissal, and Escape handling.
- `Calendar` month view with date bounds, today state, and selectable dates.
- `DatePicker` built by composing `Popover` + `Calendar`.
- `Combobox` with search, keyboard navigation, descriptions, disabled items, and clearable selection.
- `CommandPalette` with grouped commands, search, keyboard navigation, shortcuts, modal overlay, and Escape dismissal.
- `ContextMenu` with pointer positioning, separators, shortcuts, danger states, and disabled items.
- `TreeView` with expandable nested nodes, selection, metadata, and controlled expansion support.
- `FormField` for reusable label, help text, required, and validation composition.
- `Textarea` with hint/error handling and resize control.
- `RadioGroup` with descriptions and horizontal/vertical layouts.
- `Slider` with controlled/uncontrolled state and formatted live values.
- `Stepper` with horizontal/vertical workflow layouts and completed-step navigation.
- `Toolbar` and `Separator` layout primitives.
- `AreaChart` multi-series SVG visualization with fills, labels, grids, and legend.
- `RadialProgress` with five semantic tones and configurable geometry.
- New `Component Lab` demo containing interactive examples for the 0.2.0 primitives.
- Demo view switcher between the production-style dashboard and component showcase.
- New typography, overlay, command-palette, and tooltip design tokens.

### Enhanced
- `DataTable` now supports sortable columns, controlled/uncontrolled sorting, row selection, select-all, striped rows, sticky headers, and accessible captions while preserving the 0.1.x API.
- Project portfolio demo now demonstrates sorting, row selection, striped rows, and sticky table headers.
- Package description and metadata updated for the expanded design-system scope.

### Compatibility
- Existing 0.1.x exports remain available.
- New `DataTable` capabilities are additive; prior column definitions continue to work.
- The library still uses React + TypeScript + plain CSS with no CSS-in-JS runtime or chart dependency.

## 0.1.2 — 2026-08-30

### Added
- `Tooltip` with four placements and keyboard-focus support.
- `Breadcrumbs` for application navigation context.
- `Checkbox` with label, description, disabled, and indeterminate states.
- `SegmentedControl` for compact view/range switching.
- `Pagination` with bounded pages, ellipsis, and accessible previous/next controls.
- `DropdownMenu` with icons, descriptions, separators, danger/disabled states, outside-click closing, and Escape support.
- `ToastProvider` + `useToast()` with success/info/warning/danger notifications.
- New focus/control/z-index design tokens.
- Demo coverage for the new controls and feedback components.

### Changed
- Package version bumped to `0.1.2`.
- Package is now publishable (`private: false`) and declares CSS side effects.
- Expanded npm metadata and keywords.
- Demo toolbar now uses a segmented range selector and reusable dropdown actions.
- Demo project table now includes pagination.

### Compatibility
- No intentional breaking API changes from `0.1.0`.
- Existing TSX + plain CSS components remain available from the root export.
