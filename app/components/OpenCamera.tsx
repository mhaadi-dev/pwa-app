// "use client"
// import React, { useRef, useState } from "react";

// const OpenCamera = () => {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const [cameraOpen, setCameraOpen] = useState(false);

//   const handleOpenCamera = async () => {
//     try {
//       // Request access to the user's camera
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         videoRef.current.play();
//         setCameraOpen(true);
//       }
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//       alert("Unable to access the camera. Please check your permissions.");
//     }
//   };

//   const handleCloseCamera = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       const stream = videoRef.current.srcObject as MediaStream;
//       const tracks = stream.getTracks();

//       // Stop all tracks to release the camera
//       tracks.forEach((track) => track.stop());
//       videoRef.current.srcObject = null;
//       setCameraOpen(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center space-y-4 w-full">
//       <h1 className="text-lg font-bold">Open Camera</h1>
//       {!cameraOpen ? (
//         <button
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           onClick={handleOpenCamera}
//         >
//           Open Camera
//         </button>
//       ) : (
//         <button
//           className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//           onClick={handleCloseCamera}
//         >
//           Close Camera
//         </button>
//       )}
//       <video
//         ref={videoRef}
//         className="mt-4 w-full max-w-md border rounded shadow-md"
//         autoPlay
//       />
//     </div>
//   );
// };

// export default OpenCamera;
import React from 'react'

const OpenCamera = () => {
  return (
    <div>OpenCamera</div>
  )
}

export default OpenCamera