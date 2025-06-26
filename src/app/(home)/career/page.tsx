import React from 'react'
import Footer from "@/components/footer/Footer";
import CareerForm from '@/allPages/careerPage/careerForm';
import { Toaster } from "react-hot-toast"; // ✅ Import Toaster

const page = () => {
  return (
    <div>
      <Toaster position="top-right" /> {/* ✅ Add Toaster here */}
      <CareerForm />
      <Footer />
    </div>
  );
};

export default page;
