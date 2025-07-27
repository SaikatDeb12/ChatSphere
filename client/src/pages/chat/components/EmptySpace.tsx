import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { FiPaperclip, FiSmile } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

const EmptySpace: React.FC = () => {
    const [message, setMessage] = useState("");
    const emojiRef = useRef();
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
    const handleAddEmoji = (event) => {
        setMessage((msg) => msg + event.emoji);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (emojiRef.current && !emojiRef.current.contains(event.target)) {
                setEmojiPickerOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.addEventListener("mousedown", handleClickOutside);
        };
    }, [emojiRef]);

    const [messages, setMessages] = useState<
        Array<{
            id: number;
            text: string;
            sender: "me" | "other";
            time: string;
        }>
    >([
        {
            id: 1,
            text: "Hey there! How are you doing?",
            sender: "other",
            time: "10:30 AM",
        },
        {
            id: 2,
            text: "I'm good, thanks! How about you?",
            sender: "me",
            time: "10:32 AM",
        },
        {
            id: 3,
            text: "Pretty good! Just working on some React code.",
            sender: "other",
            time: "10:33 AM",
        },
    ]);

    const handleSend = () => {
        if (message.trim()) {
            const newMessage = {
                id: messages.length + 1,
                text: message,
                sender: "me" as const,
                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };
            setMessages([...messages, newMessage]);
            setMessage("");
        }
    };

    return (
        <div className="h-full flex flex-col ">
            {/* Chat header */}
            <div className=" text-black p-4 flex justify-between items-center border-b border-b-gray-200">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center">
                        <span className="text-lg font-semibold">JD</span>
                    </div>
                    <div>
                        <h3 className="font-semibold">John Doe</h3>
                        <p className="text-xs text-black">Online</p>
                    </div>
                </div>
                <button className="p-2 rounded-full hover:bg-blue-500">
                    <BsThreeDotsVertical />
                </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.sender === "me"
                                    ? "bg-blue-600 text-white rounded-br-none"
                                    : "bg-white text-gray-800 rounded-bl-none shadow"
                                }`}
                        >
                            <p>{msg.text}</p>
                            <p
                                className={`text-xs mt-1 ${msg.sender === "me" ? "text-blue-200" : "text-gray-500"}`}
                            >
                                {msg.time}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input area */}
            <div className="p-4 border-t border-blue-200 bg-white">
                <div className="relative flex items-center space-x-2">
                    <button className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-100">
                        <FiPaperclip />
                    </button>
                    <button
                        onClick={() => setEmojiPickerOpen(true)}
                        className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-100"
                    >
                        <FiSmile />
                    </button>
                    <div className="absolute bottom-16 left-0" ref={emojiRef}>
                        <EmojiPicker
                            open={emojiPickerOpen}
                            onEmojiClick={handleAddEmoji}
                            autoFocusSearch={false}
                        />
                    </div>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Type a message..."
                        className="flex-1 border border-blue-200 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <button
                        onClick={handleSend}
                        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                    >
                        <IoSend />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmptySpace;
