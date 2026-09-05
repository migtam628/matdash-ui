# Migrating from MatDash UI 0.1.x to 0.2.0

Version 0.2.0 is designed as an additive release. Existing 0.1.x imports and component props remain available.

## Package version

Update the package version to `0.2.0`.

## DataTable

Existing tables continue to work:

```tsx
<DataTable columns={columns} rows={rows} getRowKey={(row) => row.id} />
```

To opt into the new capabilities, mark columns sortable and enable table features:

```tsx
const columns = [
  {
    key: 'name',
    header: 'Name',
    sortable: true,
    sortValue: (row) => row.name,
    render: (row) => row.name,
  },
];

<DataTable
  columns={columns}
  rows={rows}
  getRowKey={(row) => row.id}
  selectable
  striped
  stickyHeader
/>
```

## New composition primitives

Use `FormField` when you need one shared validation/description wrapper around a control. Existing `Input`, `Select`, and `Textarea` label props remain supported.

Use `Popover` as the low-level overlay primitive when a specialized component such as `DatePicker`, `Combobox`, or `DropdownMenu` is not appropriate.

## New application interactions

- `CommandPalette` is controlled using `open` + `onClose`.
- `Combobox`, `DatePicker`, `Calendar`, `RadioGroup`, and `Slider` support controlled/uncontrolled usage.
- `TreeView` supports controlled selection and expansion.
- `Stepper` is presentation/state driven through `activeStep`.

No CSS-in-JS runtime or additional charting package is required for 0.2.0.
