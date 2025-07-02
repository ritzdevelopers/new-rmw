"use client";
import React from "react";
import { FilePen, FilePenLine, Home, Monitor, Trash2 } from "lucide-react";
function page() {
  const contentData = [
    {
      pageTitle: "Home Page",
      pageHeading: "Welcome to Our Website",
      pageURL: "/home",
      date: "2025-06-01",
      status: true,
    },
    {
      pageTitle: "About Us",
      pageHeading: "Learn More About Our Mission",
      pageURL: "/about",
      date: "2025-06-02",
      status: true,
    },
    {
      pageTitle: "Contact",
      pageHeading: "Get in Touch with Us",
      pageURL: "/contact",
      date: "2025-06-03",
      status: false,
    },
    {
      pageTitle: "Blog",
      pageHeading: "Read Our Latest Articles",
      pageURL: "/blog",
      date: "2025-06-04",
      status: true,
    },
    {
      pageTitle: "Services",
      pageHeading: "What We Offer",
      pageURL: "/services",
      date: "2025-06-05",
      status: true,
    },
    {
      pageTitle: "Portfolio",
      pageHeading: "Our Work Showcase",
      pageURL: "/portfolio",
      date: "2025-06-06",
      status: false,
    },
    {
      pageTitle: "FAQ",
      pageHeading: "Frequently Asked Questions",
      pageURL: "/faq",
      date: "2025-06-07",
      status: true,
    },
    {
      pageTitle: "Careers",
      pageHeading: "Join Our Team",
      pageURL: "/careers",
      date: "2025-06-08",
      status: false,
    },
    {
      pageTitle: "Terms & Conditions",
      pageHeading: "Please Read Carefully",
      pageURL: "/terms",
      date: "2025-06-09",
      status: true,
    },
    {
      pageTitle: "Privacy Policy",
      pageHeading: "Your Data is Safe",
      pageURL: "/privacy",
      date: "2025-06-10",
      status: true,
    },
    {
      pageTitle: "Login",
      pageHeading: "Access Your Account",
      pageURL: "/login",
      date: "2025-06-11",
      status: true,
    },
    {
      pageTitle: "Register",
      pageHeading: "Create an Account",
      pageURL: "/register",
      date: "2025-06-12",
      status: true,
    },
    {
      pageTitle: "Dashboard",
      pageHeading: "Your Control Center",
      pageURL: "/dashboard",
      date: "2025-06-13",
      status: false,
    },
    {
      pageTitle: "Settings",
      pageHeading: "Manage Your Preferences",
      pageURL: "/settings",
      date: "2025-06-14",
      status: true,
    },
    {
      pageTitle: "Notifications",
      pageHeading: "Stay Updated",
      pageURL: "/notifications",
      date: "2025-06-15",
      status: true,
    },
    {
      pageTitle: "Help Center",
      pageHeading: "Need Assistance?",
      pageURL: "/help",
      date: "2025-06-16",
      status: true,
    },
    {
      pageTitle: "Feedback",
      pageHeading: "We Value Your Thoughts",
      pageURL: "/feedback",
      date: "2025-06-17",
      status: false,
    },
    {
      pageTitle: "Pricing",
      pageHeading: "Choose Your Plan",
      pageURL: "/pricing",
      date: "2025-06-18",
      status: true,
    },
    {
      pageTitle: "Events",
      pageHeading: "Upcoming Happenings",
      pageURL: "/events",
      date: "2025-06-19",
      status: true,
    },
    {
      pageTitle: "Testimonials",
      pageHeading: "Hear from Our Clients",
      pageURL: "/testimonials",
      date: "2025-06-20",
      status: false,
    },
  ];

  return (
    <div className="bg-[#EEEEEE] flex flex-col gap-12">
      <div className="flex">
        <h1 className="text-[#ACACAC] flex items-center gap-2 text-4xl font-light bg-none uppercase">
          <Monitor className="w-8 h-8" />
          Manage Page
        </h1>
      </div>

      <div className="flex gap-4 bg-[#FFFFFF] p-2">
        <h1 className="text-[#2955B3] flex items-center gap-2 bg-none ">
          <Home className="w-4 h-4" />
          Home
        </h1>{" "}
        <span className="text-[#ACACAC] font-bold">/</span>{" "}
        <h1 className="text-[#838383] flex items-center gap-2 bg-none ">
          <Monitor className="w-4 h-4" />
          Manage Page
        </h1>
      </div>

      <div className="mainContentSection bg-[#FFFFFF] flex flex-col">
        <div className="bg-[#9CA9B4] p-2">
          <p className="text-[#FFFFFF]">Manage Page</p>
        </div>
        <div className="sortingSection flex flex-col p-4 gap-4">
          <div className="flex justify-end">
            <button className="px-6 py-2 rounded-md font-bold text-[#FFFFFF] cursor-pointer bg-[#688A7E] hover:bg-[#365248] hover:duration-200 transition ">
              Add Content
            </button>
          </div>
          <div className="flex justify-between items-center flex-wrap gap-4 py-4">
            {/* Show Entries Section */}
            <div className="flex items-center gap-4">
              <p className="font-semibold text-[#688A7E]">Show Entries</p>
              <select className="border-2 border-[#365248] rounded-md px-4 py-2 cursor-pointer text-[#365248] focus:outline-none">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>

            {/* Search Section */}
            <div className="flex items-center gap-2 border-2 border-[#1a6249] rounded-md px-3 py-2">
              <p className="text-[#717272] font-medium">Search Now</p>
              <input
                type="text"
                placeholder="Search here..."
                className="outline-none bg-transparent placeholder:text-[#365248] text[#365248]"
              />
            </div>
          </div>
        </div>

        <div className="contentListHead w-full">
          <div className="listHeader w-full bg-[#CCCCCC] flex justify-between">
            <p className="w-[25%] p-2 font-bold text-[#688A7E]">Page Title</p>
            <p className="w-[20%] p-2 font-bold text-[#688A7E]">Page Heading</p>
            <p className="w-[15%] p-2 font-bold text-[#688A7E]">Page Url</p>
            <p className="w-[10%] p-2 font-bold text-[#688A7E]">Add Date</p>
            <p className="w-[5%] p-2 font-bold text-[#688A7E]">Status</p>
            <p className="w-[10%] p-2 font-bold text-[#688A7E]">Action</p>
          </div>
        </div>

        <div className="contentListCardBody w-full">
          {contentData.map((data, idx) => {
            return (
              <div
                style={
                  idx % 2 === 0
                    ? { backgroundColor: "#F5F5F5" }
                    : { backgroundClip: "#FFFFFF" }
                }
                className="listHeader cursor-pointer hover:bg-[#F5F5F5] hover:duration-200 border-b-1 border-[#c6c6c6] w-full flex justify-between"
              >
                <p className="w-[25%] p-2 text-sm text-[#688A7E]">
                  {data.pageTitle}
                </p>
                <p className="w-[20%] p-2 text-sm text-[#688A7E]">
                  {data.pageHeading}
                </p>
                <p className="w-[15%] p-2 text-sm text-[#688A7E]">
                  {data.pageURL}
                </p>
                <p className="w-[10%] p-2 text-sm text-[#688A7E]">
                  {data.date}
                </p>
                <p className="w-[5%] p-2 text-sm text-[#688A7E]">
                  {data.status === true ? "Active" : "Inactive"}
                </p>
                <div className="w-[10%] p-2  text-[#FFFFFF] flex justify-center items-center gap-1">
                  <button className="py-1 px-2 bg-green-600 rounded-md">
                    <FilePen></FilePen>
                  </button>
                  <button className="py-1 px-2 bg-red-500 rounded-md">
                    <Trash2></Trash2>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="nextPageBtns flex justify-between p-4">
            <div><p>Showing 41 to 50 of 52 entries</p></div>
            <div className="flex justify-center items-center gap-2">
                <div><button className="px-6 py-2 border-1 rounded-md border-[#688A7E]">Previous</button></div>
                <div><button className="px-6 py-2 border-1 rounded-md border-[#688A7E]">Next</button></div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default page;
