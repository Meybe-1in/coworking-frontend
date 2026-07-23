import "./Table.css";

export default function AdminTable({
  cols = [],
  rows = [],
  emptyMsg = "Sin datos",
}) {

  const safeRows = rows ?? [];

  return (
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            {cols.map((c) => (
              <th key={c.key}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {safeRows.length === 0 ? (
            <tr>
              <td
                colSpan={cols.length}
                className="admin-table-empty"
              >
                {emptyMsg}
              </td>
            </tr>
          ) : (
            safeRows.map((row, i) => (
              <tr key={i}>
                {cols.map((c) => (
                  <td key={c.key}>
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