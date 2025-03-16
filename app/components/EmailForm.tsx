"use client";

import { useState, useEffect, useCallback } from "react"; // Add useCallback
import useOnlineStatus from "../hooks/useOnlineStatus";
import { requestNotificationPermission } from "../firebase/config";

interface EmailData {
  to: string;
  subject: string;
  message: string;
}

const EmailForm = () => {
  const isOnline = useOnlineStatus();
  const [loading, setLoading] = useState(false);
  const [emailData, setEmailData] = useState<EmailData>({
    to: "",
    subject: "",
    message: ""
  });
  const [drafts, setDrafts] = useState<EmailData[]>([]);
  const [sentEmails, setSentEmails] = useState<EmailData[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [fcmToken, setFcmToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const token = await requestNotificationPermission();
      if (token) {
        setFcmToken(token);
      }
    };
    getToken();
  }, []);

  useEffect(() => {
    const savedDrafts = localStorage.getItem("emailDrafts");
    if (savedDrafts) {
      setDrafts(JSON.parse(savedDrafts));
    }

    const savedSent = localStorage.getItem("sentEmails");
    const checkInternet = async () => {
      try {
        const response = await fetch("/api/sendEmail", { method: "GET" });
        if (response.ok) {
          const data = await response.json();
          setSentEmails(data.emails);
          localStorage.setItem("sentEmails", JSON.stringify(data.emails));
        } else {
          throw new Error("Failed to fetch");
        }
      } catch (error) {
        console.warn("No internet, loading from localStorage.", error);
        if (savedSent) {
          setSentEmails(JSON.parse(savedSent));
        }
      }
    };
    checkInternet();
  }, []);

  useEffect(() => {
    localStorage.setItem("emailDrafts", JSON.stringify(drafts));
  }, [drafts]);

  useEffect(() => {
    localStorage.setItem("sentEmails", JSON.stringify(sentEmails));
  }, [sentEmails]);

  const sendNotification = useCallback(
    async (message: string) => {
      try {
        if (!isOnline) {
          // Queue the notification if offline
          const queuedNotifications = JSON.parse(
            localStorage.getItem("queuedNotifications") || "[]"
          );
          queuedNotifications.push(message);
          localStorage.setItem(
            "queuedNotifications",
            JSON.stringify(queuedNotifications)
          );
          return;
        }

        await fetch("/api/send-notification", {
          method: "POST",
          body: JSON.stringify({
            token: fcmToken,
            message,
            delay: 5000 // 5s delay
          }),
          headers: { "Content-Type": "application/json" }
        });
      } catch (error) {
        console.error("Error sending notification:", error);
      }
    },
    [isOnline, fcmToken]
  );

  // Send queued notifications when online
  useEffect(() => {
    if (isOnline) {
      const queuedNotifications = JSON.parse(
        localStorage.getItem("queuedNotifications") || "[]"
      );
      if (queuedNotifications.length > 0) {
        queuedNotifications.forEach((message: string) => {
          sendNotification(message);
        });
        localStorage.removeItem("queuedNotifications"); // Clear the queue
      }
    }
  }, [isOnline, sendNotification]);

  // Notify user when emails are in drafts and there's no internet after 10 seconds
  // useEffect(() => {
  //   let timeoutId: NodeJS.Timeout;
  //   let notificationSent = false; // Flag to track if notification has been sent

  //   if (!isOnline && drafts.length > 0 && !notificationSent) {
  //     timeoutId = setTimeout(() => {
  //       sendNotification(
  //         "You're offline. Some emails are in drafts. Connect to the internet to send them."
  //       );
  //       notificationSent = true; // Mark notification as sent
  //     }, 10000); // 10 seconds delay
  //   }

  //   return () => {
  //     if (timeoutId) {
  //       clearTimeout(timeoutId); // Clear the timeout if the component unmounts or internet reconnects
  //     }
  //   };
  // }, [isOnline, drafts, sendNotification]);

  useEffect(() => {
    if (isOnline && drafts.length > 0) {
      drafts.forEach(async (draft, index) => {
        try {
          const res = await fetch("/api/sendEmail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(draft)
          });
          if (res.ok) {
            setSentEmails((prev) => [...prev, draft]);
            setDrafts((prev) => prev.filter((_, i) => i !== index));
          }
        } catch (error) {
          console.error("Failed to send draft email:", error);
        }
      });
      sendNotification(
        "Some emails were in drafts. Ensure you're connected to the internet."
      );
    }
  }, [isOnline, drafts, sendNotification]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailData.to || !emailData.subject || !emailData.message) {
      setStatusMessage("Please fill in all fields.");
      return;
    }

    if (isOnline) {
      setLoading(true);
      try {
        const res = await fetch("/api/sendEmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emailData)
        });

        if (res.ok) {
          setStatusMessage("Email sent successfully.");
          setSentEmails((prev) => [...prev, emailData]);
          sendNotification("Your email has been successfully sent!");
          setLoading(false);
        } else {
          setStatusMessage("Error sending email.");
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
        setStatusMessage("Error sending email.");
      }
    } else {
      setDrafts((prev) => [...prev, emailData]);
      setStatusMessage("No internet. Email saved as draft.");
      setLoading(false);
      sendNotification(
        "Your email is saved as a draft. Connect to the internet to send it."
      );
    }

    setEmailData({ to: "", subject: "", message: "" });
  };

  const handleDeleteDraft = (index: number) => {
    setDrafts((prev) => prev.filter((_, i) => i !== index));
  };
  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete all emails?"
    );

    if (confirmDelete) {
      try {
        const res = await fetch("/api/sendEmail", {
          method: "DELETE"
        });

        if (res.ok) {
          const data = await res.json();
          alert(data.message);
        } else {
          const error = await res.json();
          alert(`Error: ${error.error}`);
        }
      } catch (error) {
        console.error("Error calling DELETE endpoint:", error);
        alert("Failed to delete emails");
      }
    }
  };
  return (
    <>
      <div className="w-[95%] lg:max-w-full rounded-lg  mx-auto p-4 px-6 bg-black/80 border">
        <h1 className="text-2xl font-bold mb-4" style={{ color: "orange" }}>
          Compose Email
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <input
            type="email"
            name="to"
            placeholder="Receiver's Email"
            value={emailData.to}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={emailData.subject}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="message"
            placeholder="Your message"
            value={emailData.message}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={5}
            required
          />
          <div className="flex gap-3 items-center">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {loading ? "Sending..." : "Send Email"}
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 my-3 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete All Emails
            </button>
          </div>
        </form>

        {statusMessage && (
          <p className="mt-4 text-green-600">{statusMessage}</p>
        )}
      </div>

      <div
        className="flex flex-col items-center gap-y-5 w-full lg:flex-row justify-between px-14 mx-auto lg:items-start border rounded-xl bg-black"
        style={{ width: "95%", background: "black", padding: "1rem" }}
      >
        <div
          className="mt-8 w-full bg-gray-700 rounded-xl min-h-[200px]"
          style={{
            background: "white",
            color: "black",
            margin: "0 1rem",
            padding: "1rem"
          }}
        >
          <h2 className="text-xl font-bold" style={{ color: "orange" }}>
            Draft Emails
          </h2>
          {drafts.length === 0 ? (
            <p>No drafts available.</p>
          ) : (
            drafts.map((draft, index) => (
              <div key={index} className="border p-2 my-2">
                <p>
                  <strong>To:</strong> {draft.to}
                </p>
                <p>
                  <strong>Subject:</strong> {draft.subject}
                </p>
                <p>
                  <strong>Message:</strong> {draft.message}
                </p>
                <button
                  onClick={() => handleDeleteDraft(index)}
                  className="!text-red-500 bg-red-300 underline"
                >
                  Delete Draft
                </button>
              </div>
            ))
          )}
        </div>

        <div
          className="mt-8 w-full rounded-xl min-h-[200px]"
          style={{
            background: "white",
            color: "black",
            margin: "0 1rem",
            padding: "1rem"
          }}
        >
          <h2 className="text-xl font-bold" style={{ color: "orange" }}>
            Sent Emails
          </h2>
          {sentEmails.length === 0 ? (
            <p>No sent emails.</p>
          ) : (
            sentEmails.map((email, index) => (
              <div key={index} className="border p-2 my-2">
                <p>
                  <strong>To:</strong> {email.to}
                </p>
                <p>
                  <strong>Subject:</strong> {email.subject}
                </p>
                <p>
                  <strong>Message:</strong> {email.message}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default EmailForm;
