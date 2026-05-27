export default function AdminTable({
  cols,
  rows,
  emptyMsg = "Sin datos",
}) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 13.5,
        }}
      >
        <thead>
          <tr>
            {cols.map((c) => (
              <th
                key={c.key}
                style={{
                  textAlign: "left",
                  padding: "10px 14px",
                  color: "#9ca3af",
                  fontWeight: 600,
                  fontSize: 11.5,
                  letterSpacing: ".6px",
                  textTransform: "uppercase",
                  borderBottom: "1px solid #f3f4f6",
                }}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={cols.length}
                style={{
                  padding: "32px 0",
                  textAlign: "center",
                }}
              >
                {emptyMsg}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={i}>
                {cols.map((c) => (
                  <td
                    key={c.key}
                    style={{
                      padding: "11px 14px",
                    }}
                  >
                    {c.render
                      ? c.render(row)
                      : row[c.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}