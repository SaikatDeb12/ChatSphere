const ChatList = () => {
    // This would come from your API/state in a real app
    const conversations = [
        { id: 1, name: "John Doe", lastMessage: "Hey there!" },
        { id: 2, name: "Jane Smith", lastMessage: "See you tomorrow" },
        // ... more conversations
    ];

    return (
        <div className="h-full overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Chats</h2>
            </div>
            <div className="divide-y divide-gray-100">
                {conversations.map((conversation) => (
                    <div
                        key={conversation.id}
                        className="p-3 hover:bg-gray-50 cursor-pointer"
                    >
                        <p className="font-medium">{conversation.name}</p>
                        <p className="text-sm text-gray-500 truncate">
                            {conversation.lastMessage}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatList;
