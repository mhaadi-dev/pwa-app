import admin from "firebase-admin";
import serviceAccount from "../../serviceAccountKey.json"; // Use ES6 import

// Initialize Firebase Admin SDK
const privateKey = process.env.PRIVATE_KEY!.replace(/\\n/g, "\n");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.PROJECT_ID,
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey
    }),
  });
}

const messaging = admin.messaging();

export async function POST(req: Request) {
  try {
    const { token, message, delay } = await req.json(); // Accept delay parameter

    // Validate FCM token
    if (!token || typeof token !== "string") {
      return new Response(
        JSON.stringify({ error: "Valid FCM token is required" }),
        { status: 400 }
      );
    }

    

    const sendNotification = async () => {
      const notification = {
        token,
        notification: {
          title: "Custom Notification",
          body: message || "Your email has been sent successfully!",
        },
      };

      console.log("Notification Payload:", notification); // Log the payload for debugging

      try {
        const response = await messaging.send(notification);
        console.log("Notification sent successfully:", response);
      } catch (error) {
        console.error("Error sending notification:", error);

        // Log detailed error information
        if (error instanceof Error) {
          console.error("Error Code:", error);
          console.error("Error Message:", error.message);
        }
      }
    };

    // Delay execution using setTimeout (default 5s if not provided)
    const delayTime = delay ? parseInt(delay, 10) : 5000;
    setTimeout(sendNotification, delayTime);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Notification scheduled in ${delayTime / 1000} seconds`,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error scheduling notification:", error);
    return new Response(
      JSON.stringify({ error: "Error scheduling notification" }),
      { status: 500 }
    );
  }
}

  

// import admin from "firebase-admin";
// import { NextRequest, NextResponse } from "next/server";
// // Ensure Firebase Admin is initialized only once
// const initializeFirebase = async () => {
//   if (!admin.apps.length) {
//     const serviceAccount = (await import("../../serviceAccountKey.json")).default as admin.ServiceAccount;

//     admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount),
//     });
//   }
// };

// export async function POST(req: NextRequest) {
//   try {
//     await initializeFirebase(); // Ensure Firebase is initialized before sending notification

//     const { token, message, delay } = await req.json();

//     if (!token) {
//       return NextResponse.json({ error: "FCM token is required" }, { status: 400 });
//     }

//     const delaySeconds = delay ? Math.max(0, delay) : 5; // Default delay of 5 seconds

//     const notification: admin.messaging.Message = {
//       token,
//       notification: {
//         title: "Action Required!",
//         body: message || "Your email is still in drafts. Connect to the internet to send it.",
//       },
//       android: {
//         priority: "high",
//         ttl: delaySeconds * 1000,
//       },
//       apns: {
//         headers: {
//           "apns-priority": "10",
//           "apns-expiration": `${Math.floor(Date.now() / 1000) + delaySeconds}`,
//         },
//       },
//     };

//     // Send notification after delay
//     setTimeout(async () => {
//       try {
//         await admin.messaging().send(notification);
//         console.log("Notification sent successfully");
//       } catch (error) {
//         console.error("Error sending notification:", error);
//       }
//     }, delaySeconds * 1000);

//     return NextResponse.json(
//       { success: true, message: `Notification scheduled in ${delaySeconds} seconds` },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error scheduling notification:", error);
//     return NextResponse.json({ error: "Error scheduling notification" }, { status: 500 });
//   }
// }





// export async function POST(req: any) {
//     try {
//       const { token, message, delay } = await req.json();
  
//       if (!token) {
//         return new Response(JSON.stringify({ error: "FCM token is required" }), { status: 400 });
//       }
  
//       const delaySeconds = delay ? Math.max(0, delay) : 5; // Default delay of 5 seconds
  
//       const notification: admin.messaging.Message = {
//         token,
//         notification: {
//           title: "Action Required!",
//           body: message || "Your email is still in drafts. Connect to the internet to send it.",
//         },
//         android: {
//           priority: "high",
//           ttl: delaySeconds * 1000, 
//         },
//         apns: {
//           headers: {
//             "apns-priority": "10",
//             "apns-expiration": `${Math.floor(Date.now() / 1000) + delaySeconds}`, 
//           },
//         },
//       };
  
//       // Schedule the notification for delayed delivery
//       await admin.messaging().send(notification);
  
//       return new Response(
//         JSON.stringify({ success: true, message: `Notification scheduled in ${delaySeconds} seconds` }),
//         { status: 200 }
//       );
//     } catch (error) {
//       console.error("Error scheduling notification:", error);
//       return new Response(JSON.stringify({ error: "Error scheduling notification" }), { status: 500 });
//     }
//   }















// export async function POST(req: any) {
//     try {
//       const { token, message, delay } = await req.json();
  
//       if (!token) {
//         return new Response(JSON.stringify({ error: "FCM token is required" }), { status: 400 });
//       }
  
//       const notification = {
//         token,
//         notification: {
//           title: "Action Required",
//           body: message || "Your email is still in drafts. Connect to the internet to send it.",
//         },
//       };
  
//       setTimeout(async () => {
//         try {
//           await messaging.send(notification);
//           console.log("Notification sent successfully");
//         } catch (error) {
//           console.error("Error sending notification:", error);
//         }
//       }, delay || 5000); 
  
//       return new Response(
//         JSON.stringify({ success: true, message: `Notification scheduled in ${(delay || 5000) / 1000} seconds` }),
//         { status: 200 }
//       );
//     } catch (error) {
//       console.error("Error scheduling notification:", error);
//       return new Response(JSON.stringify({ error: "Error scheduling notification" }), { status: 500 });
//     }
//   }
