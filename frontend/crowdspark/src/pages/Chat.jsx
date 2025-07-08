import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Chat = () => {
  const { campaignId, organizerId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Simulated current user id; in real app, get from auth context or localStorage
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser?.id;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/chat`, {
          params: { campaignId },
        });
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, [campaignId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      console.log("Sending message:", {
        campaignId,
        senderId: currentUserId,
        recipientId: organizerId,
        content: newMessage,
      });
      await axios.post(`http://localhost:5000/api/chat`, {
        campaignId,
        senderId: currentUserId,
        recipientId: organizerId,
        content: newMessage,
      });
      setNewMessage("");

      // Refresh messages after sending
      const res = await axios.get(`http://localhost:5000/api/chat`, {
        params: { campaignId },
      });
      setMessages(res.data);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Chat with Organizer</h2>
      <div className="h-64 overflow-y-scroll border p-2 mb-4 bg-gray-50">
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`mb-2 ${
                msg.senderId === currentUserId ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block px-3 py-1 rounded ${
                  msg.senderId === currentUserId
                    ? "bg-teal-600 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {msg.content}
              </span>
            </div>
          ))
        )}
      </div>
      <div className="flex gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={sendMessage}
          className="bg-teal-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
