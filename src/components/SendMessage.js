import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }

    const { uid, displayName, photoURL } = auth.currentUser;

    // Send user's message to Firebase
    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });

/*
    const geminiResponse = await getResponseFromGemini(message);
    
    if (geminiResponse) {
      await addDoc(collection(db, "messages"), {
        text: geminiResponse,
        name: "Gemini AI",
        createdAt: serverTimestamp(),
        uid: "", 
      });
    }
*/
    setMessage("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };
/*
  const getResponseFromGemini = async (userMessage) => {
    try {
      console.log('Sending request to Gemini:', { prompt: userMessage });
  
      const response = await fetch('https://generativelanguage.googleapis.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'AIzaSyD5AGT5G0ndwraNEXThjU132hfuMCL2RuE'
        },
        body: JSON.stringify({ prompt: userMessage }),
      })
      .then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
  
      if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Gemini API Response:', data);
      
      console.log('Gemini API Response:', data);
  
      return data.response || "Sorry, I couldn’t get a response.";
    } catch (error) {
      console.error('Error communicating with Gemini:', error);
      return "Sorry, I couldn’t get a response.";
    }
    
  };
  
  */

  return (
    <form onSubmit={sendMessage} className="send-message">
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
