// //@ts-nocheck
// "use client"
// import React, { useState } from "react";

// const GetLocation = () => {
//   const [location, setLocation] = useState({
//     latitude: null,
//     longitude: null,
//   });
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleGetLocation = async () => {
//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by your browser.");
//       return;
//     }

//     setLoading(true);
//     setError(null); 

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setLocation({
//           latitude,
//           longitude,
//         });
//         setLoading(false); 
//       },
//       (err) => {
//     setError(`Error: ${err.message}`); 
//         setLoading(false); 
//       }
//     );
//   };

//   return (
//     <div className="flex flex-col items-center space-y-4 w-full">
//       <h1 className="text-lg font-bold">Get Location</h1>
//       <button
//         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         onClick={handleGetLocation}
//         disabled={loading}
//       >
//         {loading ? "Fetching Location..." : "Fetch Location"}
//       </button>
//       {location.latitude && location.longitude && (
//         <div className="mt-4 text-center">
//           <p className="text-sm">
//             <strong>Latitude:</strong> {location.latitude}
//           </p>
//           <p className="text-sm">
//             <strong>Longitude:</strong> {location.longitude}
//           </p>
//         </div>
//       )}
//       {error && (
//         <div className="mt-4 text-red-600">
//           <p>{error}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GetLocation;
import React from 'react'

const GetLocation = () => {
  return (
    <div>GetLocation</div>
  )
}

export default GetLocation