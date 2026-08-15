import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = ({ publicPage = false, adminOnly = false }) => {

    const { user } = useSelector((state) => state.auth);

    const isAdmin = user?.roles?.includes("ROLE_ADMIN");
    const isSeller = user?.roles?.includes("ROLE_SELLER");

    const location = useLocation();

    // Public pages
    if (publicPage) {
        return user ? <Navigate to="/" replace /> : <Outlet />;
    }

    // Authentication check
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Authorization check
    if (adminOnly) {

        if (isAdmin) {
            return <Outlet />;
        }

        if (isSeller) {

            const sellerAllowedPaths = [
                "/admin/orders",
                "/admin/products",
            ];

            const sellerAllowed = sellerAllowedPaths.some(path =>
                location.pathname.startsWith(path)
            );

            if (!sellerAllowed) {
                return <Navigate to="/" replace />;
            }

            return <Outlet />;
        }

        // Normal users cannot access admin routes
        return <Navigate to="/" replace />;
    }

    // Any authenticated user
    return <Outlet />;
};

export default PrivateRoute;