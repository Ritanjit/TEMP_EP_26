import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";
import Home from "./pages/Home";
import Users from "./pages/Users";
// import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Media from "./pages/Media";
import Sponsors from "./pages/Sponsors";
// Authentication removed - admin is now publicly accessible
// import LoginForm from "./LoginForm";
// import ProtectedRoute from "./ProtectedRoute";

export default function AdminApp() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin routes - no authentication required */}
        <Route element={<AdminLayout title="Admin Panel" />}>
          <Route path="/admin" element={<Home />} />
          <Route path="/admin/users" element={<Users />} />
          {/* <Route path="/admin/events" element={<Events />} /> */}
          <Route path="/admin/gallery" element={<Gallery />} />
          <Route path="/admin/media" element={<Media />} />
          <Route path="/admin/sponsors" element={<Sponsors />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
