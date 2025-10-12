import React from 'react';
import './Table.css';

const Table = ({ columns, data, renderRowActions }) => {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.accessor || col.header}>{col.header}</th>
            ))}
            {renderRowActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length + (renderRowActions ? 1 : 0)} className="no-data">
                No data available
              </td>
            </tr>
          )}
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col.accessor || col.header}>
                  {col.cell ? col.cell(row) : row[col.accessor]}
                </td>
              ))}
              {renderRowActions && <td>{renderRowActions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;