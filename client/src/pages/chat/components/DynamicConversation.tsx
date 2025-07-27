import type { ConversationType } from "@/libs/types";
import { useParams } from "react-router-dom";

export const DynamicConversation = () => {
    const { pid } = useParams();
    const conversation: ConversationType = axios.get("/convervsation/{pid}");
    return <div>{pid}</div>;
};
