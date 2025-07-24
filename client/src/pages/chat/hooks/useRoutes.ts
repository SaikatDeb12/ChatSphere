import { HiArrowLeftEndOnRectangle, HiUsers } from "react-icons/hi2";
import { HiChat } from "react-icons/hi";

// Define the Route type
export type Route = {
    label: string;
    href: string;
    icon: any; // Can be replaced with a more specific type if needed
    active?: boolean;
    onClick?: () => void;
};

const useRoutes = (
    currentPath: string,
    activeConversationId?: string,
): Route[] => {
    return [
        {
            label: "Chat",
            href: "/conversations",
            icon: HiChat,
            active: currentPath === "/conversations" || !!activeConversationId,
        },
        {
            label: "Users",
            href: "/users",
            icon: HiUsers,
            active: currentPath === "/users",
        },
        {
            label: "Logout",
            href: "#",
            onClick: () => console.log("Sign out logic here"), // Replace with your auth provider's signOut()
            icon: HiArrowLeftEndOnRectangle,
        },
    ];
};

export default useRoutes;
