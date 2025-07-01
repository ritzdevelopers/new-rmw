// "use client";
// import React, { useMemo, useState } from "react";

// interface Column<T> {
//   key: keyof T | string;
//   label: string;
//   render?: (row: T) => React.ReactNode;
//   searchable?: boolean;
// }

// interface TableProps<T> {
//   columns: Column<T>[];
//   data: T[];
//   actionButtons?: (row: T) => React.ReactNode;
//   emptyMessage?: string;
//   entriesPerPageOptions?: number[];
//   defaultEntriesPerPage?: number;
//   searchableFields?: (keyof T)[];
//   leftHeaderButtons?: React.ReactNode; // ✅ NEW PROP
// }

// const AdminTable = <T,>({
//   columns,
//   data,
//   actionButtons,
//   emptyMessage = "No entries found.",
//   entriesPerPageOptions = [5, 10, 20, 50],
//   defaultEntriesPerPage = 10,
//   searchableFields = [],
//   leftHeaderButtons, // ✅ Accept optional buttons
// }: TableProps<T>) => {
//   const [entriesPerPage, setEntriesPerPage] = useState(defaultEntriesPerPage);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredData = useMemo(() => {
//     if (!searchQuery.trim()) return data;
//     return data.filter((item) =>
//       searchableFields.some((field) =>
//         String(item[field]).toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     );
//   }, [data, searchQuery, searchableFields]);

//   const totalPages = Math.ceil(filteredData.length / entriesPerPage);
//   const currentData = useMemo(() => {
//     const start = (currentPage - 1) * entriesPerPage;
//     return filteredData.slice(start, start + entriesPerPage);
//   }, [filteredData, currentPage, entriesPerPage]);

//   return (
//     <div className="w-full">
//       {/* Top Controls */}
//       <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
//         <div className="flex items-center gap-2 flex-wrap">
//           {/* Entries Dropdown */}
//           <div>
//             <label className="text-sm mr-2">Show</label>
//             <select
//               className="border rounded px-2 py-1"
//               value={entriesPerPage}
//               onChange={(e) => {
//                 setEntriesPerPage(Number(e.target.value));
//                 setCurrentPage(1);
//               }}
//             >
//               {entriesPerPageOptions.map((num) => (
//                 <option key={num} value={num}>
//                   {num}
//                 </option>
//               ))}
//             </select>
//             <span className="ml-2 text-sm">entries</span>
//           </div>
//         </div>
//         {/* Optional Buttons on Left */}
//         {leftHeaderButtons && <div className="flex ">{leftHeaderButtons}</div>}

//         {/* Search Bar */}
//         {searchableFields.length > 0 && (
//           <input
//             type="text"
//             placeholder="Search..."
//             className="border rounded px-3 py-1 w-full md:w-64"
//             value={searchQuery}
//             onChange={(e) => {
//               setSearchQuery(e.target.value);
//               setCurrentPage(1);
//             }}
//           />
//         )}
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full border rounded bg-white shadow-sm">
//           <thead className="bg-gray-100 text-left">
//             <tr>
//               {columns.map((col) => (
//                 <th key={String(col.key)} className="p-3 border-b">
//                   {col.label}
//                 </th>
//               ))}
//               {actionButtons && <th className="p-3 border-b">Actions</th>}
//             </tr>
//           </thead>
//           <tbody>
//             {currentData.length > 0 ? (
//               currentData.map((row, rowIndex) => (
//                 <tr key={rowIndex} className="hover:bg-gray-50">
//                   {columns.map((col) => (
//                     <td key={String(col.key)} className="p-3 border-b">
//                       {col.render
//                         ? col.render(row)
//                         : String((row as any)[col.key])}
//                     </td>
//                   ))}
//                   {actionButtons && (
//                     <td className="p-3 border-b">{actionButtons(row)}</td>
//                   )}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan={columns.length + (actionButtons ? 1 : 0)}
//                   className="p-3 text-center text-gray-500"
//                 >
//                   {emptyMessage}
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-end mt-4 space-x-2">
//         <button
//           className="px-3 py-1 border rounded disabled:opacity-50"
//           onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//           disabled={currentPage === 1}
//         >
//           Prev
//         </button>
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             className={`px-3 py-1 border rounded ${
//               currentPage === i + 1 ? "bg-blue-500 text-white" : ""
//             }`}
//             onClick={() => setCurrentPage(i + 1)}
//           >
//             {i + 1}
//           </button>
//         ))}
//         <button
//           className="px-3 py-1 border rounded disabled:opacity-50"
//           onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminTable;

"use client";
import React, { useMemo, useState, useEffect } from "react";

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
  searchable?: boolean;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  actionButtons?: (row: T) => React.ReactNode;
  emptyMessage?: string;
  entriesPerPageOptions?: number[];
  defaultEntriesPerPage?: number;
  searchableFields?: (keyof T)[];
  leftHeaderButtons?: React.ReactNode;
}

const AdminTable = <T,>({
  columns,
  data,
  actionButtons,
  emptyMessage = "No entries found.",
  entriesPerPageOptions = [5, 10, 20, 50],
  defaultEntriesPerPage = 10,
  searchableFields = [],
  leftHeaderButtons,
}: TableProps<T>) => {
  const [entriesPerPage, setEntriesPerPage] = useState(defaultEntriesPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    return data.filter((item) =>
      searchableFields.some((field) =>
        String(item[field] ?? "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
  }, [data, searchQuery, searchableFields]);

  // Reset page if filtered data is smaller than current page's range
  useEffect(() => {
    const maxPage = Math.ceil(filteredData.length / entriesPerPage);
    if (currentPage > maxPage) {
      setCurrentPage(1);
    }
  }, [filteredData.length, entriesPerPage, currentPage]);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * entriesPerPage;
    return filteredData.slice(start, start + entriesPerPage);
  }, [filteredData, currentPage, entriesPerPage]);

  return (
    <div className="w-full">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        {/* Entries Dropdown */}
        <div>
          <label className="text-sm mr-2">Show</label>
          <select
            className="border rounded px-2 py-1"
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {entriesPerPageOptions.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span className="ml-2 text-sm">entries</span>
        </div>
      </div>
      {/* Left Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        {leftHeaderButtons && <div>{leftHeaderButtons}</div>}

        {/* Search Bar */}
        {searchableFields.length > 0 && (
          <input
            type="text"
            placeholder="Search..."
            className="border rounded px-3 py-1 w-full md:w-64"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded bg-white shadow-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)} className="p-3 border-b">
                  {col.label}
                </th>
              ))}
              {actionButtons && <th className="p-3 border-b">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={String(col.key)} className="p-3 border-b">
                      {col.render
                        ? col.render(row)
                        : String(row[col.key] ?? "-")}
                    </td>
                  ))}
                  {actionButtons && (
                    <td className="p-3 border-b">{actionButtons(row)}</td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (actionButtons ? 1 : 0)}
                  className="p-3 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4 space-x-2">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminTable;
