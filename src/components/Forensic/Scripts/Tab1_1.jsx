// import React from "react";
// import {
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Legend,
//   ReferenceLine,
// } from "recharts";


// const gradeData = [
//   {  grade: "Director", available: 9, provided: 13 },
//   {  grade: "Dy Director", available: 15, provided: 20 },
//   { grade: "Assistant Director", available: 40, provided: 42 },
//   {  grade: "Assistant Chemical Analyzer", available: 80, provided: 125 },
//   { grade: "Scientific Officers", available: 35, provided: 37 },
// ];


// export default function Tab1_1({gradeeData}) {
//   console.log('object',gradeeData)
//   return (
//     <div className="p-0">
//       <div className="mt-6">
//         {/* Bar Chart for Available vs Training Provided */}
//         <div className="bg-white p-4 rounded-xl ">
//           <h2 className="text-xl font-semibold mb-4">Training Data by Grade</h2>
//           <ResponsiveContainer width="100%" height={400}>
//             <BarChart data={gradeData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis 
//                 dataKey="grade" 
//                 label={{ 
//                   value: "Officers Grade", 
//                   position: "insideBottom", 
//                   offset: -5 
//                 }} 
//               />

//               <YAxis 
//                 label={{ 
//                   value: "No. of Officers", 
//                   angle: -90, 
//                   position: "insideLeft",
//                 offset: 0,
//                 style: { textAnchor: "middle" },
//                 }} 
//               />

//               <Legend />
//               <Tooltip
//                 formatter={(value, name, props) => {
//                   const percentage = ((props.payload.provided / props.payload.available) * 100).toFixed(2);
//                   return `${name}: ${value} (${percentage}%)`;
//                 }}
//               />
//               <Bar dataKey="available" fill="#8884d8" />
//               <Bar dataKey="provided" fill="#82ca9d" />
//               <ReferenceLine y={0} stroke="#000" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }





import React, { useState } from "react";
import {
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ReferenceLine,
} from "recharts";

const gradeData = [
  { grade: "Director", available: 9, provided: 13 },
  { grade: "Dy Director", available: 15, provided: 20 },
  { grade: "Assistant Director", available: 40, provided: 42 },
  { grade: "Assistant Chemical Analyzer", available: 80, provided: 125 },
  { grade: "Scientific Officers", available: 35, provided: 37 },
];

// export default function Tab1_1({ gradeeData }) {
  
export default function Tab1_1({gradeData}) {
  console.log('object',gradeData)
  const [hiddenBars, setHiddenBars] = useState({});
  
  //   // Toggle bar visibility when legend item is clicked
  const handleLegendClick = (e) => {
    setHiddenBars((prev) => ({
      ...prev,
      [e.dataKey]: !prev[e.dataKey], // Toggle visibility
    }));
  };
  const restructureGradeData = (lastMonthData) => {
    if(lastMonthData)
    {return [
      { grade: "Director", available: lastMonthData?.Director, provided: 13 },
      { grade: "Dy Director", available: lastMonthData["Dy Director"], provided: 20 },
      { grade: "Assistant Director", available: lastMonthData["Assistant Director"], provided: 42 },
      { grade: "Assistant Chemical Analyzer", available: lastMonthData["Assistant Chemical Analyzer"], provided: 125 },
      { grade: "Scientific Officers", available: lastMonthData["Scientific Officers"], provided: 37 },
    ];}
  };
  
  return (
    <div className="p-0">
      <div className="mt-6">
        <div className="bg-white p-4 rounded-xl ">
          <h2 className="text-xl font-semibold mb-4">Training Data by Grade</h2>
          <p><strong>Recent Entry:</strong>{gradeData && gradeData?.month}</p>

          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={restructureGradeData(gradeData)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="grade"
                
                label={{
                  value: "Officers Grade",
                  position: "insideBottom",
                  offset: -18,
                }}
              />
              <YAxis
                label={{
                  value: "No. of Officers",
                  angle: -90,
                  position: "insideLeft",
                  offset: 0,
                  style: { textAnchor: "middle" },
                }}
              />

              {/* Legend with click handler */}
              <Legend
                onClick={handleLegendClick}
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  position: "relative",
                  marginTop: 10, // Adjust this value to move it further down
                }}
                formatter={(value) => (
                  <span
                    style={{
                      textDecoration: hiddenBars[value] ? "line-through" : "none",
                      color: hiddenBars[value] ? "gray" : "black",
                      cursor: "pointer",
                    }}
                  >
                    {value}
                  </span>
                )}
              />

              <Tooltip
                formatter={(value, name, props) => {
                  const percentage = (
                    (props.payload.provided / props.payload.available) *
                    100
                  ).toFixed(2);
                  return `${name}: ${value} (${percentage}%)`;
                }}
              />

              {/* Bars with dynamic visibility */}
              <Bar dataKey="available" fill="#8884d8" hide={hiddenBars["available"]} />
              <Bar dataKey="provided" fill="#82ca9d" hide={hiddenBars["provided"]} />

              <ReferenceLine y={0} stroke="#000" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
