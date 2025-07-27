import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import HomePage from "./pages/home/HomePage";
import Users from "./pages/chat/Users";
import Conversation from "./pages/chat/Conversations";
import { DynamicConversation } from "./pages/chat/components/DynamicConversation";

function App() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center">
            <Router>
                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/users" element={<Users />} />
                    <Route
                        path="/conversations"
                        element={<Conversation />}
                    ></Route>
                    <Route
                        path="/conversations/:pid"
                        element={<DynamicConversation />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
