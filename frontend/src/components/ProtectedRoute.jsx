import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // if (loading) {
  //   return (
  //     <div className="flex min-h-[60vh] items-center justify-center">
  //       <p>Loading...</p>
  //     </div>
  //   );
  // }

  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
