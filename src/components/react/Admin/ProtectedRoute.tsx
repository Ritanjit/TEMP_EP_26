/**
 * ProtectedRoute.tsx - Route Guard for Admin Panel
 * 
 * Protects admin routes using FrontQL session-based authentication.
 * Redirects to login if no valid session exists.
 */

import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../../../apis/auth';

const ProtectedRoute = () => {
  // Check if user has a valid session
  const authenticated = isAuthenticated();

  if (!authenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
