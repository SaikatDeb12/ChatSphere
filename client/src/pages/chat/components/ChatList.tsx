import axiosIns from "@/libs/axios";
import { useEffect, useState } from "react";

type UsersType = {
    name: string;
};

interface ChatListProps {
    onUserClick: () => void; // Add prop for callback
}

const ChatList: React.FC<ChatListProps> = ({ onUserClick }) => {
    const [users, setUsers] = useState<UsersType[]>([]);
    useEffect(() => {
        async function fetchUsers() {
            const res = await axiosIns("/auth/bulk");
            console.log("Data received: ", res.data);
            setUsers(res.data.users);
        }
        fetchUsers();
    }, []);

    return (
        <div className="h-full overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Chats</h2>
            </div>
            <div className="divide-y divide-gray-100">
                {users.map((user, ind) => (
                    <div
                        key={ind}
                        className="p-3 hover:bg-gray-50 cursor-pointer"
                        onClick={onUserClick} // Add onClick handler
                    >
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500 truncate">
                            {"last Message"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatList;
