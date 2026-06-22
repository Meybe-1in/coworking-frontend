export const idColumn = {
  key: "id",
  label: "#",
  render: (row) => (
    <span
      style={{
        color: "#d1d5db",
        fontFamily:
          "monospace",
      }}
    >
      #{row.id}
    </span>
  ),
};