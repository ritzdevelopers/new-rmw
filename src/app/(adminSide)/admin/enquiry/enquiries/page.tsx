// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Table from "@/components/ui/AdminTable";
// import Breadcrumb from "@/components/ui/Breadcrumb"; // Optional
// import { format } from "date-fns";

// import { saveAs } from "file-saver";
// import * as XLSX from "xlsx";

// interface ContactEnquiry {
//   id: string;
//   name: string;
//   email: string;
//   subject: string;
//   message: string;
//   date: string;
// }

// const Page = () => {
//   const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);

//   useEffect(() => {
//     const fetchEnquiries = async () => {
//       try {
//         const res = await axios.get("/api/system-settings/contact-enquiry");

//         // Filter only entries with EType 'contactUs'
//         const filtered = res.data.filter(
//           (entry: any) => entry.etype === "Enquiry"
//         );

//         // Format the filtered entries
//         const formatted = filtered.map((entry: any) => ({
//           ...entry,
//           date: format(new Date(entry.send_date), "dd MM, yyyy"),
//         }));

//         setEnquiries(formatted);
//       } catch (err) {
//         console.error("Error fetching contact enquiries:", err);
//       }
//     };

//     fetchEnquiries();
//   }, []);

//   const handleDelete = async (id: string) => {
//     try {
//       const res = await axios.delete(
//         `/api/system-settings/contact-enquiry/${id}`
//       );
//       if (res.status === 200) {
//         setEnquiries((prev) => prev.filter((e) => e.id !== id));
//       } else {
//         console.error("Failed to delete enquiry", res);
//       }
//     } catch (err) {
//       console.error("Error deleting enquiry:", err);
//     }
//   };

//   const exportToExcel = () => {
//     // map data to plain objects
//     const exportData = enquiries.map(({ id, ...rest }) => rest);
//     // create worksheet
//     const worksheet = XLSX.utils.json_to_sheet(exportData);
//     // create workbook and append worksheet
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "ContactEnquiries");
//     // generate excel file buffer
//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array",
//     });
//     // create blob and trigger download
//     const data = new Blob([excelBuffer], {
//       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     });
//     saveAs(data, "ContactEnquiries.xlsx");
//   };

//   return (
//     <div className="p-2">
//       <h1 className="text-2xl font-bold mb-4">Enquiry</h1>
//       <Breadcrumb currentPage="Contact-Enquiry" />

//       <Table
//         columns={[
//           { key: "etype", label: "EType" },
//           { key: "name", label: "Name" },
//           { key: "email", label: "Email" },
//           { key: "mobile", label: "Mobile" },
//           { key: "message", label: "Message" },
//           { key: "date", label: "Send Date" },
//         ]}
//         data={enquiries}
//         leftHeaderButtons={
//           <button
//             onClick={exportToExcel}
//             className="border border-black p-2 rounded-xl cursor-pointer hover:bg-black hover:text-white"
//           >
//             Export to excel
//           </button>
//         }
//         searchableFields={["name", "email", "subject", "message"]}
//         actionButtons={(row) => (
//           <button
//             onClick={() => handleDelete(row.id)}
//             className="text-red-600 hover:underline"
//           >
//             Delete
//           </button>
//         )}
//         emptyMessage="No contact enquiries found."
//       />
//       <footer className="admin-footer">
//         Designed and Developed by <strong>Ritz Media World</strong>
//       </footer>
//     </div>
//   );
// };

// export default Page;

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@/components/ui/AdminTable";
import Breadcrumb from "@/components/ui/Breadcrumb"; // Optional
import { format } from "date-fns";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  mobile?: string;
  etype: string;
  send_date: string; // from API
  date?: string; // formatted for display
}

const Page = () => {
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await axios.get("/api/system-settings/contact-enquiry");

        const filtered = (res.data as ContactEnquiry[]).filter(
          (entry) => entry.etype === "Enquiry"
        );

        const formatted = filtered.map((entry) => ({
          ...entry,
          date: format(new Date(entry.send_date), "dd MM, yyyy"),
        }));

        setEnquiries(formatted);
      } catch (err) {
        console.error("Error fetching contact enquiries:", err);
      }
    };

    fetchEnquiries();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(
        `/api/system-settings/contact-enquiry/${id}`
      );
      if (res.status === 200) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
      } else {
        console.error("Failed to delete enquiry", res);
      }
    } catch (err) {
      console.error("Error deleting enquiry:", err);
    }
  };

  const exportToExcel = () => {
    const exportData = enquiries.map(({ ...rest }) => rest); // ignore 'id' to avoid eslint warning
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ContactEnquiries");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(data, "ContactEnquiries.xlsx");
  };

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4">Enquiry</h1>
      <Breadcrumb currentPage="Contact-Enquiry" />

      <Table
        columns={[
          { key: "etype", label: "EType" },
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "mobile", label: "Mobile" },
          { key: "message", label: "Message" },
          { key: "date", label: "Send Date" },
        ]}
        data={enquiries}
        leftHeaderButtons={
          <button
            onClick={exportToExcel}
            className="border border-black p-2 rounded-xl cursor-pointer hover:bg-black hover:text-white"
          >
            Export to excel
          </button>
        }
        searchableFields={["name", "email", "subject", "message"]}
        actionButtons={(row) => (
          <button
            onClick={() => handleDelete(row.id)}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        )}
        emptyMessage="No contact enquiries found."
      />
      <footer className="admin-footer">
        Designed and Developed by <strong>Ritz Media World</strong>
      </footer>
    </div>
  );
};

export default Page;
