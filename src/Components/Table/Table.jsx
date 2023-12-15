//Imports
import React, { useState, useEffect } from "react";
import "./Table.css";

//Function Of Table Component
const Table = ({ columns, data = [] }) => {
  //Component will render after return
  return (
    <table className="table-main">
      <thead className="table-header">
        {columns.map((column, i) => (
          <th key={i} className="table-element">{column.title}</th>
        ))}
      </thead>
      <tbody className="table-body">
        {data.map((row, i) => (
          <tr key={i} className="table-row" style={{backgroundColor : `${i % 2 !== 0 ? '#252526' : '#22222436'}`}}>
            <td className="table-element">{row.id}</td>
            <td className="table-element">{row.soc}</td>
            <td className="table-element">{row.imei}</td>
            <td className="table-element">{row.owner}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
