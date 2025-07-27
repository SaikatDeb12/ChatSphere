import axiosIns from "@/libs/axios";
import { useEffect, useState } from "react";

type UsersType = {
    name: string;
};

const ChatList = () => {
    const [users, setUsers] = useState<UsersType[]>([]);
    const [filter, setFilter] = useState<string>("");
    useEffect(() => {
        async function fetchUsers() {
            const res = await axiosIns("/auth/bulk?filter=" + filter);
            console.log("Data received: ", res.data.users);
            setUsers(res.data.users);
        }
        fetchUsers();
    }, []);

    // const conversations = [
    //     { id: 1, name: "John Doe", lastMessage: "Hey there!" },
    //     { id: 2, name: "Jane Smith", lastMessage: "See you tomorrow" },
    //     // ... more conversations
    // ];

    return (
        <div className="h-full overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Chats</h2>
            </div>
            <div className="divide-y divide-gray-100">
                {users.map((user, ind) => (
                    <div key={ind}>{user.name}</div>
                ))}
            </div>
        </div>
    );
};

export default ChatList;
