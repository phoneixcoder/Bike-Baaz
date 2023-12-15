//Imports
import React, { useState, useMemo } from "react";
import "./Table.css";
import Pagination from "../Pagination/Pagination";
//Function Of Table Component
const Table = ({ columns, data = [] }) => {
  //Component will render after return
  let PageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <>
      <table className="table-main">
        <thead className="table-header">
          {columns.map((column, i) => (
            <th key={i} className="table-element">
              {column.title}
            </th>
          ))}
        </thead>
        <tbody className="table-body">
          {currentTableData.map((row, i) => (
            <tr
              key={i}
              className="table-row"
              style={{
                backgroundColor: `${i % 2 !== 0 ? "#252526" : "#22222436"}`,
              }}
            >
              <td className="table-element">{row.id}</td>
              <td className="table-element">{row.soc}</td>
              <td className="table-element">{row.imei}</td>
              <td className="table-element">{row.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="main-pagination-container">
        <Pagination
          currentPage={currentPage}
          totalCount={data.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
};

export default Table;
