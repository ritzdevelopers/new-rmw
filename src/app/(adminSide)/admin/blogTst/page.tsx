// "use client";
// import React, { useEffect, useState } from "react";
// import { MdOutlineEditRoad } from "react-icons/md";
// import RMWTxtEditor from "./RMWTxtEditor/RMWTxtEditor";
// function page() {
//   const [rowNumber, setRowNum] = useState();
//   useEffect(() => setRowNum([0, 1, 2, 3]), []);
//   return (
//     <div className="w-[100%] min-h-screen flex flex-col items-center">
//       <div className="w-[100%] overflow-x-hidden relative">
//         <div
//           contentEditable={true}
//           className="w-[100%] p-1 min-h-[60px] text-2xl rounded-[2px] relative mb-2"
//         >
//           Enter The Title Here ......
//         </div>
//         <div className="absolute right-0 top-1 w-[25px] h-[25px] cursor-pointer">
//           <MdOutlineEditRoad className="h-full w-full" />
//         </div>
//       </div>

//       <RMWTxtEditor></RMWTxtEditor>

//       {rowNumber &&
//         rowNumber.map((rw) => {
//           return <RMWTxtEditor key={rw}></RMWTxtEditor>;
//         })}
//     </div>
//   );
// }

// export default page;
