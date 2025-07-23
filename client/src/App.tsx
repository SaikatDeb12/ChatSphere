import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";

function App() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center">
            <Router>
                <Routes>
                    {/* <Route path="/signup" element={<SignUp />} /> */}
                    <Route path="/signin" element={<SignIn />} />
                    {/* <Route path="*" element={<SignIn />} /> */}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
