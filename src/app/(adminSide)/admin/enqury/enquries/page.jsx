"use client";
import React, { useEffect, useState } from "react";
import {
  FilePen,
  FilePenLine,
  Home,
  Leaf,
  Monitor,
  Reply,
  Trash2,
} from "lucide-react";
import Link from "next/link";

import { AlertTriangle } from "lucide-react";

function page() {
const contentData = [
  {
    eType: "Enquiries",
    name: "Rahul Verma",
    email: "rahul.verma@example.com",
    phoneNo: "9876543210",
    msg: "I need a business website for my startup.",
    date: "2025-06-01",
    propType: "Villa Development",
  },
  {
    eType: "Enquiries",
    name: "Anjali Sharma",
    email: "anjali.sharma@example.com",
    phoneNo: "9123456780",
    msg: "Looking for a 2BHK flat in Noida.",
    date: "2025-06-02",
    propType: "Apartment",
  },
  {
    eType: "Enquiries",
    name: "Rohan Mehta",
    email: "rohan.mehta@example.com",
    phoneNo: "9988776655",
    msg: "Need a commercial space for office setup.",
    date: "2025-06-03",
    propType: "Commercial Space",
  },
  {
    eType: "Enquiries",
    name: "Sneha Kapoor",
    email: "sneha.kapoor@example.com",
    phoneNo: "9786543210",
    msg: "Want to invest in a plot near highway.",
    date: "2025-06-04",
    propType: "Plot",
  },
  {
    eType: "Enquiries",
    name: "Amit Joshi",
    email: "amit.joshi@example.com",
    phoneNo: "9012345678",
    msg: "Looking for a farmhouse for weekend stays.",
    date: "2025-06-05",
    propType: "Farmhouse",
  },
  {
    eType: "Enquiries",
    name: "Pooja Nair",
    email: "pooja.nair@example.com",
    phoneNo: "9087654321",
    msg: "Need assistance in property registration.",
    date: "2025-06-06",
    propType: "Legal Support",
  },
  {
    eType: "Enquiries",
    name: "Manish Kumar",
    email: "manish.kumar@example.com",
    phoneNo: "9823412341",
    msg: "Looking for rental property in Gurgaon.",
    date: "2025-06-07",
    propType: "Rental",
  },
  {
    eType: "Enquiries",
    name: "Kiran Desai",
    email: "kiran.desai@example.com",
    phoneNo: "9765432109",
    msg: "Want a real estate agent to consult.",
    date: "2025-06-08",
    propType: "Consultation",
  },
  {
    eType: "Enquiries",
    name: "Tushar Singh",
    email: "tushar.singh@example.com",
    phoneNo: "9811223344",
    msg: "Looking to sell my 3BHK flat urgently.",
    date: "2025-06-09",
    propType: "Resale",
  },
  {
    eType: "Enquiries",
    name: "Deepika Rani",
    email: "deepika.rani@example.com",
    phoneNo: "9090909090",
    msg: "Need help with home loan eligibility.",
    date: "2025-06-10",
    propType: "Loan Assistance",
  },
  {
    eType: "Enquiries",
    name: "Arjun Dev",
    email: "arjun.dev@example.com",
    phoneNo: "9876501234",
    msg: "Interested in 4BHK villas in Hyderabad.",
    date: "2025-06-11",
    propType: "Villa",
  },
  {
    eType: "Enquiries",
    name: "Sonal Mehra",
    email: "sonal.mehra@example.com",
    phoneNo: "9955442211",
    msg: "Want to buy land for warehouse.",
    date: "2025-06-12",
    propType: "Industrial Plot",
  },
  {
    eType: "Enquiries",
    name: "Harsh Vardhan",
    email: "harsh.vardhan@example.com",
    phoneNo: "9666777888",
    msg: "Looking for affordable studio apartments.",
    date: "2025-06-13",
    propType: "Studio Apartment",
  },
  {
    eType: "Enquiries",
    name: "Isha Malhotra",
    email: "isha.malhotra@example.com",
    phoneNo: "9443322110",
    msg: "Need property for retail shop setup.",
    date: "2025-06-14",
    propType: "Retail Space",
  },
  {
    eType: "Enquiries",
    name: "Rajeev Bansal",
    email: "rajeev.bansal@example.com",
    phoneNo: "9212345670",
    msg: "Planning to relocate and need 3BHK.",
    date: "2025-06-15",
    propType: "Apartment",
  },
  {
    eType: "Enquiries",
    name: "Nikita Shah",
    email: "nikita.shah@example.com",
    phoneNo: "9888877665",
    msg: "Want to construct a villa on my land.",
    date: "2025-06-16",
    propType: "Construction Service",
  },
  {
    eType: "Enquiries",
    name: "Aditya Rana",
    email: "aditya.rana@example.com",
    phoneNo: "9877812345",
    msg: "Looking for penthouse in Delhi.",
    date: "2025-06-17",
    propType: "Penthouse",
  },
  {
    eType: "Enquiries",
    name: "Rekha Sinha",
    email: "rekha.sinha@example.com",
    phoneNo: "9765412309",
    msg: "Want to book under-construction flat.",
    date: "2025-06-18",
    propType: "Under Construction",
  },
  {
    eType: "Enquiries",
    name: "Nikhil Arora",
    email: "nikhil.arora@example.com",
    phoneNo: "9654321098",
    msg: "Looking for a property in a gated society.",
    date: "2025-06-19",
    propType: "Gated Community",
  },
  {
    eType: "Enquiries",
    name: "Simran Kaur",
    email: "simran.kaur@example.com",
    phoneNo: "9098765432",
    msg: "Need a rental apartment with furniture.",
    date: "2025-06-20",
    propType: "Furnished Rental",
  },
  {
    eType: "Enquiries",
    name: "Vikram Chauhan",
    email: "vikram.chauhan@example.com",
    phoneNo: "9988991122",
    msg: "Want to lease property for cafe.",
    date: "2025-06-21",
    propType: "Lease Property",
  },
  {
    eType: "Enquiries",
    name: "Kavita Mishra",
    email: "kavita.mishra@example.com",
    phoneNo: "9112233445",
    msg: "Need interior designing service.",
    date: "2025-06-22",
    propType: "Interior Design",
  },
  {
    eType: "Enquiries",
    name: "Abhay Yadav",
    email: "abhay.yadav@example.com",
    phoneNo: "9877098765",
    msg: "Looking to invest in farmland.",
    date: "2025-06-23",
    propType: "Farmland",
  },
  {
    eType: "Enquiries",
    name: "Divya Bharti",
    email: "divya.bharti@example.com",
    phoneNo: "9765101234",
    msg: "Interested in co-living spaces.",
    date: "2025-06-24",
    propType: "Co-living",
  },
  {
    eType: "Enquiries",
    name: "Neeraj Singh",
    email: "neeraj.singh@example.com",
    phoneNo: "9555011223",
    msg: "Need PG accommodation in Bangalore.",
    date: "2025-06-25",
    propType: "Paying Guest",
  },
  {
    eType: "Enquiries",
    name: "Meera Das",
    email: "meera.das@example.com",
    phoneNo: "9992223331",
    msg: "Looking for real estate investment advice.",
    date: "2025-06-26",
    propType: "Investment Advisory",
  },
  {
    eType: "Enquiries",
    name: "Arman Qureshi",
    email: "arman.qureshi@example.com",
    phoneNo: "9444455551",
    msg: "Need property with vastu compliance.",
    date: "2025-06-27",
    propType: "Vastu Property",
  },
  {
    eType: "Enquiries",
    name: "Neha Jain",
    email: "neha.jain@example.com",
    phoneNo: "9222211122",
    msg: "Want to book sample flat viewing.",
    date: "2025-06-28",
    propType: "Flat Viewing",
  },
  {
    eType: "Enquiries",
    name: "Suresh Patel",
    email: "suresh.patel@example.com",
    phoneNo: "9887766554",
    msg: "Looking for property with lake view.",
    date: "2025-06-29",
    propType: "Luxury Property",
  },
  {
    eType: "Enquiries",
    name: "Ritika Taneja",
    email: "ritika.taneja@example.com",
    phoneNo: "9011223344",
    msg: "Need rental agreement draft service.",
    date: "2025-06-30",
    propType: "Legal Drafting",
  },
];


  const [lftBtn, setLftBtn] = useState(0);
  const [rightBtn, setRightBtn] = useState(9);
  const [page, setPage] = useState([]);

  const pagination = (s, e) => {
    if (s < contentData.length) {
      if (contentData.length < 9) {
        setPage(contentData.slice(s, contentData.length - 1));
        return;
      }
      setPage(contentData.slice(s, e));
    }
  };
  const [ttPage, setTTPage] = useState(0);
  const [btnArr, setBtnArr] = useState([]);

  useEffect(() => {
    pagination(lftBtn, rightBtn);
    setTTPage(contentData.length / 8 + 1);
  }, [lftBtn, rightBtn]);

  const leftPage = () => {
    let newLeft = lftBtn - 9;
    if (newLeft < 0) newLeft = 0;

    let newRight;
    if (contentData.length < 10) {
      newRight = contentData.length;
    } else {
      newRight = newLeft + 9;
    }

    setLftBtn(newLeft);
    setRightBtn(newRight);
    pagination(newLeft, newRight);
  };

  const rightPage = () => {
    // debugger;
    let newLeft = lftBtn + 9;
    let newRight = newLeft + 9;

    if (newRight > contentData.length) {
      newRight = contentData.length;
      newLeft = newRight - (newRight % 9);
    }

    setLftBtn(newLeft);
    setRightBtn(newRight);
    pagination(newLeft, newRight);
  };

  const directPageNavigation = (e) => {
    let pageNum = Number(e.target.innerText);

    let newRight = 9 * pageNum;

    let newLeft = newRight - 9;
    if (newRight > contentData.length) {
      newRight = contentData.length;
      newLeft = newRight - (newRight % 9);
    }

    setLftBtn(newLeft);
    setRightBtn(newRight);
    pagination(newLeft, newRight);
  };

  const getDataWithSearch = (e) => {
    const value = e.target.value;

    setTimeout(() => {
      setPage(
        page.filter((data) =>
          data.pageTitle.toLowerCase().includes(value.toLowerCase())
        )
      );
      console.log("This is filtered post", page);
    }, 2000);
  };

  const getEntriesManually = (e) => {
    let val = Number(e.target.value);
    setPage(contentData.slice(0, val));
  };
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [deleteKey, setDeleteKey] = useState("");

  const deleteData = () => {
    // Delete Data Logic
  };

  const handleDataDeleteModal = (key) => {
    setDeleteKey(" ");
    setDeleteConfirmModal(true);
    setDeleteKey(key);
  };

  return (
    <div className="bg-[#EEEEEE] flex flex-col gap-6 sm:gap-8 md:gap-12 p-4 md:p-8 min-h-screen">
      {deleteConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 w-full max-w-md shadow-lg text-center relative">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <AlertTriangle className="text-red-600 w-12 h-12" />
            </div>

            {/* Text */}
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Are you sure?
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              This action cannot be undone. The data will be permanently
              deleted.
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-md transition"
                onClick={() => setDeleteConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
                onClick={deleteData}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Title Section */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-[#ACACAC] flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl font-light uppercase">
          <Monitor className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
          Enquiry
        </h1>
      </div>

      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 bg-white p-3 rounded-md shadow-sm">
        <h1 className="text-[#2955B3] flex items-center gap-2">
          <Home className="w-4 h-4" />
          Home
        </h1>
        <span className="text-[#ACACAC] font-bold">/</span>
        <h1 className="text-[#838383] flex items-center gap-2">
          <Monitor className="w-4 h-4" />
          Manage Enquiries
        </h1>
      </div>

      {/* Main Section */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        {/* Header */}
        <div className="bg-[#9CA9B4] p-4">
          <p className="text-white font-medium text-base sm:text-lg">
            Manage Page
          </p>
        </div>

        {/* Sorting Section */}
        <div className="flex flex-col gap-6 p-4">
          <div className="flex justify-end">
            <Link
              href={"/admin/content/add"}
              className="px-6 py-2 rounded-md font-semibold text-white bg-[#688A7E] hover:bg-[#365248] cursor-pointer transition duration-200"
            >
              Export To Excel
            </Link>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 flex-wrap">
            {/* Show Entries */}
            <div className="flex items-center gap-2">
              <p className="font-semibold text-[#688A7E] whitespace-nowrap">
                Show Entries
              </p>
              <select
                onChange={(E) => getEntriesManually(E)}
                className="border border-[#365248] rounded-md px-3 py-1.5 text-[#365248] outline-none cursor-pointer"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 border border-[#1a6249] rounded-md px-3 py-2 w-full md:w-auto">
              <p className="text-[#717272] font-medium whitespace-nowrap">
                Search Now
              </p>
              <input
                type="text"
                placeholder="Search here..."
                onChange={(e) => getDataWithSearch(e)}
                className="bg-transparent outline-none placeholder:text-[#365248] text-[#365248] w-full"
              />
            </div>
          </div>
        </div>

        {/* Table Headings */}
        <div className="hidden md:flex bg-[#CCCCCC] px-4 py-3 font-bold text-[#688A7E] text-sm uppercase">
          {/* <p className="w-[8%]">E.Type</p>  */}
          <p className="w-[14%]">Name</p>
          <p className="w-[18%]">Email</p>
          <p className="w-[10%]">Mobile No.</p>
          <p className="w-[12%] text-center">Property Type</p>
          <p className="w-[25%] text-center">Message</p>
          <p className="w-[10%] text-center">Send Date</p>
          <p className="w-[13%] text-center">Action</p>
        </div>

        {/* List Items */}
        <div className="divide-y">
          {page ? (
            page.map((data, idx) => (
              <div
                key={idx}
                className={`flex flex-col md:flex-row items-start md:items-center px-4 py-3 gap-2 md:gap-0 ${
                  idx % 2 === 0 ? "bg-[#F5F5F5]" : "bg-white"
                }`}
              >
                {/* <p className="w-full md:w-[8%] text-sm text-[#688A7E]">
                  {data.eType}
                </p> */}

                <p className="w-full md:w-[14%] text-sm text-[#688A7E]">
                  {data.name}
                </p>

                <p className="w-full md:w-[18%] text-sm text-[#688A7E]">
                  {data.email}
                </p>

                <p className="w-full md:w-[10%] text-sm text-[#688A7E] truncate">
                  {data.phoneNo}
                </p>
                 <p className="w-full md:w-[12%] text-sm text-[#688A7E]">
                  {data.propType}
                </p>
                <p className="w-full md:w-[25%] text-sm text-[#688A7E]">
                  {data.msg}
                </p>

                <p className="w-full md:w-[10%] text-sm text-[#688A7E] text-center">
                  {data.date}
                </p>

                <div className="w-full md:w-[13%] flex justify-start md:justify-center gap-2 mt-2 md:mt-0">
                  <Link
                    href={`/admin/content/edit/${idx}`}
                    className="p-2 cursor-pointer bg-green-600 hover:bg-green-700 transition text-white rounded-md"
                  >
                    <Reply />
                  </Link>

                  <button
                    onClick={() => handleDataDeleteModal(idx)}
                    className="p-2 cursor-pointer bg-red-500 hover:bg-red-600 transition text-white rounded-md"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4">Loading...</div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 py-4 border-t">
          <p className="text-sm opacity-0 text-gray-600">
            Showing 41 to 50 of 52 entries
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={leftPage}
              className="px-5 py-2 border rounded-md border-[#688A7E] text-[#688A7E] font-semibold hover:bg-[#436b5d] hover:text-white transition"
            >
              Previous
            </button>
            <div className="flex flex-wrap gap-1">
              {Array.from({ length: ttPage }, (_, i) => (
                <p
                  key={i}
                  onClick={(e) => directPageNavigation(e)}
                  className="px-3 py-1.5 border border-[#688A7E] text-black rounded-md cursor-pointer hover:bg-[#688A7E] hover:text-white transition"
                >
                  {i + 1}
                </p>
              ))}
            </div>
            <button
              onClick={rightPage}
              className="px-5 py-2 border rounded-md border-[#688A7E] text-[#688A7E] font-semibold hover:bg-[#436b5d] hover:text-white transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;