import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }

    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    const geminiResponse = await getResponseFromGemini(message);
    await addDoc(collection(db, "messages"), {
      text: geminiResponse,
      name: "Gemini AI",
      avatar: "link_to_ai_avatar", // You can set a default avatar for the AI
      createdAt: serverTimestamp(),
      uid: "gemini_ai_uid", // Placeholder for AI UID
    });

    setMessage("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  const getResponseFromGemini = async (userMessage) => {
    try {
      const response = await fetch('YOUR_GEMINI_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userMessage }),
      });

      const data = await response.json();
      return data.response || "Sorry, I couldn’t get a response.";
    } catch (error) {
      console.error('Error communicating with Gemini:', error);
      return "Sorry, I couldn’t get a response.";
    }
  };

  return (
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};
export default SendMessage;
