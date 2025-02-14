import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
