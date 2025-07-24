import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/chat/Dashboard";
import HomePage from "./pages/home/HomePage";

function App() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center">
            <Router>
                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    {/* <Route path="*" element={<SignIn />} /> */}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
