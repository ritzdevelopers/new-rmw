// "use client";
// import React from "react";
// import styles from "./Dashboard.module.css";
// import { PieChartComponent } from "@/components/pieChart/PieChartComponent";
// import "@/allPages/dashboard/Dashboard";

// declare namespace JSX {
//   interface IntrinsicElements {
//     button: React.DetailedHTMLProps<
//       React.ButtonHTMLAttributes<HTMLButtonElement>,
//       HTMLButtonElement
//     >;
//   }
// }

// const Dashboard = () => {
//   return (
//     <div className={`${styles.dashMain}`}>
      
//         <div className={`${styles.dashContent}`}>
//           <PieChartComponent />
//         </div>
//         <div className={`${styles.dashWrites} `}>
//           <h1>Heading</h1>
//           <p>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
//             alias eveniet fuga quaerat voluptas sint nesciunt minus cumque,
//             consectetur repellendus est delectus eum, laboriosam veritatis ullam
//             dolor maiores cum. Consequ Lorem ipsum dolor sit amet consectetur
//             adipisicing elit. Tempora rem quasi excepturi provident repellat
//             sint explicabo, inventore aperiam enim nisi nemo quibusdam! Lorem
//             ipsum dolor sit amet consectetur adipisicing elit. Provident quas
//             iure similique mollitia cumque illum harum reprehenderit officia
//             aliquid facere!
//           </p>
//           <div className={styles.dashButtons}>
//             <button>Dashboard</button>
//             <button>Redirect</button>
//           </div>
//         </div>
      
//     </div>
//   );
// };

// export default Dashboard;


"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [chartData, setChartData] = useState([]);
  const [activeChart, setActiveChart] = useState("desktop");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/visitors");
        setChartData(res.data);
      } catch (err) {
        console.error("Failed to fetch visitors data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Visitor Overview</h2>

      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            activeChart === "desktop" ? "bg-indigo-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveChart("desktop")}
        >
          Desktop
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeChart === "mobile" ? "bg-indigo-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveChart("mobile")}
        >
          Mobile
        </button>
      </div>

      <div className="w-full h-80 mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey={activeChart} fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
